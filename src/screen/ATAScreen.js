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
import { AsyncStorage } from "react-native";
import { NavigationEvents } from 'react-navigation';
import ResponseHandler from "../services/ResponseHandler";
import { Icon } from 'react-native-elements'

class ATAScreen extends React.Component {
    constructor() {
        super();
        this.FetchService = new FetchService();
        this.ResponseHandler = new ResponseHandler();
        this.state = {
            loading: false, users: []
        };
    }

    _start() {
        BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
        this._loadClient();
    }

    backButtonHandler = () => {
        this.props.navigation.navigate("CalendarDetail");
        return true;
    }

    _end() {
        BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
    }

    _loadClient = async () => {
        this.setState({ loading: true })
        var isADM = await AsyncStorage.getItem('ID_adm');
        if (isADM !== "true") {
            Alert.alert(
                "Não autorizado",
                "Desculpe, mas esta área é apenas para administradores",
                [{ text: "OK" }]
            );
            this.setState({ loading: false })
            this.props.navigation.navigate('CalendarDetail');
        } else {
            var itemID = await AsyncStorage.getItem('currentEvent');
            itemID = JSON.parse(itemID);
            var res = await this.FetchService.getATA(itemID.$oid);
            if (res === null) {
                this.ResponseHandler.nullResponse();
                this.setState({ loading: false })
                this.props.navigation.navigate('Home');
            } else if (res === false) {
                this.ResponseHandler.falseResponse();
                this.setState({ loading: false })
                this.props.navigation.navigate('Home');
            } else {
                await this.ResponseHandler.trueResponse(res.token);
                await this._createObject(res.usuarios);
                this.setState({ loading: false })
            }
        }
    }

    _createObject = async (res) => {
        var presentes = [];
        var ausentes = [];
        var justificados = [];
        var dispensados = [];
        var naoAvaliados = [];
        for (let index = 0; index < res.length; index++) {
            var obj = {
                user: res[index],
                isSelected: false
            }
            if (res[index].presenca === "Presente") {
                presentes.push(obj)
            } else if (res[index].presenca === "Ausente") {
                ausentes.push(obj)
            } else if (res[index].presenca === "Falta justificada") {
                justificados.push(obj)
            } else if (res[index].presenca === "Dispensado") {
                dispensados.push(obj)
            } else {
                naoAvaliados.push(obj)
            }
        }
        var ob = {
            presentes: presentes,
            ausentes: ausentes,
            justificados: justificados,
            dispensados: dispensados,
            naoAvaliados: naoAvaliados
        }
        this.setState({ users: ob })
        await AsyncStorage.setItem('ata', JSON.stringify(this.state.users));
    }

    _selectionButtonMethod = async (indexObj, item, nameOfTheList) => {
        var list = this.state.users
        var pressed = true;
        if (item.isSelected === true) {
            pressed = false;
        }
        if (nameOfTheList === "naoAvaliados") {
            list.naoAvaliados[indexObj].isSelected = pressed;
        } else if (nameOfTheList === "ausentes") {
            list.ausentes[indexObj].isSelected = pressed;
        } else if (nameOfTheList === "justificados") {
            list.justificados[indexObj].isSelected = pressed;
        } else if (nameOfTheList === "presentes") {
            list.presentes[indexObj].isSelected = pressed;
        } else {
            list.dispensados[indexObj].isSelected = pressed;
        }
        this.setState({ users: list })
    }

    _modificationButtonMethod = async (nameOfTheList) => {
        this.setState({ loading: true })
        //separa os dados a serem atualizados
        //atualiza o state
        await this._updateData(nameOfTheList);
        //salva a atualizacao para ser obtida pelo header        
        await AsyncStorage.setItem('ata', JSON.stringify(this.state.users));
        this.setState({ loading: false })
    }

    _updateData(nameOfTheList) {
        //vetor que ira se tornar o novo state
        var listToRemain = {
            presentes: [],
            ausentes: [],
            justificados: [],
            dispensados: [],
            naoAvaliados: []
        }
        //vetor com as copias dos objetos a serem movidos
        var listToMove = [];
        //separa os objetos a serem movidos, criando copia deles
        for (let index = 0; index < this.state.users.presentes.length; index++) {
            if (this.state.users.presentes[index].isSelected === true) {
                var ob = {
                    isSelected: false,
                    user: this.state.users.presentes[index].user
                }
                listToMove.push(ob);
            } else {
                listToRemain.presentes.push(this.state.users.presentes[index])
            }

        }

        for (let index = 0; index < this.state.users.ausentes.length; index++) {
            if (this.state.users.ausentes[index].isSelected === true) {
                var ob = {
                    isSelected: false,
                    user: this.state.users.ausentes[index].user
                }
                listToMove.push(ob);
            } else {
                listToRemain.ausentes.push(this.state.users.ausentes[index])
            }

        }

        for (let index = 0; index < this.state.users.justificados.length; index++) {
            if (this.state.users.justificados[index].isSelected === true) {
                var ob = {
                    isSelected: false,
                    user: this.state.users.justificados[index].user
                }
                listToMove.push(ob);
            } else {
                listToRemain.justificados.push(this.state.users.justificados[index])
            }

        }

        for (let index = 0; index < this.state.users.dispensados.length; index++) {
            if (this.state.users.dispensados[index].isSelected === true) {
                var ob = {
                    isSelected: false,
                    user: this.state.users.dispensados[index].user
                }
                listToMove.push(ob);
            } else {
                listToRemain.dispensados.push(this.state.users.dispensados[index])
            }

        }

        for (let index = 0; index < this.state.users.naoAvaliados.length; index++) {
            if (this.state.users.naoAvaliados[index].isSelected === true) {
                var ob = {
                    isSelected: false,
                    user: this.state.users.naoAvaliados[index].user
                }
                listToMove.push(ob);
            } else {
                listToRemain.naoAvaliados.push(this.state.users.naoAvaliados[index])
            }

        }

        //insere eles na lista correta
        if (listToMove.length > 0) {
            if (nameOfTheList === "Ausente") {
                for (let index = 0; index < listToMove.length; index++) {
                    listToMove[index].user.presenca = nameOfTheList
                }
                listToRemain.ausentes.push(...listToMove);
            } else if (nameOfTheList === "Falta justificada") {
                for (let index = 0; index < listToMove.length; index++) {
                    listToMove[index].user.presenca = nameOfTheList
                }
                listToRemain.justificados.push(...listToMove);
            } else if (nameOfTheList === "Presente") {
                for (let index = 0; index < listToMove.length; index++) {
                    listToMove[index].user.presenca = nameOfTheList
                }
                listToRemain.presentes.push(...listToMove);
            } else {
                for (let index = 0; index < listToMove.length; index++) {
                    listToMove[index].user.presenca = nameOfTheList
                }
                listToRemain.dispensados.push(...listToMove);
            }
            this.setState({ users: listToRemain })

        }
    }

    _isRatedReturner(item) {
        if (item === "naoAvaliado") {
            return (
                <Icon
                    name='panorama-fish-eye'
                    color='grey'
                />
            );
        } else if (item === "Presente") {
            return (
                <Icon
                    name='check-circle'
                    color='#92d36e'
                />
            );
        } else if (item === "Ausente") {
            return (
                <Icon
                    name='check-circle'
                    color='#ff4f54'
                />
            );
        } else if (item === "Falta justificada") {
            return (
                <Icon
                    name='check-circle'
                    color='yellow'
                />
            );
        } else if (item === "Dispensado") {
            return (
                <Icon
                    name='check-circle'
                    color='#5959ff'
                />
            );
        }
    }

    _listReturner(listToGenerate, nameOfTheList) {
        return (
            <FlatList style={{ flex: 3 }}
                data={listToGenerate}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style=
                        {item.isSelected
                            ?
                            styles.TouchableOpacityEvent2
                            :
                            styles.TouchableOpacityEvent
                        }
                        onPress={() => this._selectionButtonMethod(index.toString(), item, nameOfTheList)}>
                        <View style={{ flex: 4, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                            <Text style={styles.text}>
                                {item.user.nome}
                            </Text>
                        </View>

                        <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                            {this._isRatedReturner(item.user.presenca)}
                        </View>
                    </TouchableOpacity>
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
                        <View style={{ flex: 0.01 }}></View>
                        <SafeAreaView style={styles.viewFrontGround}>
                            <ScrollView>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Não avaliados
                                        </Text>
                                    </View>
                                    {this._listReturner(this.state.users.naoAvaliados, "naoAvaliados")}
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Presentes
                                        </Text>
                                    </View>
                                    {this._listReturner(this.state.users.presentes, "presentes")}
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Ausentes
                                        </Text>
                                    </View>
                                    {this._listReturner(this.state.users.ausentes, "ausentes")}
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Ausência justificada
                                        </Text>
                                    </View>
                                    {this._listReturner(this.state.users.justificados, "justificados")}
                                    <View style={styles.textBox}>
                                        <Text style={styles.textTitle}>
                                            Dispensado
                                        </Text>
                                    </View>
                                    {this._listReturner(this.state.users.dispensados, "Dispensados")}
                                </View>
                            </ScrollView>
                        </SafeAreaView >
                        <View style={styles.viewAllButtons}>
                            <View style={styles.viewLineOfButton}>
                                <TouchableOpacity style={styles.evluationButton}
                                    onPress={() => this._modificationButtonMethod("Presente")}>
                                    <View style={{ flex: 4, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        <Text style={styles.text}>
                                            Presente
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        {this._isRatedReturner("Presente")}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.evluationButton}
                                    onPress={() => this._modificationButtonMethod("Ausente")}>
                                    <View style={{ flex: 4, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        <Text style={styles.text}>
                                            Ausente
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        {this._isRatedReturner("Ausente")}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.viewLineOfButton}>
                                <TouchableOpacity style={styles.evluationButton}
                                    onPress={() => this._modificationButtonMethod("Falta justificada")}>
                                    <View style={{ flex: 4, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        <Text style={styles.text}>
                                            Justificado
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        {this._isRatedReturner("Falta justificada")}
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.evluationButton}
                                    onPress={() => this._modificationButtonMethod("Dispensado")}>
                                    <View style={{ flex: 4, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        <Text style={styles.text}>
                                            Dispensado
                                        </Text>
                                    </View>

                                    <View style={{ flex: 1, paddingBottom: 10, paddingTop: 10, paddingHorizontal: 2 }}>
                                        {this._isRatedReturner("Dispensado")}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
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
        width: '100%',
        height: '100%',
    },
    viewFrontGround: {
        flex: 2,
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
    TouchableOpacityEvent2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.75,
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
    text: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        color: "white"
    },
    viewAllButtons: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c7282d',
        borderTopWidth: 4,
    },
    viewLineOfButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    evluationButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#c7282d',
        margin: 10,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.3,

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
    }
});

export default ATAScreen;