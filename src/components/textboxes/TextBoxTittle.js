import React from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";

export default class TextBoxTittle extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <View style={styles.textBox}>
                <Text style={styles.textTitle}>{this.props.text}</Text>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        marginBottom: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.9,
    },
    textTitle: {
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
});
