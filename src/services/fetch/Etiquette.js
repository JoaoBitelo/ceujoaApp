import { currentSession } from "../session/CurrentSessionInfo";
const global = require("../../util/Url");
const BASE_URL = global.BASE_URL;

export async function getText() {
    const basicInfo = await currentSession();
    let url = BASE_URL + global.GET_SOURCE;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome: "RegrasDeEtiqueta",
            login: basicInfo.login,
            token: basicInfo.token,
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
