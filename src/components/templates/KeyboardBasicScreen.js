import React from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    KeyboardAvoidingView,
} from "react-native";

export default class KeyboardBasicScreen extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.viewBackground}>
                {this.props.home ? (
                    <ImageBackground
                        source={require("../../../assets/backgroundHome.jpg")}
                        style={styles.imageBackGround}
                    >
                        <View style={styles.body}>{this.props.children}</View>
                    </ImageBackground>
                ) : (
                    <ImageBackground
                        source={require("../../../assets/backgroundCalendar.jpg")}
                        style={styles.imageBackGround}
                    >
                        <View style={styles.body}>{this.props.children}</View>
                    </ImageBackground>
                )}
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    viewBackground: {
        flex: 1,
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
