import React from "react";
import { StyleSheet, View, Image, Dimensions, BackHandler } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import KeyboardBasicScreen from "../components/templates/KeyboardBasicScreen";
import ButtonConfirmation from "../components/buttons/ButtonConfirmation";

class CalendarScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            firstInput: "",
            secondInput: "",
        };
    }

    _start() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
    }

    backButtonHandler = () => {
        this.props.navigation.navigate("Home");
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
            <KeyboardBasicScreen>
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
                                value={this.state.firstInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoCompleteType="off"
                                secureTextEntry={true}
                                placeholder="Nova senha "
                                returnKeyType="go"
                                placeholderTextColor="black"
                                onChangeText={(firstInput) => {
                                    this.setState({ firstInput });
                                }}
                                textAlign={"center"}
                            />
                            <TextInput
                                style={styles.textField}
                                ref={(input) => {
                                    this.secondTextInput = input;
                                }}
                                value={this.state.secondInput}
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoCompleteType="off"
                                secureTextEntry={true}
                                placeholder="Confirme a senha"
                                returnKeyType="done"
                                placeholderTextColor="black"
                                onChangeText={(secondInput) => {
                                    this.setState({ secondInput });
                                }}
                                textAlign={"center"}
                            />

                            <View style={styles.viewBottomGround}>
                                <ButtonConfirmation
                                    text={"AVANÇAR"}
                                    firstInput={this.state.firstInput}
                                    secondInput={this.state.secondInput}
                                    navigation={this.props.navigation}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </KeyboardBasicScreen>
        );
    }
}

const styles = StyleSheet.create({
    viewUpperGround: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
    },
    image: {
        flex: 1,
        width: "70%",
        height: "70%",
        resizeMode: "contain",
        borderRadius: 200,
    },
    viewMiddleGround: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "yellow",
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
    viewBottomGround: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
    },
});

export default CalendarScreen;
