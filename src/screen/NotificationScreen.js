import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from "react-native";
import { Icon } from 'react-native-elements';
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';

class NotificationScreen extends React.Component {
  constructor() {
    super();
    this.state = { dados: [] };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    try {
        //const res = await this.FetchService.getSource("RegrasDeEtiqueta");
        const res = true;
        if (res === false) {
            Alert.alert(
                "Erro de autenticação de sessãossssssssssssssssss",
                "Faça login novamente no aplicativo",
                [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
            );
        }else{
            this.setState({ dados: res })
            this.setState({ loading: false })
        }
      } catch (error) {
        Alert.alert(
            "Erro de autenticação de sessão",
            "Faça login novamente no aplicativo",
            [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
          );
      }
  }

  buttonMethod = async () => {

  }

  iconMethod = async () => {
    
  }

  backButtonHandler = () => {
    this.props.navigation.navigate("CommonArea");
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

          <View style={{ flex: 0.08 }}></View>
          
          <View style={styles.box}>
            <TouchableOpacity style={styles.textoView}
              onPress={() => this.buttonMethod()}>
              <View style={styles.mountTextView}>
                <Text style={styles.textCenter}>
                  Nova atualização em:{" "}<Text style={styles.textTitle}>Grau 1, Aula 1</Text>
                </Text>
              </View>
                
              <View style={styles.mountTextView}>
                <Text style={styles.textCenter}>
                  Atualizado em:{" "}<Text style={styles.textTitle}>03/01/01</Text>
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.iconView}>
              <Icon
                name='close'
                color='red'
                onPress={() => this.iconMethod()} />
            </View>
          </View>

          <View style={{ flex: 0.1 }}></View>             
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
  box:{
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    paddingBottom: 5, 
    paddingTop: 5, 
    paddingLeft: 10,
    alignSelf: "center",
    flexDirection: 'row',
    width: Dimensions.get("window").width * 0.9,
  },
  textoView:{
    flex: 4,
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  mountTextView:{
    //flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  textTitle:{
    //flex: 1,
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white",
    //textAlign: 'center',
  },
  textCenter:{
    //flex: 1,
    fontSize: 19,
    flexWrap: 'wrap',
    color: "white",
  },
   iconView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default NotificationScreen;