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

class StockScreen extends React.Component {
    constructor() {
        super();
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
        this.state = {
            loading: false, data: []
        };
    }

    _start() {
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
        this._loadClient();
    }

    _loadClient = async () => {
        this.setState({ loading: true })
        const res = await this.FetchService.getStock();
        if (res === null) {
            this.ResponseHandler.nullResponse();
            this.props.navigation.navigate('Home');
        } else if (res === false) {
            this.ResponseHandler.falseResponse();
            this.props.navigation.navigate('Home');
        } else {
            await this.ResponseHandler.trueResponse(res.token);
            this.setState({ data: res.stock })
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
                                <FlatList style={{ flex: 3 }}
                                    data={this.state.data}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.textBox}>
                                            <View style={styles.textBoxLineWithBottomLine}>
                                                <Text style={styles.textTitle}>ITEM: </Text>
                                                <Text style={styles.text}>{item.name}</Text>
                                            </View>
                                            <View style={styles.textBoxLineWithBottomLine}>
                                                <Text style={styles.textTitle}>NECESSIDADE: </Text>
                                                <Text style={styles.text}>{item.need}</Text>
                                            </View>
                                            <View style={styles.textBoxLine}>
                                                <Text style={styles.textTitle}>ESTOQUE: </Text>
                                                {parseInt(item.stock, 10)>=parseInt(item.need, 10)
                                                    ?
                                                    <Text style={styles.textGreen}>{item.stock}</Text>
                                                    :
                                                    <Text style={styles.textRed}>{item.stock}</Text>
                                                }
                                            </View>
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
    textBox: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        //backgroundColor: 'rgba(53, 87, 35, 0.5)',
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        //alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
    },
    textBoxLineWithBottomLine:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    textBoxLine: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        flex: 1,
        fontSize: 20,
        flexWrap: 'wrap',
        fontWeight: 'bold',
        color: "white",
        textAlign: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        flexWrap: 'wrap',
        color: "white"
    },
    textGreen: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        flexWrap: 'wrap',
        color: "#92d36e"
    },
    textRed: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        flexWrap: 'wrap',
        color: "#ff3823"
    },
});

export default StockScreen;