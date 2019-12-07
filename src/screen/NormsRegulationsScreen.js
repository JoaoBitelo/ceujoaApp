import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
} from "react-native";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';

class NormsRegulationsScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.state = {};
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
  }

  backButtonHandler = async () => {
    this.props.navigation.navigate("CommonArea");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  render() {
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
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => this.props.navigation.navigate("Regulations")}>
              <Text style={styles.phrase}>REGULAMENTO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => this.props.navigation.navigate("PrincipalLetter")}>
              <Text style={styles.phrase}>CARTA DE PRINCÍPIOS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textBox}
              onPress={() => this.props.navigation.navigate("LetterMagna")}>
              <Text style={styles.phrase}>CARTA MAGNA DA UMBANDA</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
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
  middleView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#c7282d',
    borderRadius: 10,
    marginBottom: 20,
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
  phrase: {
    textAlign: 'center',
    fontSize: 18,
    flexWrap: 'wrap',
    color: "white"
  }
});

export default NormsRegulationsScreen;