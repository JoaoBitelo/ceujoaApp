import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export async function genericHandler(response) {
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
    await responseTrue(response.token);
    return response;
}

async function responseTrue(token) {
    await AsyncStorage.setItem("ID_t", token);
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
        "Erro de autenticação da sessão",
        "Sessão expirada. Faça login novamente no aplicativo",
        [{ text: "OK" }]
    );
}
