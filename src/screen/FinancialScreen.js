import React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    BackHandler,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../components/LoadingScreen";
import BasicScreen from "../components/templates/BasicScreen";
import TextBoxTittle from "../components/TextBoxTittle";
import FinancialVerticalList from "../components/FinancialVerticalList";
//Handlers
import { getFinancialDetail } from "../services/fetch/Financial";
import { genericHandler } from "../services/responseHandler/GenericHandler";

class FinancialScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            mensalidades: [],
            contribuicoesAdicionais: [],
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
        let res = await getFinancialDetail();
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            this.setState({ mensalidades: res.mensalidades });
            this.setState({
                contribuicoesAdicionais: res.contribuicoesAdicionais,
            });
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
                        <ScrollView>
                            <TextBoxTittle text={"CONTRIBUIÇÕES ADICIONAIS"} />
                            <FinancialVerticalList
                                array={this.state.contribuicoesAdicionais}
                            />
                            <FlatList
                                style={{ flex: 3 }}
                                data={this.state.mensalidades}
                                renderItem={({ item, index }) => (
                                    <View style={{ flex: 1 }}>
                                        <TextBoxTittle
                                            text={"MENSALIDADES DE " + item.ano}
                                        />
                                        <FinancialVerticalList
                                            array={item.meses}
                                        />
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
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
        paddingTop: 10,
    },
});

export default FinancialScreen;
