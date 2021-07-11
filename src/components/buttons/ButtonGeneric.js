import React from "react";
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Alert,
    Dimensions,
} from "react-native";

export default class ButtonGeneric extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _buttonMethod = async (item) => {
        this.props.navigation.push("SpecificDegreeDetail", {
            degreeContent: item.id,
        });
    };

    render() {
        return (
            <TouchableOpacity
                style={styles.TouchableOpacityEvent}
                onPress={() => this._buttonMethod(this.props.item)}
            >
                <View
                    style={{
                        flex: 4,
                        justifyContent: "center",
                        paddingBottom: 10,
                        paddingTop: 10,
                        paddingHorizontal: 2,
                    }}
                >
                    <Text style={styles.name}>{this.props.item.nome}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    TouchableOpacityEvent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#c7282d",
        marginBottom: 20,
        borderRadius: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.75,
        borderColor: "black",
        borderWidth: 1,
    },
    name: {
        textAlign: "center",
        fontSize: 18,
        flexWrap: "wrap",
        color: "white",
    },
});
