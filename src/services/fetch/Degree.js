import { currentSession } from "../session/CurrentSessionInfo";
const global = require("../../util/Url");
const BASE_URL = global.BASE_URL;

export async function getDegree() {
    const basicInfo = await currentSession();
    let url = BASE_URL + global.GET_DEGREE;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: basicInfo.login,
            token: basicInfo.token,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return false;
        });
}

export async function getDegreeContent(id) {
    const basicInfo = await currentSession();
    let url = BASE_URL + global.GET_DEGREE_SPECIFIC;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: basicInfo.login,
            token: basicInfo.token,
            idDoGrau: id,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return false;
        });
}

export async function getDegreeContentDetails(id) {
    const basicInfo = await currentSession();
    let url = BASE_URL + global.GET_DEGREE_SPECIFIC_CONTENT;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: basicInfo.login,
            token: basicInfo.token,
            idDoItemQueSeraAlterado: id,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            return false;
        });
}
