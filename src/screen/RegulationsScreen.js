import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';

class RegulationsScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.state = { phrase: "", loading: false };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    const res = await this.FetchService.getRegulation();

    if (res === false) {
      Alert.alert(
        "Erro de autenticação de sessão",
        "Faça login novamente no aplicativo",
        [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
      );
    } else {
      this.setState({ phrase: res })
      this.setState({ loading: false })
    }
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("NormsRegulations");
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
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textBox: {
    width: Dimensions.get("window").width,
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    padding: 5
  },
  phrase: {
    textAlign: 'center',
    fontSize: 18,
    flexWrap: 'wrap',
    color: "white"
  }
});

export default RegulationsScreen;