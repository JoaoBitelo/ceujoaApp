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
  SafeAreaView,
  ScrollView
} from "react-native";
import FetchService from "../../services/FetchService";
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../../services/ResponseHandler";
import DatePicker from 'react-native-datepicker'


class CalendarFilterScreen extends React.Component {
  constructor() {
    super();
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    this.state = {
      loading: false, showDatePicker: true, date: new Date()
    };
  }

  _start = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    await this.datePickerRef.onPressDate()
  }

  backButtonHandler = async () => {
    this.props.navigation.navigate("Calendar");
    return true;
  }

  _end() {
    BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
  }

  _buttonMethod = async (date) => {
    await AsyncStorage.setItem('datePicked', date).then(() => {
      this.props.navigation.navigate("Calendar");
    })
      .catch(() => {
        Alert.alert(
          "Erro de autenticação de sessão",
          "Faça login novamente no aplicativo",
          [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
        );
      })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <NavigationEvents
          onWillFocus={() => this._start()}
          onWillBlur={() => this._end()} />
        <ImageBackground
          source={require("../../../assets/backgroundCalendar.jpg")}
          style={styles.imageBackGround}>
          <DatePicker
            style={{ width: Dimensions.get("window").width * 0.75, paddingTop: 20, paddingBottom: 10 }}
            mode="date"
            format="DD-MM-YY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => { this._buttonMethod(date) }}
            showIcon={false}
            hideText={true}
            ref={(ref) => this.datePickerRef = ref}
          />
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageBackGround: {
    width: '100%',
    height: '100%',
  },
  viewFrontGround: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  datePickerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(53, 87, 35, 0.5)',
    width: Dimensions.get("window").width * 0.8,
  },
  data: {
    textAlign: 'center',
    fontSize: 16,
    flexWrap: 'wrap',
    color: "white"
  },
});

export default CalendarFilterScreen;