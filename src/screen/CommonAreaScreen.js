import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
} from "react-native";
import { Icon } from 'react-native-elements';
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import CurrentIndexMenu from '../headers/headerConfig/CurrentIndexMenu';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.CurrentIndexMenu = new CurrentIndexMenu();
    this.state = { phrase: "", loading: false };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
    this.updateIndexMenu();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    const res = await this.FetchService.getPhrase();

    if (res === false) {
      Alert.alert(
        "Erro de autenticação de sessão",
        "Faça login novamente no aplicativo",
        [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
      );
    } else {
      var response = res[0].areaComum;
      response = response.replace(/\\n/g,'\n');
      this.setState({ phrase: response })
      this.setState({ loading: false })
    }
  }

  updateIndexMenu = async () => {
    await this.CurrentIndexMenu.setIndex(0);
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
      return(
        <View style={styles.viewBackground}>
          <NavigationEvents
            onWillFocus={() => this._start()}
            onWillBlur={() => this._end()} />
          <ImageBackground
            source={require("../../assets/backgroundCalendar.jpg")}
            style={styles.imageBackGround}>
            <View style={styles.upperView}>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.textBox, { flex: 0.1 }]}>
                  <Icon
                    name='arrow-upward'
                    color='white' />
                </View>
                <View style={[styles.textBox, { flex: 1 }]}>
                  <Text style={styles.warning}>Utilize o botão do menu para navegar pelo aplicativo</Text>
                </View>
              </View>
            </View>
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
  upperView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  middleView: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textBox: {
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    padding: 5
  },
  warning: {
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap',
    color: "white"
  },
  phrase: {
    textAlign: 'center',
    fontSize: 19,
    flexWrap: 'wrap',
    color: "white",
    fontStyle: 'italic',
  }
});

export default HomeScreen;