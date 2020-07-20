import React from "react";
import {
  StyleSheet,
  View,
  BackHandler,
  ActivityIndicator,
  WebView,
  Alert
} from "react-native";
import FetchService from "../../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import { Linking } from 'expo';
import ResponseHandler from "../../services/ResponseHandler";

class PrincipalLetterScreen extends React.Component {
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

  backButtonHandler = () => {
    this.props.navigation.navigate("NormsRegulations");
    return true;
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    const res = await this.FetchService.getSource("CartaDePrincipios");
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
      this.setState({ phrase: res.content.link })
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
        <View style={styles.view}>
          <NavigationEvents
            onWillFocus={() => this._start()}
            onWillBlur={() => this._end()} />
          <WebView
            source={{ uri: this.state.phrase }}
            style={{ flex: 1 }}
            onError={() => this.error()}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  }
});

export default PrincipalLetterScreen;