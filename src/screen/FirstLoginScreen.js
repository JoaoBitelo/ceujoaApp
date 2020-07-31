import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Image,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../services/ResponseHandler";

class CalendarScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = {
      loading: false, firstInput: "", secondInput: ""
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("Home");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  _buttonMethod = async () => {
    this.setState({ loading: true })
    if(this.state.firstInput==this.state.secondInput && this.state.firstInput!==""){
      const res = await this.FetchService.firstLogin(this.state.firstInput);
      if (res === null) {
        this.setState({ loading: false })
        this.ResponseHandler.nullResponse();
        this.props.navigation.navigate('Home');
      } else if (res === false) {
        this.setState({ loading: false })
        this.ResponseHandler.falseResponse();
        this.props.navigation.navigate('Home');
      } else {
        await this.ResponseHandler.trueResponse(res);
        this.props.navigation.navigate('CommonArea');
        this.setState({ loading: false })
      }
    }else{
      this.setState({ loading: false })
      Alert.alert(
        "Erro durante a troca de senha",
        "Os dados que você preencheu não coincidem. Preencha-os novamente com atenção e certifique-se que ambos são iguais",
        [{ text: "OK", onPress: () => this.props.navigation.navigate('FirstLogin')}]
    );
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
            <View style={styles.viewUpperGround}>
              <Image style={styles.image}
                source={require("../../assets/logo.jpg")}
              />
            </View>
            <KeyboardAvoidingView style={styles.viewMiddleGround}>
              <TextInput style={styles.textField}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                value={this.state.text}
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType="off"
                secureTextEntry={true}
                placeholder="Nova senha "
                returnKeyType="go"
                placeholderTextColor="black"
                onChangeText={(firstInput) => { this.setState({ firstInput }) }}
                textAlign={'center'}
              />
              <TextInput style={styles.textField}
                ref={(input) => { this.secondTextInput = input; }}
                value={this.state.text}
                autoCapitalize='none'
                autoCorrect={false}
                autoCompleteType="off"
                secureTextEntry={true}
                placeholder="Confirme a senha"
                returnKeyType="done"
                placeholderTextColor="black"
                onChangeText={(secondInput) => { this.setState({ secondInput }) }}
                textAlign={'center'}
              />
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.viewBottomGround}>
              <TouchableOpacity
                style={styles.button}
                onPress={this._buttonMethod}>
                <Text style={styles.buttonText}>AVANÇAR</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            <View style={{ flex: 0.5 }}></View>
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
  viewUpperGround: {
    flex: 4,
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
  viewMiddleGround: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100
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
  viewBottomGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default CalendarScreen;