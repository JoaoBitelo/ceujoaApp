import React from "react";
import { StyleSheet, View, BackHandler } from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/templates/BasicScreen";
import ButtonNormsAndRegulation from "../components/buttons/ButtonNormsAndRegulation";

export default class NormsRegulationsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
        };
    }

    _start() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
    }

    backButtonHandler = async () => {
        this.props.navigation.navigate("CommonArea");
        return true;
    };

    _end() {
        BackHandler.removeEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
    }

    render() {
        return (
            <BasicScreen>
                <NavigationEvents
                    onWillFocus={() => this._start()}
                    onWillBlur={() => this._end()}
                />
                {this.state.loading ? (
                    <LoadingScreen />
                ) : (
                    <View style={styles.middleView}>
                        <ButtonNormsAndRegulation
                            tittle={"ESTATUTO SOCIAL"}
                            link={"EstatutoSocial"}
                        />

                        <ButtonNormsAndRegulation
                            tittle={"REGIMENTO INTERNO"}
                            link={"RegimentoInterno"}
                        />

                        <ButtonNormsAndRegulation
                            tittle={"CARTA DE PRINCÍPIOS"}
                            link={"CartaDePrincipios"}
                        />

                        <ButtonNormsAndRegulation
                            tittle={"CARTA MAGNA DA UMBANDA"}
                            link={"CartaMagna"}
                        />
                    </View>
                )}
            </BasicScreen>
        );
    }
}
const styles = StyleSheet.create({
    middleView: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
});
