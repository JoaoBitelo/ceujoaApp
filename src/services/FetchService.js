import { AsyncStorage } from "react-native";
const global = require('../util/Url');
const BASE_URL = global.BASE_URL;

class FetchService {

  getCurrentSessionInfo = async () => {
    return null;
  }

  firstLogin = async (firstInput) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.FIRSTLOGIN
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senha: firstInput,
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

  getDegree = async () => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_DEGREE
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
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

  getDegreeSpecific = async (id) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_DEGREE_SPECIFIC
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        idDoGrau: id
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

  getDegreeSpecificContent = async (id) => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_DEGREE_SPECIFIC_CONTENT
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        idDoItemQueSeraAlterado: id
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

  getBirthdays = async () => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_BIRTHDAYS
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

  getMonthlyPayment = async () => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_MONTHLY_PAYMENT
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: basicInfo.login,
        token: basicInfo.token,
        loginParaProcurarMensalidadesContribuicoes: basicInfo.login
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

  getStock = async () => {
    const basicInfo = await this.getCurrentSessionInfo();
    let url = BASE_URL + global.GET_STOCK
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
}
export default FetchService;