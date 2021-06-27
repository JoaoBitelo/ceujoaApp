import AsyncStorage from "@react-native-async-storage/async-storage";

export async function currentSession() {
    return {
        login: await AsyncStorage.getItem("ID_l"),
        token: await AsyncStorage.getItem("ID_t"),
    };
}
