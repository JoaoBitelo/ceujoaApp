import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  ScrollView,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import FetchService from "../../services/FetchService";
import ResponseHandler from "../../services/ResponseHandler";

class CalendarDetailScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = { event: "", presenca: "", loading: false };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._retrieveData()
  }

  _retrieveData = async () => {
    this.setState({ loading: true })
    var itemID = await AsyncStorage.getItem('currentEvent');
    itemID = JSON.parse(itemID);
    var res = await this.FetchService.getCalendarEvent(itemID.$oid);
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
      this.setState({ event: res.event })
      if(this.state.event.presenca.avaliacao===null){
        this.setState({ presenca: "Não avaliado" })
      }else{
        this.setState({ presenca: this.state.event.presenca.isRated })
      }
      this.setState({ loading: false })
    }
  };

  backButtonHandler = () => {
    this.props.navigation.navigate("Calendar");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
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
            source={require("../../../assets/backgroundCalendar.jpg")}
            style={styles.imageBackGround}>
            <View style={{ flex: 0.01 }}></View>
            <ScrollView style={styles.ScrollView}>

              <View style={[styles.TouchableOpacityEvent, styles.flexDirection]}>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Evento:
                  </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 14, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.evento}
                  </Text>
                </View>
              </View>

              <View style={styles.TouchableOpacityEvent}>
                <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Atividade:
                  </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 7, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.atividade}
                  </Text>
                </View>
              </View>

              <View style={styles.TouchableOpacityEvent}>
                <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Data/hora:
                  </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 7, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.dataProvavel} - {this.state.event.hora}
                  </Text>
                </View>
              </View>

              <View style={[styles.TouchableOpacityEvent, styles.flexDirection]}>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Presença:
                  </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 14, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.presenca}
                  </Text>
                </View>
              </View>

              <View style={styles.TouchableOpacityEvent}>
                <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Recados:
                  </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 7, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.recados}
                  </Text>
                </View>
              </View>

            </ScrollView>
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
  ScrollView: {
    flex: 3,
    width: Dimensions.get("window").width * 0.75,
    alignSelf: 'center'
  },
  TouchableOpacityEvent: {
    flex: 1,
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.75,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  },
  descricao: {
    fontSize: 18,
    flexWrap: 'wrap',
    color: "white",
  },
  descricao2: {
    textAlign: 'center',
    fontSize: 18,
    flexWrap: 'wrap',
    color: "white"    
  },
});

export default CalendarDetailScreen;