import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
} from "react-native";

export default class FinancialVerticalList extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    _buttonMethod = (item) => {
        const title = "Situação: " + item.status;
        const text = {
            PAGO:
                "Gratidão! Recebemos sua colaboração em " +
                item.dataDoPagamento,
            PENDENTE:
                "Nosso sistema acusa que sua contribuição está pendente. Caso tenha sido efetuada entre em contato com a tesouraria.",
            ISENTO:
                "Isenção em" +
                item.dataDoPagamento +
                ". Procure a tesouraria para manter a sua situação regularizada.",
        };
        Alert.alert(title, text[item.status], [{ text: "OK" }]);
    };

    _getStyle = (item) => {
        if (item === "PAGO") {
            return <Text style={styles.dataGreen}>{item}</Text>;
        } else if (item === "PENDENTE") {
            return <Text style={styles.dataRed}>{item}</Text>;
        } else {
            return <Text style={styles.dataBlue}>{item}</Text>;
        }
    };

    render() {
        return (
            <FlatList
                style={{ flex: 3 }}
                data={this.props.array}
                renderItem={({ item, index }) => (
                    <View style={styles.viewFrontGround}>
                        <TouchableOpacity
                            style={styles.TouchableOpacityEvent}
                            onPress={() => this._buttonMethod(item)}
                        >
                            <View
                                style={{
                                    flex: 3,
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    paddingHorizontal: 2,
                                }}
                            >
                                <Text style={styles.dataStandard}>
                                    {item.nome}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 2,
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    paddingHorizontal: 2,
                                }}
                            >
                                {this._getStyle(item.status)}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = StyleSheet.create({
    viewFrontGround: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
    TouchableOpacityEvent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.8,
        borderColor: "black",
        borderWidth: 1,
    },
    dataStandard: {
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        color: "white",
    },
    dataGreen: {
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "#92d36e",
    },
    dataRed: {
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "#ff3823",
    },
    dataBlue: {
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "#31B7D2",
    },
});
