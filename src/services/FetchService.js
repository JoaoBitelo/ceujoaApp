import { AsyncStorage } from "react-native";
const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class FetchService {
  getCalendar = async () => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_CALENDAR
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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

  getCalendarFilter = async (date) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_CALENDAR_FILTER
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        data: date
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

  getCalendarEvent = async (id) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_CALENDAR_EVENT
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        idDoEvento: id
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

  getATA = async (id) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_ATA
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        idDoEvento: id
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

  updateATA = async (id, users) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.UPDATE_ATA
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        eventID: id,
        users: users
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
}
export default FetchService;