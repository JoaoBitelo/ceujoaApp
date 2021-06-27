import React from "react";
import { StyleSheet, View, Text } from "react-native";

class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return <View style={styles.textBox}>{this.props.children}</View>;
    }
}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default HomeScreen;
