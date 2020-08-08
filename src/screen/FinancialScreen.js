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
    SafeAreaView,
    ScrollView,
    Alert
} from "react-native";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../services/ResponseHandler";

class FinancialScreen extends React.Component {
    constructor() {
        super();
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
        this.state = {
            loading: false, mensalidades: [], contribuicoesAdicionais: []
        };
    }

    _start() {
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
        this._loadClient();
    }

    _loadClient = async () => {
        this.setState({ loading: true })
        const res = await this.FetchService.getMonthlyPayment();
        if (res === null) {
            this.ResponseHandler.nullResponse();
            this.props.navigation.navigate('Home');
        } else if (res === false) {
            this.ResponseHandler.falseResponse();
            this.props.navigation.navigate('Home');
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            this.setState({ mensalidades: res.mensalidades })
            this.setState({ contribuicoesAdicionais: res.contribuicoesAdicionais })
            this.setState({ loading: false })
        }
    }

    backButtonHandler = () => {
        this.props.navigation.navigate("CommonArea");
        return true;
    }

    _end() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
    }

    _buttonMethod = (item) => {
        if (item.status === "PENDENTE") {
            const title = "Situação: " + item.status
            const text = "Nosso sistema acusa que sua contribuição está pendente. Caso tenha sido efetuada entre em contato com a tesouraria."
            Alert.alert(
                title,
                text,
                [{ text: "OK" }]
            );
        } else if (item.status === "PAGO") {
            const title = "Situação: " + item.status
            const text = "Gratidão! Recebemos sua colaboração em " + item.dataDoPagamento
            Alert.alert(
                title,
                text,
                [{ text: "OK" }]
            );
        } else {
            const title = "Situação: " + item.status
            const text = "Isenção em" + item.dataDoPagamento + ". Procure a tesouraria para manter a sua situação regularizada."
            Alert.alert(
                title,
                text,
                [{ text: "OK" }]
            );
        }
    }

    _getStyle = (item) => {
        if (item === "PAGO") {
            return (
                <Text style={styles.dataGreen}>
                    {item}
                </Text>
            )

        } else if (item === "PENDENTE") {
            return (
                <Text style={styles.dataRed}>
                    {item}
                </Text>
            )
        } else {
            return (
                <Text style={styles.dataBlue}>
                    {item}
                </Text>
            )
        }
    }

    _flatLisRetuner(array) {
        return (
            <FlatList style={{ flex: 3 }}
                data={array}
                renderItem={({ item, index }) => (
                    <View style={styles.viewFrontGround}>
                        <TouchableOpacity
                            style={styles.TouchableOpacityEvent}
                            onPress={() => this._buttonMethod(item)}>
                            <View style={{ flex: 3, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                <Text style={styles.dataStandard}>
                                    {item.nome}
                                </Text>
                            </View>

                            <View style={{ flex: 2, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                {this._getStyle(item.status)}
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }

    render() {
        if (this.state.loading === true) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.viewBackground}>
                    <NavigationEvents
                        onWillFocus={() => this._start()}
                        onWillBlur={() => this._end()} />
                    <ImageBackground
                        source={require("../../assets/backgroundCalendar.jpg")}
                        style={styles.imageBackGround}>

                        <SafeAreaView style={styles.viewFrontGround}>
                            <ScrollView>
                                <View style={styles.textBox}>
                                    <Text style={styles.textTitle}>
                                        CONTRIBUIÇÕES ADICIONAIS
                                    </Text>
                                </View>
                                {this._flatLisRetuner(this.state.contribuicoesAdicionais)}
                                <FlatList style={{ flex: 3 }}
                                    data={this.state.mensalidades}
                                    renderItem={({ item, index }) => (
                                        <View style={{ flex: 1 }}>
                                            <View style={styles.textBox}>
                                                <Text style={styles.textTitle}>
                                                    MENSALIDADES DE {item.ano}
                                                </Text>
                                            </View>
                                            {this._flatLisRetuner(item.meses)}
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </ScrollView>
                        </SafeAreaView >
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
        width: '100%',
        height: '100%',
    },
    viewFrontGround: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    TouchableOpacityEvent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.8,
        borderColor: 'black',
        borderWidth: 1,
    },
    textBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
    },
    textTitle: {
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center',
    },
    dataStandard: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        color: "white"
    },
    dataGreen: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "#92d36e",
    },
    dataRed: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "#ff3823",
    },
    dataBlue: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "#31B7D2",
    }
});

export default FinancialScreen;