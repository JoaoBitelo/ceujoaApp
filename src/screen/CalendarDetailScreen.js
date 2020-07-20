import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  ImageBackground,
  ScrollView,
  BackHandler,
  ActivityIndicator
} from "react-native";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';

class CalendarDetailScreen extends React.Component {
  constructor() {
    super();
    this.state = { event: "", loading: false };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._retrieveData()
  }

  _retrieveData = async () => {
    this.setState({ loading: true })
    try {
      const value = await AsyncStorage.getItem('currentEvent');
      if (value !== null) {
        const item = JSON.parse(value);
        this.setState({ event: item })
        this.setState({ loading: false })
      }
    } catch (error) {
      Alert.alert(
        "Erro!",
        "Ocorreu um erro inesperado",
        [{ text: "OK" }]
      );
      this.setState({ loading: false })
      this.props.navigation.navigate("Home");
    }
  };

  backButtonHandler = () => {
    this.props.navigation.navigate("Calendar");
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
            <ScrollView style={styles.ScrollView}>
              <View
                style={[styles.TouchableOpacityEvent, styles.flexDirection]}
              //onPress={()=> this.buttonMethod(item)}
              >
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Evento:
                            </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 14, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.evento}
                  </Text>
                </View>
              </View>

              <View
                style={styles.TouchableOpacityEvent}
              //onPress={()=> this.buttonMethod(item)}
              >
                <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Atividade:
                  </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 7, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.Atividade}
                  </Text>
                </View>
              </View>

              <View
                style={styles.TouchableOpacityEvent}
              //onPress={()=> this.buttonMethod(item)}
              >
                <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Data/hora:
                            </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 7, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.DataProvavel} - {this.state.event.Hora}
                  </Text>
                </View>
              </View>

              <View
                style={styles.TouchableOpacityEvent}
              //onPress={()=> this.buttonMethod(item)}
              >
                <View style={{ flex: 1, paddingBottom: 5, paddingTop: 10, paddingHorizontal: 10 }}>
                  <Text style={styles.titulo}>
                    Recados:
                            </Text>
                </View>
                <View style={{ flex: 1, paddingBottom: 14, paddingTop: 7, paddingHorizontal: 10 }}>
                  <Text style={styles.descricao}>
                    {this.state.event.Recados}
                  </Text>
                </View>
              </View>

            </ScrollView>
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
  ScrollView: {
    flex: 3,
    width: Dimensions.get("window").width * 0.75,
    alignSelf: 'center'
  },
  TouchableOpacityEvent: {
    flex: 1,
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.75,
  },
  flexDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 20,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  },
  descricao: {
    fontSize: 20,
    flexWrap: 'wrap',
    color: "white",
  },
  descricao2: {
    fontSize: 20,
    flexWrap: 'wrap',
    color: "white",
    textAlign: 'center'
  }
});

export default CalendarDetailScreen;