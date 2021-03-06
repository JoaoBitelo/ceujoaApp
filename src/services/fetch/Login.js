import { currentSession } from "../session/CurrentSessionInfo";
const global = require("../../util/Url");
const BASE_URL = global.BASE_URL;

export async function postlogin(login, password) {
    let url = BASE_URL + global.LOGIN;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            senha: password,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return null;
        });
}

export async function firstLogin(input){
    const basicInfo = await currentSession();
    let url = BASE_URL + global.FIRSTLOGIN
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        senha: input,
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
