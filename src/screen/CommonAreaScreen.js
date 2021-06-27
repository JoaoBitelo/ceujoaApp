import React from "react";
import { StyleSheet, Text, BackHandler } from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/BasicScreen";
import TextBox from "../components/TextBox";
//Handlers
import { getText } from "../services/fetch/CommonArea";
import { genericHandler } from "../services/responseHandler/GenericHandler";

class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = { phrase: "", loading: false };
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
            let response = res.content.texto;
            response = response.replace(/\\n/g, "\n");
            this.setState({ phrase: response });
        }
        this.setState({ loading: false });
    };

    backButtonHandler = () => {
        this.props.navigation.navigate("Home");
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
                    <TextBox>
                        <Text style={styles.phrase}>"{this.state.phrase}"</Text>
                    </TextBox>
                )}
            </BasicScreen>
        );
    }
}

const styles = StyleSheet.create({
    phrase: {
        textAlign: "center",
        fontSize: 18,
        flexWrap: "wrap",
        color: "white",
        fontStyle: "italic",
    },
});

export default HomeScreen;
