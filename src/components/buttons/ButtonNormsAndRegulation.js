import React from "react";
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
    Linking,
    Alert,
} from "react-native";
//Handlers
import { getText } from "../../services/fetch/NormsRegulations";
import { genericHandler } from "../../services/responseHandler/GenericHandler";

export default class ButtonNormsAndRegulation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _openURLButton = async (name) => {
        this.setState({ loading: true });
        let res = await getText(name);
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            const supported = await Linking.canOpenURL(res.content.link);
            if (supported) {
                await Linking.openURL(res.content.link);
            } else {
                Alert.alert(
                    "Erro ao abrir o link",
                    "Ocorreu um erro ao abrir o link, o endereço é inválido. Por favor, entre em contato com um administrador",
                    [{ text: "OK" }]
                );
            }
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <TouchableOpacity
                style={styles.textBox}
                onPress={() => this._openURLButton(this.props.link)}
            >
                <Text style={styles.text}>{this.props.tittle}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textBox: {
        justifyContent: "center",
        backgroundColor: "#c7282d",
        borderRadius: 10,
        marginBottom: 20,
        padding: 10,
        width: Dimensions.get("window").width * 0.75,

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
    text: {
        textAlign: "center",
        fontSize: 18,
        flexWrap: "wrap",
        color: "white",
    },
});
