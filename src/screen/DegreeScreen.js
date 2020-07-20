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
  Alert
} from "react-native";
import FetchService from "../services/FetchService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements'

class DegreeScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.state = {
      loading: false, dados: []
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    const res = await this.FetchService.getDegree();
    if (res === false) {
      Alert.alert(
        "Erro de autenticação de sessão",
        "Faça login novamente no aplicativo",
        [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
      );
    } else {
      this.setState({ dados: res })
      this.setState({ loading: false })
    }
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("CommonArea");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  _buttonMethod = async (item) => {
    if(item.Private===true){
      Alert.alert(
        "Aviso",
        "Você ainda não possui permissão para acessar essa área. Se você acredita que isto é um erro, contate um administrador.",
        [{ text: "OK" }]
      );
    }else{
      await AsyncStorage.setItem('SpecificDegree', item.Nome).then(() => {
        this.props.navigation.navigate("SpecificDegree");
      })
        .catch(() => {
          Alert.alert(
            "Erro de autenticação de sessão",
            "Faça login novamente no aplicativo",
            [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
          );
        })
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
            <View style={{ flex: 0.01 }}></View>
            <FlatList style={{ flex: 3 }}
              data={this.state.dados}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles.TouchableOpacityEvent}
                  onPress={() => this._buttonMethod(item)}>
                  <View style={{ flex: 1, justifyContent: "center", paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                    <Text style={styles.nome}>
                      {item.Nome}
                    </Text>
                  </View>

                  <View style={{flex: 0.1, justifyContent: "center", paddingBottom: 14, paddingTop: 14, paddingHorizontal: 2 }}>
                    {item.Private === true &&
                        <Icon
                            name='lock'
                            color='white'
                        />
                    }
                    {item.Private === false &&
                        <Icon
                            name='lock-open'
                            color='white'
                        />
                    }
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
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
  TouchableOpacityEvent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#c7282d',
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
  nome: {
    textAlign: 'center',
    fontSize: 18,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  }
});

export default DegreeScreen;