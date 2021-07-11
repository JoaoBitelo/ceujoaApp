import React from "react";
import {
    StyleSheet,
    FlatList,
    BackHandler,
    Alert,
    SafeAreaView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
//Componentes
import LoadingScreen from "../../components/LoadingScreen";
import BasicScreen from "../../components/templates/BasicScreen";
import ButtonGeneric from "../../components/buttons/ButtonGeneric";
//Handlers
import { getDegreeContent } from "../../services/fetch/Degree";
import { genericHandler } from "../../services/responseHandler/GenericHandler";

class SpecificDegreeScreen extends React.Component {
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
        const { product } = await this.props.navigation.state.params;
        let res = await getDegreeContent(product.$oid);
        res = await genericHandler(res);
        if (!res) {
            this.props.navigation.navigate("Home");
        } else {
            this.setState({ dados: res.conteudoDoGrau });
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
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                            }}
                            data={this.state.dados}
                            renderItem={({ item, index }) => (
                                <ButtonGeneric
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

export default SpecificDegreeScreen;
