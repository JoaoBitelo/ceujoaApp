import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView 
} from "react-native";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';

class DonationsScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.state = {
      loading: false, titulo: "", texto: ""
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    try {
        const res = await this.FetchService.getSource("Doacoes");

        if (res === false) {
            Alert.alert(
                "Erro de autenticação de sessão",
                "Faça login novamente no aplicativo",
                [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
            );
        }else{
            var temp = res.titulo.replace(/\\n/g,'\n');
            this.setState({ titulo: temp })
            temp = res.texto.replace(/\\n/g,'\n');
            this.setState({ texto: temp })
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

            <SafeAreaView style={styles.viewFrontGround}>
                <ScrollView>
                    <View style={styles.textBox}>
                        <Text style={styles.textTitle}>
                            {this.state.titulo}
                        </Text>
                    </View>

                    <View style={styles.textBox}>
                        <Text style={styles.textCenter}>
                            {this.state.texto} 
                        </Text>
                    </View>   
                </ScrollView>
            </SafeAreaView >    
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
  viewFrontGround:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  textBox:{
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.9,
  },
  textTitle:{
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white",
    textAlign: 'center',
  },
  textCenter:{
    fontSize: 19,
    flexWrap: 'wrap',
    color: "white",
  }
});

export default DonationsScreen;