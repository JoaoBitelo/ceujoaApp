import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
  BackHandler,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
  FlatList
} from "react-native";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import FetchService from "../../services/FetchService";
import ResponseHandler from "../../services/ResponseHandler";

class SpecificDegreeDetailScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = {
      loading: false, name: "", description: "", additional: []
    };
  }

  _start() {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    this._loadClient();
  }

  _loadClient = async () => {
    this.setState({ loading: true })
    var itemID = await AsyncStorage.getItem('currentDegreeDetail');
    itemID = JSON.parse(itemID);
    var res = await this.FetchService.getDegreeSpecificContent(itemID.$oid);
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
      this.setState({ name: res.conteudo.nome })
      var temp = res.conteudo.descricao.replace(/\\n/g, '\n');
      this.setState({ description: temp })
      this.setState({ additional: res.conteudo.adicional })
      this.setState({ loading: false })
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
            source={require("../../../assets/backgroundCalendar.jpg")}
            style={styles.imageBackGround}>
            <View style={{ flex: 0.01 }}></View>

            <SafeAreaView style={styles.viewFrontGround}>
              <ScrollView>
                <View style={styles.viewFrontGround}>
                  <View style={styles.textBox}>
                    <Text style={styles.textTitle}>
                      Titulo:
                  </Text>
                    <Text style={styles.textCenter}>
                      {this.state.name}
                    </Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.textTitle}>
                      Descrição:
                    </Text>
                    <Text style={styles.textCenter}>
                      {this.state.description}
                    </Text>
                  </View>
                  <View style={styles.textBox}>
                    <Text style={styles.textTitle}>
                      Fontes Adicionais:
                    </Text>
                    <FlatList
                      data={this.state.additional}
                      renderItem={({ item, index }) => (
                        <View>
                          <Text style={styles.textCenter}>
                            {item.titulo}
                          </Text>
                          <OpenURLButton url={item.link}>{item.link}</OpenURLButton>
                        </View>
                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              </ScrollView>
            </SafeAreaView>
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
  viewFrontGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginBottom: 20,
    borderRadius: 10,
    paddingBottom: 5,
    paddingTop: 10,
    paddingHorizontal: 10,
    alignSelf: "center",
    width: Dimensions.get("window").width * 0.75,
  },
  textTitle: {
    fontSize: 16,
    flexWrap: 'wrap',
    fontWeight: 'bold',
    color: "white"
  },
  textCenter: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: "white",
  },
  textCenterBlue: {
    fontSize: 16,
    flexWrap: 'wrap',
    color: "#7373FF",
    fontStyle: 'italic',
    textDecorationLine: 'underline'
  }
});

export default SpecificDegreeDetailScreen;

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(
        "Erro ao abrir o link",
        "Ocorreu um erro ao abrir o link, a 'URL' (endereço) é inválida. Por favor, entre em contato com um administrador",
        [{ text: "OK", onPress: () => this.props.navigation.navigate("CommonArea") }]
      );
    }
  }, [url]);
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}>
      <Text style={styles.textCenterBlue}>{children}</Text>
    </TouchableOpacity>
  )
}