import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
  Linking,
  Alert,
  ActivityIndicator
} from "react-native";
import { NavigationEvents } from 'react-navigation';
import FetchService from "../services/FetchService";
import ResponseHandler from "../services/ResponseHandler";

class NormsRegulationsScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = {
      loading: false
    };
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

  _openURLButton = async (name) => {
    this.setState({ loading: true })
    var res = await this.FetchService.getSource(name);
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
      const supported = await Linking.canOpenURL(res.content.link);
      if (supported) {
        this.setState({ loading: false })
        await Linking.openURL(res.content.link);
      } else {
        this.setState({ loading: false })
        Alert.alert(
          "Erro ao abrir o link",
          "Ocorreu um erro ao abrir o link, o endereço é inválido. Por favor, entre em contato com um administrador",
          [{ text: "OK" }]
        );
      }
    }
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
              <TouchableOpacity
                style={styles.textBox}
                onPress={() => this._openURLButton("EstatutoSocial")}>
                <Text style={styles.phrase}>ESTATUTO SOCIAL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textBox}
                onPress={() => this._openURLButton("RegimentoInterno")}>
                <Text style={styles.phrase}>REGIMENTO INTERNO</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textBox}
                onPress={() => this._openURLButton("CartaDePrincipios")}>
                <Text style={styles.phrase}>CARTA DE PRINCÍPIOS</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.textBox}
                onPress={() => this._openURLButton("CartaMagna")}>
                <Text style={styles.phrase}>CARTA MAGNA DA UMBANDA</Text>
              </TouchableOpacity>
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c7282d',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
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