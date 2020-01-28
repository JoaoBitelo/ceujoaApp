import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  Alert,
  BackHandler,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import { AsyncStorage } from "react-native";

class HomeScreen extends React.Component<Props, State> {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.state = { login: "joao2", password: "123", loading: false };
  }

  _loginButtonMethod = async () => {
    this.setState({ loading: true })
    const res = await this.FetchService.login(this.state.login, this.state.password);
    this.setState({ loading: false })
    if (res === false) {
      Alert.alert(
        "Erro durante a autenticação",
        "Não foi possível conectar-se ao servidor, tente novamente mais tarde. Se o problema persistir, contate um administrador do sistema",
        [{ text: "OK" }]
      );
    } else {
      AsyncStorage.setItem('ID_l', this.state.login);
      AsyncStorage.setItem('ID_p', this.state.password);
      this.props.navigation.navigate('CommonArea');
    }

  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
  }

  backButtonHandler = () => {
    BackHandler.exitApp()
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
        <KeyboardAvoidingView style={styles.viewBackground} behavior="padding" enabled>
          <NavigationEvents
            onWillFocus={() => this._start()}
            onWillBlur={() => this._end()} />

          <ImageBackground source={require("../../assets/backgroundHome.jpg")}
            style={styles.imageBackGround}>
            <View style={{ flex: 0.3 }}></View>

            <View style={styles.viewUpperGround}>
              <Image style={styles.image}
                source={require("../../assets/logo.jpg")}
              />
            </View>

            <View style={styles.viewMiddleGround}>
              <TextInput style={styles.textField}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                value={this.state.text}
                autoCapitalize='none'
                placeholder="LOGIN "
                placeholderTextColor="black"
                onChangeText={(login) => { this.setState({ login }) }}
                textAlign={'center'}
              >
              </TextInput>
              <TextInput style={styles.textField}
                ref={(input) => { this.secondTextInput = input; }}
                value={this.state.text}
                autoCapitalize='none'
                placeholder="SENHA"
                placeholderTextColor="black"
                onChangeText={(password) => { this.setState({ password }) }}
                textAlign={'center'}
              />
            </View>

            <View style={styles.viewBottomGround}>
              <TouchableOpacity
                style={styles.button}
                onPress={this._loginButtonMethod}>
                <Text style={styles.buttonText}>AVANÇAR</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 0.1 }}></View>
          </ImageBackground>

        </KeyboardAvoidingView>
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
  viewUpperGround: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: '80%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 200,
  },
  textInfo: {
    flex: 1,
    color: "white",
    fontSize: 12,
    flexWrap: 'wrap',
    textAlign: "center",
  },
  viewMiddleGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBottomGround: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textField: {
    color: "#000",
    marginBottom: 20,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.07,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 50,

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',

    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.07,
    backgroundColor: '#c7282d',
    borderRadius: 50,

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
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
  }

});

export default HomeScreen;