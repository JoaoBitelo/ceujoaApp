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
    ScrollView
} from "react-native";
import FetchService from "../services/FetchService";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../services/ResponseHandler";

class BirthDaysScreen extends React.Component {
    constructor() {
        super();
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
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
            dezembro: []
        };
    }

    _start() {
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
        this._loadClient();
    }

    _loadClient = async () => {
        this.setState({ loading: true })
        const res = await this.FetchService.getBirthdays();
        if (res === null) {
            this.ResponseHandler.nullResponse();
            this.props.navigation.navigate('Home');
        } else if (res === false) {
            this.ResponseHandler.falseResponse();
            this.props.navigation.navigate('Home');
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            this.setState({ janeiro: res.birthDays[0] })
            this.setState({ fevereiro: res.birthDays[1] })
            this.setState({ marco: res.birthDays[2] })
            this.setState({ abril: res.birthDays[3] })
            this.setState({ abril: res.birthDays[4] })
            this.setState({ junho: res.birthDays[5] })
            this.setState({ julho: res.birthDays[6] })
            this.setState({ agosto: res.birthDays[7] })
            this.setState({ setembro: res.birthDays[8] })
            this.setState({ outubro: res.birthDays[9] })
            this.setState({ novembro: res.birthDays[10] })
            this.setState({ dezembro: res.birthDays[11] })
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

    _monthListReturner(array) {
        if (array.length > 0) {
            return (
                <FlatList style={{ flex: 3 }}
                    data={array}
                    renderItem={({ item, index }) => (
                        <View style={styles.viewFrontGround}>

                            <View style={styles.TouchableOpacityEvent}>
                                <View style={{ flex: 3, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                    <Text style={styles.data}>
                                        {item.name}
                                    </Text>
                                </View>

                                <View style={{ flex: 2, paddingBottom: 14, paddingTop: 14, paddingHorizontal: 2 }}>
                                    <Text style={styles.data}>
                                        {item.birthday}
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
    };

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
                                {this.state.janeiro.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Janeiro
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.janeiro)}
                                    </View>
                                }
                                {this.state.fevereiro.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Fevereiro
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.fevereiro)}
                                    </View>
                                }
                                {this.state.marco.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Março
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.marco)}
                                    </View>
                                }
                                {this.state.abril.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Abril
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.abril)}
                                    </View>
                                }
                                {this.state.maio.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Maio
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.maio)}
                                    </View>
                                }
                                {this.state.junho.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Junho
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.junho)}
                                    </View>
                                }
                                {this.state.julho.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Julho
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.julho)}
                                    </View>
                                }
                                {this.state.agosto.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Agosto
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.agosto)}
                                    </View>
                                }
                                {this.state.setembro.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Setembro
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.setembro)}
                                    </View>
                                }
                                {this.state.outubro.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Outubro
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.outubro)}
                                    </View>
                                }
                                {this.state.novembro.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Novembro
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.novembro)}
                                    </View>
                                }
                                {this.state.dezembro.length > 0 &&
                                    <View style={{ flex: 1 }}>
                                        <View style={styles.textBox}>
                                            <Text style={styles.textTitle}>
                                                Dezembro
                                            </Text>
                                        </View>
                                        {this._monthListReturner(this.state.dezembro)}
                                    </View>
                                }
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
        backgroundColor: 'rgba(53, 87, 35, 0.5)',
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.75,

        borderColor: 'black',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    atividade: {
        textAlign: 'center',
        fontSize: 18,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "white"
    },
    data: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        color: "white"
    },
    textBox: {
        backgroundColor: 'rgba(53, 87, 35, 0.5)',
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
    },
    textTitle: {
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center',
    }
});

export default BirthDaysScreen;