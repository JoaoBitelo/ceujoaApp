import { AsyncStorage } from "react-native";
const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class FetchService {

  getCurrentSessionInfo = async () => {
    const value = {
      login: await AsyncStorage.getItem('ID_l'),
      token: await AsyncStorage.getItem('ID_t')
    };    
    return value;
  }

  getCalendar = async () => {
    let url = BASE_URL + global.GET_CALENDAR
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        return responseJson
      })
      .catch((error) => {
        return null;
      });
  }

  login = async (login, password) => {
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
      .catch((error) => {
        return null
      });
  }

  getSource = async (name) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_SOURCE
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        login: basicInfo.login,
        token: basicInfo.token
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        return null
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
      .catch((error) => {
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
      .catch((error) => {
        return false
      });
  }
}
export default FetchService;