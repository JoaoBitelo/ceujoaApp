import AsyncStorage from "@react-native-async-storage/async-storage";

export async function currentSession() {
    return {
        login: await AsyncStorage.getItem("ID_l"),
        token: await AsyncStorage.getItem("ID_t"),
    };
}

export async function setCurrentDegree(id) {
    return AsyncStorage.setItem("currentDegree", JSON.stringify(id))
}

export async function getCurrentDegree(id) {
    return AsyncStorage.setItem("currentDegree", JSON.stringify(id))
}
