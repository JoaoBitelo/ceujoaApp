import { currentSession } from "../session/CurrentSessionInfo";
const global = require("../../util/Url");
const BASE_URL = global.BASE_URL;

export async function getFinancialDetail() {
    const basicInfo = await currentSession();
    let url = BASE_URL + global.GET_MONTHLY_PAYMENT;
    return fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: basicInfo.login,
            token: basicInfo.token,
            loginParaProcurarMensalidadesContribuicoes: basicInfo.login,
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
