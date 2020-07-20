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

    nullResponse = async () => {
        Alert.alert(
            "Erro de internet",
            "Não foi possível realizar esta solicitação. Verifique sua conexão com a internet",
            [{ text: "OK", onPress: () => this.props.navigation.navigate("Home") }]
        );
    }
    trueResponse = async (token) => {
        await AsyncStorage.setItem('ID_t', token);
    }
}
export default ResponseHandler;