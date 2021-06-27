import React from "react";
import { View, ActivityIndicator } from "react-native";

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}
