import React from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ActivityIndicator,
  WebView,
  Alert,
  Text,
  ImageBackground
} from "react-native";
import FetchService from "../../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import { Linking } from 'expo';
import ResponseHandler from "../../services/ResponseHandler";

class RegulationsScreen extends React.Component {
  constructor() {
    super();
    this.ResponseHandler = new ResponseHandler();
    this.state = { phrase: "", loading: false };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("NormsRegulations");
    return true;
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    //const res = await this.FetchService.getSource("CartaDePrincipios");
    const res = true;
    if (res === null) {
      this.ResponseHandler.nullResponse();
      this.setState({ loading: false })
      this.props.navigation.navigate('Home');
    } else if (res === false) {
      this.ResponseHandler.falseResponse();
      this.setState({ loading: false })
      this.props.navigation.navigate('Home');
    } else {
      //this.setState({ phrase: res.content.link })
      //await this.ResponseHandler.trueResponse(res.token);
      this.setState({ loading: false })
    }
  }

  error = async () => {
    Alert.alert(
      "Erro ao abrir",
      "Não foi possível abrir o arquivo a partir deste dispositivo. Tente entrar diretamente pressionando 'abrir' abaixo. Se o erro persistir, verifique sua conexão com a internet",
      [
        {
          text: "ABRIR", onPress: () => Linking.openURL(this.state.phrase)
        },
        {
          text: "VOLTAR", onPress: () => this.props.navigation.navigate("CommonArea")
        }
      ]
    );
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
            <View style={styles.upperView}>
              <View style={[styles.textBox]}>
                <Text style={styles.text}>
                  Este conteúdo ainda não está disponivel
                </Text>
              </View>
            </View>
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
  upperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    padding: 5
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    flexWrap: 'wrap',
    color: "white",
    fontWeight: 'bold',
  }
});

export default RegulationsScreen;