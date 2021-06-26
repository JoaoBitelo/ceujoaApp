
import AsyncStorage from "@react-native-async-storage/async-storage";

class ResponseHandler {
    falseResponse = async () => {
        Alert.alert(
            "Erro de autenticação da sessão",
            "Sessão expirada. Faça login novamente no aplicativo",
            [{ text: "OK" }]
        );
    }

    trueResponse = async (token) => {
        await AsyncStorage.setItem('ID_t', token);
    }
}
export default ResponseHandler;