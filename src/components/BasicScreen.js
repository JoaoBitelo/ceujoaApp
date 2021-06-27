import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";

export default class BasicScreen extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style={styles.viewBackground}>
                <ImageBackground
                    source={require("../../assets/backgroundCalendar.jpg")}
                    style={styles.imageBackGround}
                >
                    <View style={styles.body}>{this.props.children}</View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageBackGround: {
        width: "100%",
        height: "100%",
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
});
