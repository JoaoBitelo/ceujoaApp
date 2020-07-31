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
            this.setState({ mensalidades: res.monthlyPayment })
            this.setState({ contribuicoesAdicionais: res.additionalCharges })
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
        const title = "Situação: " + item.status
        if(item.status==="PENDENTE"){
            const text = "Nosso sistema acusa que sua contribuição está pendente. Caso tenha sido efetuada entre em contato com a tesouraria."
            Alert.alert(
                title,
                text,
                [{ text: "OK"}]
            );
        } else {
            const text = "Gratidão! Recebemos sua colaboração em " + item.date
            Alert.alert(
                title,
                text,
                [{ text: "OK"}]
            );
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
                                    {item.name}
                                </Text>
                            </View>

                            <View style={{ flex: 2, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                <Text style={item.status === "PAGO"
                                        ? styles.dataGreen
                                        : styles.dataRed
                                    }>
                                    {item.status}
                                </Text>
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
                                        <View style={{flex:1}}>
                                            <View style={styles.textBox}>
                                                <Text style={styles.textTitle}>
                                                    MENSALIDADES DE {item.year}
                                                </Text>
                                            </View>
                                            {this._flatLisRetuner(item.months)}
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
        color: "#92d36e",
    },
    dataRed: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        color: "#ff3823",
    },
});

export default FinancialScreen;