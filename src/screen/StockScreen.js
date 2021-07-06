import React from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    BackHandler,
    SafeAreaView,
    Alert,
    Dimensions,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/templates/BasicScreen";
//Handlers
import { getStock } from "../services/fetch/Stock";
import { genericHandler } from "../services/responseHandler/GenericHandler";

export default class StockScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            data: [],
        };
    }

    _start() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
        this._loadClient();
    }

    _loadClient = async () => {
        this.setState({ loading: true });
        let res = await getStock();
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            if (res.materiais === "invalido") {
                Alert.alert(
                    "Não autorizado",
                    "Desculpe, mas esta área é apenas para associados",
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                this.props.navigation.navigate("CommonArea"),
                        },
                    ]
                );
                this.setState({ loading: false });
            } else {
                this.setState({ data: res.materiais });
                this.setState({ loading: false });
            }
        }
        this.setState({ loading: false });
    };

    backButtonHandler = () => {
        this.props.navigation.navigate("CommonArea");
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
            <BasicScreen>
                <NavigationEvents
                    onWillFocus={() => this._start()}
                    onWillBlur={() => this._end()}
                />
                {this.state.loading ? (
                    <LoadingScreen />
                ) : (
                    <SafeAreaView style={styles.viewFrontGround}>
                        <FlatList
                            style={{ flex: 3 }}
                            data={this.state.data}
                            renderItem={({ item, index }) => (
                                <View style={styles.textBox}>
                                    <View
                                        style={styles.textBoxLineWithBottomLine}
                                    >
                                        <Text style={styles.textTitle}>
                                            item:{" "}
                                        </Text>
                                        <Text style={styles.text}>
                                            {item.nome}
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.textBoxLineWithBottomLine}
                                    >
                                        <Text style={styles.textTitle}>
                                            necessidade:{" "}
                                        </Text>
                                        <Text style={styles.text}>
                                            {item.necessidade}
                                        </Text>
                                    </View>
                                    <View style={styles.textBoxLine}>
                                        <Text style={styles.textTitle}>
                                            estoque:{" "}
                                        </Text>
                                        {parseInt(item.estoque, 10) >=
                                        parseInt(item.necessidade, 10) ? (
                                            <Text style={styles.textGreen}>
                                                {item.estoque}
                                            </Text>
                                        ) : (
                                            <Text style={styles.textRed}>
                                                {item.estoque}
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                )}
            </BasicScreen>
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
    textBox: {
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        width: Dimensions.get("window").width * 0.9,
    },
    textBoxLineWithBottomLine: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "white",
    },
    textBoxLine: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    textTitle: {
        flex: 1,
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    text: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        color: "white",
        fontWeight: "bold",
    },
    textGreen: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        color: "#92d36e",
        fontWeight: "bold",
    },
    textRed: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        color: "#ff4f54",
        fontWeight: "bold",
    },
});
