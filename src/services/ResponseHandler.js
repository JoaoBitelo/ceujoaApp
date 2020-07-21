import {Alert} from "react-native";
import { AsyncStorage } from "react-native";

class ResponseHandler {
    loginResponse = async (login, token) => {
        await AsyncStorage.setItem('ID_l', login);
        await AsyncStorage.setItem('ID_t', token);
    }

    falseResponse = async () => {
        Alert.alert(
            "Erro de autenticação da sessão",
            "Sessão expirada. Faça login novamente no aplicativo",
            [{ text: "OK"}]
        );
    }

    falseLogin = async () => {
        Alert.alert(
            "Login ou senha incorreto",
            "O login ou senha informados estão incorretos. Preencha-os novamente atentamente. Se o erro persistir, contate um administrador do sistema.",
            [{ text: "OK"}]
        );
    }

    nullResponse = async () => {
        Alert.alert(
            "Erro de internet",
            "Não foi possível realizar esta solicitação. Verifique sua conexão com a internet",
            [{ text: "OK"}]
        );
    }
    trueResponse = async (token) => {
        await AsyncStorage.setItem('ID_t', token);
    }
}
export default ResponseHandler;