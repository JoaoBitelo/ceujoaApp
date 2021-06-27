import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import Button from "../../components/ButtonMenu";

class HeaderStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <View style={styles.mainView}>
                <View style={{ flex: 0.1 }}></View>
                <View style={styles.viewUpperGround}>
                    <Image
                        style={styles.image}
                        source={require("../../../assets/logo.jpg")}
                    />
                </View>
                <View style={styles.viewMiddleGround}>
                    <ScrollView style={{ flex: 1 }}>
                        <Button
                            targetScreen={"CommonArea"}
                            text={"Início"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"EtiquetteRules"}
                            text={"Regras de Etiqueta"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"Calendar"}
                            text={"Calendário"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"Degree"}
                            text={"Área de Ensino"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"Financial"}
                            text={"Área Financeira"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"Donations"}
                            text={"Ações sociais - Projeto Joaquinas"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"BirthDays"}
                            text={"Aniversários"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"Stock"}
                            text={"Material Litúrgico"}
                            navigation={this.props.navigation}
                        />

                        <Button
                            targetScreen={"NormsRegulations"}
                            text={"Estatuto Social e Regimento Interno"}
                            navigation={this.props.navigation}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: "#c7282d",
    },
    viewUpperGround: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 0.5,
    },
    image: {
        flex: 1,
        width: "80%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: 200,
    },
    viewMiddleGround: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HeaderStyle;
