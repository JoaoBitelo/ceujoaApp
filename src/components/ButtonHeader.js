import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";

class HeaderStyle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.viewButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.props.navigation.navigate(this.props.targetScreen);
                    }}
                >
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </TouchableOpacity>
                <Icon name="keyboard-arrow-right" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewButton: {
        minHeight: 70,
        flexDirection: "row",
        borderColor: "black",
        borderWidth: 0.5,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    button: {
        alignItems: "center",
        width: "90%",
        paddingTop: 2,
        paddingBottom: 2
        
    },
    buttonText: {
        fontSize: 16,
        flexWrap: "wrap",
        color: "white",
        textAlign: 'center',
    },
});

export default HeaderStyle;
