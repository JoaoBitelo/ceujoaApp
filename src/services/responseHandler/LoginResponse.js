import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export async function loginHandler(response, login) {
    // Problema de conexao
    if (response === null) {
        responseNull();
        return false;
    }
    // Problema de login/senha
    if (!response) {
        responseFalse();
        return false;
    }
    // Resposta ok
    await responseTrue(login, response.token, response.ehADM);
    return response;
}

async function responseTrue(login, token, ehADM) {
    await AsyncStorage.setItem("ID_l", login);
    await AsyncStorage.setItem("ID_t", token);
    if (ehADM) {
        await AsyncStorage.setItem("ID_adm", "true");
    } else {
        await AsyncStorage.setItem("ID_adm", "false");
    }
}

function responseNull() {
    Alert.alert(
        "Erro de internet",
        "Não foi possível realizar esta solicitação. Verifique sua conexão com a internet",
        [{ text: "OK" }]
    );
}

function responseFalse() {
    Alert.alert(
        "Login ou senha incorreto",
        "O login ou senha informados estão incorretos. Preencha-os novamente atentamente. Se o erro persistir, contate um administrador do sistema.",
        [{ text: "OK" }]
    );
}
