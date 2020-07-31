import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  FlatList,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from "react-native";
import FetchService from "../../services/FetchService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../../services/ResponseHandler";
import DatePicker from 'react-native-datepicker'


class CalendarFilterScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = {
      loading: false, allEvents: [], date: new Date()
    };
  }

  _start = async () => {
    this.setState({ loading: true })
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    await this.datePickerRef.onPressDate()
    this.setState({ loading: false })
  }

  backButtonHandler = async () => {
    this.props.navigation.navigate("Calendar");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  _buttonMethod = async (datePicked) => {
    this.setState({ loading: true })
    res = await this.FetchService.getCalendarFilter(datePicked);
    if (res === null) {
      this.ResponseHandler.nullResponse();
      this.setState({ loading: false })
      this.props.navigation.navigate('Home');
    } else if (res === false) {
      this.ResponseHandler.falseResponse();
      this.setState({ loading: false })
      this.props.navigation.navigate('Home');
    } else {
      await this.ResponseHandler.trueResponse(res.token);
      this.setState({ allEvents: res.allEvents })
      this.setState({ loading: false })
    }
  }

  render() {
    return (
      <View style={styles.viewBackground}>
        <NavigationEvents
          onWillFocus={() => this._start()}
          onWillBlur={() => this._end()} />
        <ImageBackground
          source={require("../../../assets/backgroundCalendar.jpg")}
          style={styles.imageBackGround}>
          <View style={{ flex: 0.01 }}></View>
          <SafeAreaView style={styles.viewFrontGround}>
            <ScrollView>
                <View style={styles.textBox}>
                  <Text style={styles.textTitle}>
                    Eventos encontrados no dia selecionado
                  </Text>
                </View>
                {this.state.allEvents.length === 0 
                  ?
                  <View style={styles.TouchableOpacityEvent}>
                    <Text style={styles.data}>
                      Nenhum evento encontrado nesta data
                    </Text>
                  </View>
                  :
                  <FlatList style={{ flex: 3 }}
                    data={this.state.allEvents}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={styles.TouchableOpacityEvent}
                        onPress={() => this._buttonMethod(item)}>
                        <View style={{ flex: 3, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                          <Text style={styles.atividade}>
                            {item.atividade}
                          </Text>
                        </View>

                        <View style={{ flex: 2, paddingBottom: 14, paddingTop: 14, paddingHorizontal: 2 }}>
                          <Text style={styles.data}>
                            {item.dataProvavel}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                }
                <DatePicker
                  mode="date"
                  format="DD-MM-YY"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  onDateChange={(date) => { this._buttonMethod(date) }}
                  showIcon={false}
                  hideText={true}
                  ref={(ref) => this.datePickerRef = ref}
                />
            </ScrollView>
          </SafeAreaView >
          <View style={{ flex: 0.01 }}></View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBackground: {
    flex: 1,
  },
  imageBackGround: {
    width: '100%',
    height: '100%',
  },
  viewFrontGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  TouchableOpacityEvent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.75,
    borderColor: 'black',
    borderWidth: 1,
  },
  atividade: {
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  },
  data: {
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap',
    color: "white"
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
  },
  textTitle: {
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  }
});

export default CalendarFilterScreen;