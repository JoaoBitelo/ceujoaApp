import React from "react";
import {
    StyleSheet,
    View,
    BackHandler,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../../components/LoadingScreen";
import BasicScreen from "../../components/templates/BasicScreen";
import TextBoxInfo from "../../components/textboxes/TextBoxInfo";
//Handlers
import { getDegreeContentDetails } from "../../services/fetch/Degree";
import { genericHandler } from "../../services/responseHandler/GenericHandler";

export default class SpecificDegreeDetailScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            name: "",
            description: "",
            additional: [],
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
        const { degreeContent } = await this.props.navigation.state.params;
        let res = await getDegreeContentDetails(degreeContent.$oid);
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            this.setState({ name: res.conteudo.nome });
            var temp = res.conteudo.descricao.replace(/\\n/g, "\n");
            this.setState({ description: temp });
            this.setState({ additional: res.conteudo.adicional });
            this.setState({ loading: false });
        }
        this.setState({ loading: false });
    };

    backButtonHandler = () => {
        this.props.navigation.navigate("SpecificDegree");
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
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                            }}
                        >
                            <TextBoxInfo
                                tittle={"Titulo"}
                                name={this.state.name}
                            />

                            <TextBoxInfo
                                tittle={"Descrição"}
                                name={this.state.description}
                            />

                            <TextBoxInfo
                                tittle={"Fontes Adicionais"}
                                data={this.state.additional}
                                url={true}
                                navigation={this.props.navigation}
                            />
                        </ScrollView>
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
    },
});
