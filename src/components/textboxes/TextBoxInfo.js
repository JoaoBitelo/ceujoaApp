import React from "react";
import { StyleSheet, View, Text, Dimensions, FlatList } from "react-native";
//Componentes
import ButtonURL from "../buttons/ButtonURL";

export default class TextBoxInfo extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <View style={styles.textBox}>
                <Text style={styles.textTitle}>{this.props.tittle}:</Text>
                {this.props.url ? (
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item, index }) => (
                            <View>
                                <Text style={styles.textCenter}>
                                    {item.titulo}
                                </Text>
                                <ButtonURL
                                    navigation={this.props.navigation}
                                    text={item.link}
                                />
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text style={styles.textCenter}>{this.props.name}</Text>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: "rgba(0, 0, 0, 0.25)",
        marginBottom: 20,
        borderRadius: 10,
        padding: 5,
        alignSelf: "center",
        width: Dimensions.get("window").width * 0.75,
    },
    textTitle: {
        fontSize: 16,
        flexWrap: "wrap",
        fontWeight: "bold",
        color: "white",
    },
    textCenter: {
        fontSize: 16,
        flexWrap: "wrap",
        color: "white",
    },
});
