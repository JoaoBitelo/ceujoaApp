import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";
import { Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation';
import CurrentIndexMenu from  './CurrentIndexMenu';

class HeaderStyle extends React.Component {
    constructor(props) {
        super(props);   
        this.CurrentIndexMenu = new CurrentIndexMenu();
        this.state = { currentScreen: 0 };
    }

    _start = async () => {
        console.log("a")
      }

    _updateScreen = async (value) => {
        await this.CurrentIndexMenu.setIndex(value)
        const aa = await this.CurrentIndexMenu.getIndex()
        console.log(aa)
        this.setState({ currentScreen: value })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <NavigationEvents
                    onWillFocus={() => this._start()}/>
                <View style={{ flex: 0.1 }}></View>
                <View style={styles.viewUpperGround}>
                    <Image style={styles.image}
                        source={require("../../../assets/logo.jpg")}
                    />
                </View>
                <View style={styles.viewMiddleGround}>
                    <ScrollView style={styles.ScrollView}>
                        <View style={[styles.viewButton, this.state.currentScreen === 0 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(0); this.props.navigation.navigate('CommonArea') }}>
                                <Text style={styles.buttonText}>Início</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 1 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(1); this.props.navigation.navigate('EtiquetteRules') }}>
                                <Text style={styles.buttonText}>Regras de Etiqueta</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 2 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(2); this.props.navigation.navigate('Calendar') }}>
                                <Text style={styles.buttonText}>Calendário</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 3 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(3); this.props.navigation.navigate('Degree') }}>
                                <Text style={styles.buttonText}>Área de Ensino</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 4 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(4); this.props.navigation.navigate('Calendar') }}>
                                <Text style={styles.buttonText}>Área Financeira(por fazer)</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 5 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(5); this.props.navigation.navigate('Donations') }}>
                                <Text style={styles.buttonText}>Ações sociais - Projeto Joaquinas</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 6 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(6); this.props.navigation.navigate('NormsRegulations') }}>
                                <Text style={styles.buttonText}>Aniversários(por fazer)</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 7 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(7); this.props.navigation.navigate('NormsRegulations') }}>
                                <Text style={styles.buttonText}>Materiais Litúrgicos(por fazer)</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.state.currentScreen === 8 ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { this._updateScreen(8); this.props.navigation.navigate('NormsRegulations') }}>
                                <Text style={styles.buttonText}>Estatuto Social e Regimento Interno</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#c7282d'
    },
    viewUpperGround: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 0.5,
    },
    image: {
        flex: 1,
        width: '80%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 200,
    },
    viewMiddleGround: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ScrollView: {
        flex: 1
    },
    viewButton: {
        height: 65,
        width: Dimensions.get("window").width * 0.7,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 0.5,
    },
    backViewButton1: {
        backgroundColor: '#c7282d',
    },
    backViewButton2: {
        backgroundColor: '#a82226',
    },
    button: {
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        flexWrap: 'wrap',
        color: "white"
    },
    icon: {
        flex: 1
    }
})

export default HeaderStyle;