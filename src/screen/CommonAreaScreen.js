import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../services/ResponseHandler";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = { phrase: "", loading: false };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    const res = await this.FetchService.getSource("AreaComum");
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
      var response = res.content.texto;
      response = response.replace(/\\n/g, '\n');
      this.setState({ phrase: response })
      this.setState({ loading: false })
    }
  }

  updateIndexMenu = async () => {
    //colocar o index em primeiro
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("Home");
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
            source={require("../../assets/backgroundCalendar.jpg")}
            style={styles.imageBackGround}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.middleView}>
              <View style={styles.textBox}>
                <Text style={styles.phrase}>"{this.state.phrase}"</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}></View>
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
  middleView: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 5
  },
  phrase: {
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap',
    color: "white",
    fontStyle: 'italic',
  }
});

export default HomeScreen;