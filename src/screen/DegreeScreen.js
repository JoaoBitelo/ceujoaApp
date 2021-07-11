import React from "react";
import {
    StyleSheet,
    FlatList,
    BackHandler,
    SafeAreaView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/templates/BasicScreen";
import ButtonDegree from "../components/buttons/ButtonDegree";
//Handlers
import { getDegree } from "../services/fetch/Degree";
import { genericHandler } from "../services/responseHandler/GenericHandler";

export default class DegreeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            dados: [],
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
        let res = await getDegree();
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            this.setState({ dados: res.graus });
            this.setState({ loading: false });
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
                    <SafeAreaView style={styles.viewFrontGround}>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
                            data={this.state.dados}
                            renderItem={({ item, index }) => (
                                <ButtonDegree
                                    item={item}
                                    navigation={this.props.navigation}
                                />
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </SafeAreaView>
                )}
            </BasicScreen>
        );
    }
}
const styles = StyleSheet.create({
    viewFrontGround: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
    },
});
