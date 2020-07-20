import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  Alert
} from "react-native";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';

class SpecificDegreeDetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false, dados: [], Descricao: "", FontesAdicionais: ""
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    try {
        const value = await AsyncStorage.getItem('SpecificDegreeDetail');
        var res = JSON.parse(value)
        if (value !== null) {
            var temp = res.Adicional.replace(/\\n/g,'\n');
            this.setState({ FontesAdicionais: temp })
            temp = res.Descricao.replace(/\\n/g,'\n');
            this.setState({ Descricao: temp })

            this.setState({ dados: res })
            this.setState({ loading: false })
          return value;
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
    this.props.navigation.navigate("SpecificDegree");
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
            <View style={{ flex: 0.01 }}></View>

            <View style={styles.viewFrontGround}>
              <View style={styles.textBox}>
                <Text style={styles.textTitle}>
                  Titulo:
                </Text>
                <Text style={styles.textCenter}>
                  {this.state.dados.Nome}
                </Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.textTitle}>
                  Descrição:
                </Text>
                <Text style={styles.textCenter}>
                  {this.state.Descricao} 
                </Text>
              </View>
              <View style={styles.textBox}>
                <Text style={styles.textTitle}>
                  Fontes Adicionais:
                </Text>
                <Text style={styles.textCenter}>
                  {this.state.FontesAdicionais} 
                </Text>
              </View>
              
            </View>
            
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
  viewFrontGround:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox:{
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    paddingBottom: 5, 
    paddingTop: 10, 
    paddingHorizontal: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.75,
  },
  textTitle:{
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  },
  textCenter:{
    fontSize: 19,
    flexWrap: 'wrap',
    color: "white",
    //paddingLeft: 20
  }
});

export default SpecificDegreeDetailScreen;