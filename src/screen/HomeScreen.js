import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    BackHandler,
} from "react-native";
//Extra styles
import { TextInput } from "react-native-gesture-handler";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import KeyboardBasicScreen from "../components/templates/KeyboardBasicScreen";
//Handlers
import { NavigationEvents } from "react-navigation";
import { getLogin } from "../util/LoadInfo";
import { loginHandler } from "../services/responseHandler/LoginResponse";
import { postlogin } from "../services/fetch/Login";

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = { login: "jbitelo", password: "12", loading: false };
    }

    _loginButtonMethod = async () => {
        this.setState({ loading: true });
        let res = await postlogin(this.state.login, this.state.password);
        res = await loginHandler(res, this.state.login);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            if (res.primeiroLogin) {
                this.props.navigation.navigate("FirstLogin");
            } else {
                this.props.navigation.navigate("CommonArea");
            }
        }
        this.setState({ loading: false });
    };

    _start = async () => {
        let loginStored = await getLogin();
        if (loginStored !== null) {
            this.setState({ login: loginStored });
        }
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
    };

    backButtonHandler = () => {
        BackHandler.exitApp();
        return true;
    };

    _end() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
    }

    render() {
        return (
            <KeyboardBasicScreen home={true}>
                <NavigationEvents
                    onWillFocus={() => this._start()}
                    onWillBlur={() => this._end()}
                />
                {this.state.loading ? (
                    <LoadingScreen />
                ) : (
                    <View>
                        <View style={styles.viewUpperGround}>
                            <Image
                                style={styles.image}
                                source={require("../../assets/logo.jpg")}
                            />
                        </View>

                        <View style={styles.viewMiddleGround}>
                            <TextInput
                                style={styles.textField}
                                onSubmitEditing={() => {
                                    this.secondTextInput.focus();
                                }}
                                value={this.state.login}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoCompleteType="off"
                                placeholder="LOGIN "
                                returnKeyType="go"
                                placeholderTextColor="black"
                                onChangeText={(login) => {
                                    this.setState({ login });
                                }}
                                textAlign={"center"}
                            ></TextInput>
                            <TextInput
                                style={styles.textField}
                                ref={(input) => {
                                    this.secondTextInput = input;
                                }}
                                value={this.state.password}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoCompleteType="off"
                                secureTextEntry={true}
                                placeholder="SENHA"
                                returnKeyType="done"
                                placeholderTextColor="black"
                                onChangeText={(password) => {
                                    this.setState({ password });
                                }}
                                textAlign={"center"}
                            />
                        </View>

                        <View style={styles.viewBottomGround}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={this._loginButtonMethod}
                            >
                                <Text style={styles.buttonText}>AVANÇAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </KeyboardBasicScreen>
        );
    }
}
const styles = StyleSheet.create({
    viewUpperGround: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        flex: 1,
        width: "80%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 200,
    },
    viewMiddleGround: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    viewBottomGround: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textField: {
        color: "#000",
        marginBottom: 20,
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.07,
        backgroundColor: "rgba(255,255,255,0.6)",
        borderRadius: 50,

        borderColor: "black",
        borderWidth: 1,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",

        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.07,
        backgroundColor: "#c7282d",
        borderRadius: 50,

        borderColor: "black",
        borderWidth: 1,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 18,
    },
});
