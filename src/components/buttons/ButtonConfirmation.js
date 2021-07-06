import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Alert,
} from "react-native";
//Handlers
import { firstLogin } from "../../services/fetch/Login";
import { genericHandler } from "../../services/responseHandler/GenericHandler";

export default class ButtonConfirmation extends React.Component {
    constructor() {
        super();
    }

    _buttonMethod = async () => {
        this.setState({ loading: true });
        if (
            this.props.firstInput === this.props.secondInput &&
            this.props.firstInput !== ""
        ) {
            let res = await firstLogin(this.props.firstInput);
            res = await genericHandler({ token: res });
            if (!res) {
                this.props.navigation.navigate("Home");
            } else {
                this.props.navigation.navigate("CommonArea");
                this.setState({ loading: false });
            }
        } else {
            Alert.alert(
                "Erro durante a troca de senha",
                "Os dados que você preencheu não coincidem. Preencha-os novamente com atenção e certifique-se que ambos são iguais",
                [{ text: "OK" }]
            );
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this._buttonMethod}
            >
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
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
