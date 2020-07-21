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
      loading: false, password: ""
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    this.setState({ loading: false })
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("Home");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  _buttonMethod = async (item) => {
    
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
              
              <Text>aaaaaa</Text>
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
  viewFrontGround:{
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
    fontSize: 16,
    flexWrap: 'wrap',
    color: "white"
  },
  textBox:{
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
  },
  textTitle:{
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  }
});

export default CalendarScreen;