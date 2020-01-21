import { AsyncStorage } from "react-native";
const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class FetchService {
  getCurrentSessionInfo = async () => {
    const value = await AsyncStorage.getItem('ID_l');
    return value;
  }

  getCalendar = async () => {
    let url = BASE_URL + global.GET_CALENDAR
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false;
      });
  }

  getPhrase = async () => {
    let url = BASE_URL + global.GET_PHRASE
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false;
      });
  }

  login = async (login, password) =>{
    let url = BASE_URL + global.LOGIN
      return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false
      });
  }

  getRegulation = async () => {
    let url = BASE_URL + global.GET_REGULATIONS
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false;
      });
  }

  getPrincipalLetter = async () => {
    let url = BASE_URL + global.GET_PRINCIPAL_LETTER
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false;
      });
  }

  getLetterMagna = async () => {
    let url = BASE_URL + global.GET_LETTER_MAGNA
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false;
      });
  }

  getDegree = async () => {
    const login = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_DEGREE
      return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false
      });
  }

  getDegreeSpecific = async (item) => {
    const login = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_DEGREE_SPECIFIC
      return fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          item: item
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) =>{
        return false
      });
  }

}
export default FetchService;