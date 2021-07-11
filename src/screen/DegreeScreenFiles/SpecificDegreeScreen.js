import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ImageBackground,
    Dimensions,
    FlatList,
    BackHandler,
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../../components/LoadingScreen";
import BasicScreen from "../../components/templates/BasicScreen";
import TextBox from "../../components/TextBox";
//Handlers
import { getDegreeContent } from "../../services/fetch/Degree";
import { genericHandler } from "../../services/responseHandler/GenericHandler";

class SpecificDegreeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            dados: [],
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
        const { product } = await this.props.navigation.state.params;
        let res = await getDegreeContent(product.$oid);
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            this.setState({ dados: res.conteudoDoGrau });
            this.setState({ loading: false });
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

    _buttonMethod = async (item) => {
        await AsyncStorage.setItem(
            "currentDegreeDetail",
            JSON.stringify(item.id)
        )
            .then(() => {
                this.props.navigation.navigate("SpecificDegreeDetail");
            })
            .catch(() => {
                Alert.alert(
                    "Erro de autenticação de sessão",
                    "Faça login novamente no aplicativo",
                    [
                        {
                            text: "OK",
                            onPress: () =>
                                this.props.navigation.navigate("Home"),
                        },
                    ]
                );
            });
    };

    render() {
        if (this.state.loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.viewBackground}>
                    <NavigationEvents
                        onWillFocus={() => this._start()}
                        onWillBlur={() => this._end()}
                    />
                    <ImageBackground
                        source={require("../../../assets/backgroundCalendar.jpg")}
                        style={styles.imageBackGround}
                    >
                        <View style={{ flex: 0.01 }}></View>
                        <SafeAreaView style={styles.viewFrontGround}>
                            <ScrollView>
                                <FlatList
                                    style={{ flex: 1 }}
                                    data={this.state.dados}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity
                                            style={styles.TouchableOpacityEvent}
                                            onPress={() =>
                                                this._buttonMethod(item)
                                            }
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
                                                <Text style={styles.nome}>
                                                    {item.nome}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item, index) =>
                                        index.toString()
                                    }
                                />
                            </ScrollView>
                        </SafeAreaView>
                        <View style={{ flex: 0.01 }}></View>
                    </ImageBackground>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    viewBackground: {
        flex: 1,
    },
    imageBackGround: {
        width: "100%",
        height: "100%",
    },
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

export default SpecificDegreeScreen;
