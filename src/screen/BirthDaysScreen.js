import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Dimensions,
    FlatList,
    BackHandler,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Alert,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/BasicScreen";
//Handlers
import { getBirthday } from "../services/fetch/Birthday";
import { genericHandler } from "../services/responseHandler/GenericHandler";

class BirthDaysScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            janeiro: [],
            fevereiro: [],
            marco: [],
            abril: [],
            maio: [],
            junho: [],
            julho: [],
            agosto: [],
            setembro: [],
            outubro: [],
            novembro: [],
            dezembro: [],
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
        let res = await getBirthday();
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            if (res.aniversarios === "invalido") {
                this.setState({ loading: false });
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
            } else {
                this.setState({ janeiro: res.aniversarios[0] });
                this.setState({ fevereiro: res.aniversarios[1] });
                this.setState({ marco: res.aniversarios[2] });
                this.setState({ abril: res.aniversarios[3] });
                this.setState({ maio: res.aniversarios[4] });
                this.setState({ junho: res.aniversarios[5] });
                this.setState({ julho: res.aniversarios[6] });
                this.setState({ agosto: res.aniversarios[7] });
                this.setState({ setembro: res.aniversarios[8] });
                this.setState({ outubro: res.aniversarios[9] });
                this.setState({ novembro: res.aniversarios[10] });
                this.setState({ dezembro: res.aniversarios[11] });
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

    _monthListReturner(array) {
        if (array.length > 0) {
            return (
                <FlatList
                    style={{ flex: 3 }}
                    data={array}
                    renderItem={({ item, index }) => (
                        <View style={styles.viewFrontGround}>
                            <View style={styles.TouchableOpacityEvent}>
                                <View
                                    style={{
                                        flex: 3,
                                        paddingBottom: 10,
                                        paddingTop: 10,
                                        paddingHorizontal: 2,
                                    }}
                                >
                                    <Text style={styles.text}>{item.nome}</Text>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        paddingBottom: 10,
                                        paddingTop: 10,
                                        paddingHorizontal: 2,
                                    }}
                                >
                                    <Text style={styles.text}>
                                        {item.aniversario}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            );
        } else {
            return null;
        }
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
                        <ScrollView>
                            {this.state.janeiro.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Janeiro
                                        </Text>
                                    </View>
                                    {this._monthListReturner(
                                        this.state.janeiro
                                    )}
                                </View>
                            )}
                            {this.state.fevereiro.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Fevereiro
                                        </Text>
                                    </View>
                                    {this._monthListReturner(
                                        this.state.fevereiro
                                    )}
                                </View>
                            )}
                            {this.state.marco.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Março
                                        </Text>
                                    </View>
                                    {this._monthListReturner(this.state.marco)}
                                </View>
                            )}
                            {this.state.abril.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Abril
                                        </Text>
                                    </View>
                                    {this._monthListReturner(this.state.abril)}
                                </View>
                            )}
                            {this.state.maio.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Maio
                                        </Text>
                                    </View>
                                    {this._monthListReturner(this.state.maio)}
                                </View>
                            )}
                            {this.state.junho.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Junho
                                        </Text>
                                    </View>
                                    {this._monthListReturner(this.state.junho)}
                                </View>
                            )}
                            {this.state.julho.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Julho
                                        </Text>
                                    </View>
                                    {this._monthListReturner(this.state.julho)}
                                </View>
                            )}
                            {this.state.agosto.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Agosto
                                        </Text>
                                    </View>
                                    {this._monthListReturner(this.state.agosto)}
                                </View>
                            )}
                            {this.state.setembro.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Setembro
                                        </Text>
                                    </View>
                                    {this._monthListReturner(
                                        this.state.setembro
                                    )}
                                </View>
                            )}
                            {this.state.outubro.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Outubro
                                        </Text>
                                    </View>
                                    {this._monthListReturner(
                                        this.state.outubro
                                    )}
                                </View>
                            )}
                            {this.state.novembro.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Novembro
                                        </Text>
                                    </View>
                                    {this._monthListReturner(
                                        this.state.novembro
                                    )}
                                </View>
                            )}
                            {this.state.dezembro.length > 0 && (
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Dezembro
                                        </Text>
                                    </View>
                                    {this._monthListReturner(
                                        this.state.dezembro
                                    )}
                                </View>
                            )}
                        </ScrollView>
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
    TouchableOpacityEvent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.75,
        borderColor: "black",
        borderWidth: 1,
    },
    textBox: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
    },
    textTitle: {
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    text: {
        textAlign: "center",
        fontSize: 16,
        flexWrap: "wrap",
        color: "white",
    },
});

export default BirthDaysScreen;
