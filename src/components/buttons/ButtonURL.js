import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Linking,
    Alert,
} from "react-native";

export default class ButtonURL extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _buttonMethod = async () => {
        const supported = await Linking.canOpenURL(this.props.text);
        if (supported) {
            await Linking.openURL(this.props.text);
        } else {
            Alert.alert(
                "Erro ao abrir o link",
                "Ocorreu um erro ao abrir o link, a 'URL' (endereço) é inválida. Por favor, entre em contato com um administrador",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            this.props.navigation.navigate("CommonArea"),
                    },
                ]
            );
        }
    };

    render() {
        return (
            <TouchableOpacity onPress={this._buttonMethod}>
                <Text style={styles.textCenterBlue}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textCenterBlue: {
        fontSize: 16,
        flexWrap: "wrap",
        color: "#7373FF",
        fontStyle: "italic",
        textDecorationLine: "underline",
    },
});
