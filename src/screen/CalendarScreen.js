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
  ScrollView,
  Alert
} from "react-native";
import FetchService from "../services/FetchService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../services/ResponseHandler";

class CalendarScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = {
      loading: false, allEvents: [], nextEvents: [],
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    var res = await this.FetchService.getCalendar();
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
      this.setState({ nextEvents: res.nextEvents })
      this.setState({ loading: false })
    }
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("CommonArea");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  _buttonMethod = async (item) => {
    await AsyncStorage.setItem('currentEvent', JSON.stringify(item._id)).then(() => {
      this.props.navigation.navigate("CalendarDetail");
    })
      .catch(() => {
        Alert.alert(
          "Erro de autenticação de sessão",
          "Faça login novamente no aplicativo",
          [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
        );
      })
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.viewBackground}>
          <NavigationEvents
            onWillFocus={() => this._start()}
            onWillBlur={() => this._end()} />
          <ImageBackground
            source={require("../../assets/backgroundCalendar.jpg")}
            style={styles.imageBackGround}>
            <View style={{ flex: 0.01 }}></View>
            <SafeAreaView style={styles.viewFrontGround}>
              <ScrollView>
                  <View style={styles.textBox}>
                    <Text style={styles.textTitle}>
                      Eventos dos próximos 7 dias
                    </Text>
                  </View>
                  {this.state.nextEvents.length === 0 
                  ?
                  <View style={styles.TouchableOpacityEvent}>
                    <View style={{ flex: 3, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 5 }}>
                      <Text style={styles.data}>
                        Não há nenhum evento nos próximos 7 dias
                      </Text>
                    </View>
                  </View>
                  :
                  <FlatList style={{ flex: 3 }}
                    data={this.state.nextEvents}
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
                <View style={styles.textBox}>
                  <Text style={styles.textTitle}>
                    Próximos eventos
                  </Text>
                </View>
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
              </ScrollView>
            </SafeAreaView >
            <View style={{ flex: 0.01 }}></View>
          </ImageBackground>
        </View>
      );
    }
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
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.75,

    borderColor: 'black',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  atividade: {
    textAlign: 'center',
    fontSize: 18,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  },
  data: {
    textAlign: 'center',
    fontSize: 18,
    flexWrap: 'wrap',
    color: "white"
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
  },
  textTitle: {
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  }
});

export default CalendarScreen;