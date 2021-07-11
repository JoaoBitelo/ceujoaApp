import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Alert,
    Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

export default class ButtonGenericAccess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _buttonMethod = async (item) => {
        if (item.possuiAcesso === false) {
            Alert.alert(
                "Aviso",
                "Você ainda não possui permissão para acessar essa área. Se você acredita que isto é um erro, contate um administrador.",
                [{ text: "OK" }]
            );
        } else {
            this.props.navigation.push("SpecificDegree", {
                product: item.id,
            });
        }
    };

    render() {
        return (
            <TouchableOpacity
                style={styles.TouchableOpacityEvent}
                onPress={() => this._buttonMethod(this.props.item)}
            >
                <View
                    style={{
                        flex: 4,
                        justifyContent: "center",
                        paddingBottom: 10,
                        paddingTop: 10,
                        paddingHorizontal: 2,
                    }}
                >
                    <Text style={styles.nome}>{this.props.item.nome}</Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        paddingBottom: 10,
                        paddingTop: 10,
                        paddingHorizontal: 2,
                    }}
                >
                    {this.props.item.possuiAcesso ? (
                        <Icon name="lock-open" color="white" />
                    ) : (
                        <Icon name="lock" color="white" />
                    )}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    TouchableOpacityEvent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#c7282d",
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.75,
        borderColor: "black",
        borderWidth: 1,
    },
    nome: {
        textAlign: "center",
        fontSize: 18,
        flexWrap: "wrap",
        color: "white",
    },
});
