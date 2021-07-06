import React from "react";
import { StyleSheet, Text, BackHandler, ScrollView } from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/templates/BasicScreen";
import TextBox from "../components/TextBox";
//Handlers
import { getText } from "../services/fetch/Donations";
import { genericHandler } from "../services/responseHandler/GenericHandler";

class DonationsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            titulo: "",
            texto: "",
        };
    }

    _start() {
        BackHandler.addEventListener(
            "hardwareBackPress",
            this.backButtonHandler
        );
        this._loadClient();
    }

    _loadClient = async () => {
        this.setState({ loading: true });
        let res = await getText();
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            this.setState({ titulo: res.content.titulo.replace(/\\n/g, "\n") });
            this.setState({ texto: res.content.texto.replace(/\\n/g, "\n") });
        }
        this.setState({ loading: false });
    };

    backButtonHandler = () => {
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
                    <ScrollView>
                        <TextBox>
                            <Text style={styles.textTitle}>
                                {this.state.titulo}
                            </Text>
                        </TextBox>

                        <TextBox>
                            <Text style={styles.textCenter}>
                                {this.state.texto}
                            </Text>
                        </TextBox>
                    </ScrollView>
                )}
            </BasicScreen>
        );
    }
}
const styles = StyleSheet.create({
    textTitle: {
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    textCenter: {
        fontSize: 16,
        flexWrap: "wrap",
        color: "white",
    },
});

export default DonationsScreen;
