import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import Button from "../../components/ButtonHeader";

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
                        <Button targetScreen={"CommonArea"} text={"Início"} />

                        <Button
                            targetScreen={"EtiquetteRules"}
                            text={"Regras de Etiqueta"}
                        />

                        <Button targetScreen={"Calendar"} text={"Calendário"} />

                        <Button
                            targetScreen={"Degree"}
                            text={"Área de Ensino"}
                        />

                        <Button
                            targetScreen={"Financial"}
                            text={"Área Financeira"}
                        />

                        <Button
                            targetScreen={"Financial"}
                            text={"Área Financeira"}
                        />

                        <Button
                            targetScreen={"Donations"}
                            text={"Ações sociais - Projeto Joaquinas"}
                        />

                        <Button
                            targetScreen={"BirthDays"}
                            text={"Aniversários"}
                        />

                        <Button
                            targetScreen={"Stock"}
                            text={"Material Litúrgico"}
                        />

                        <Button
                            targetScreen={"NormsRegulations"}
                            text={"Estatuto Social e Regimento Interno"}
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
