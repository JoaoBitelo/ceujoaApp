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

class HeaderStyle extends React.Component {
    constructor(props) {
        super(props);   
        this.state = { };
    }

    render() {
        return (
            <View style={styles.mainView}>
                <View style={{ flex: 0.1 }}></View>
                <View style={styles.viewUpperGround}>
                    <Image style={styles.image}
                        source={require("../../../assets/logo.jpg")}
                    />
                </View>
                <View style={styles.viewMiddleGround}>
                    <ScrollView style={styles.ScrollView}>
                        <View style={[styles.viewButton, this.props.navigation.state.routeName == "CommonArea" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('CommonArea')}}>
                                <Text style={styles.buttonText}>Início</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "EtiquetteRules" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('EtiquetteRules')}}>
                                <Text style={styles.buttonText}>Regras de Etiqueta</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "Calendar" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('Calendar')}}>
                                <Text style={styles.buttonText}>Calendário</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "Degree" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('Degree')}}>
                                <Text style={styles.buttonText}>Área de Ensino</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "Financial" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('Financial')}}>
                                <Text style={styles.buttonText}>Área Financeira</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "Donations" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('Donations')}}>
                                <Text style={styles.buttonText}>Ações sociais - Projeto Joaquinas</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "BirthDays" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('BirthDays')}}>
                                <Text style={styles.buttonText}>Aniversários</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "Stock" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('Stock')}}>
                                <Text style={styles.buttonText}>Material Litúrgico</Text>
                            </TouchableOpacity>
                            <Icon style={styles.icon} name='keyboard-arrow-right' />
                        </View>

                        <View style={[styles.viewButton, this.props.navigation.state.routeName === "NormsRegulations" ? styles.backViewButton2 : styles.backViewButton1]}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {this.props.navigation.navigate('NormsRegulations')}}>
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
        height: 90,
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
    backViewButton2: { //descontinuado
        backgroundColor: '#a82226',
    },
    button: {
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        flexWrap: 'wrap',
        color: "white"
    },
    icon: {
        flex: 1
    }
})

export default HeaderStyle;