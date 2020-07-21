import React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import FirstLoginScreen from '../../screen/FirstLoginScreen';
import NavigationDrawerStructure from '../headerConfig/Structure'

const FirstLoginHeader = createStackNavigator({
    CalendarFilter: {
        screen: FirstLoginScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Troca de senha",
            //header todo
            headerStyle: {
                backgroundColor: '#c7282d',
            },
            //cor dos 3 elementos
            headerTintColor: 'white',
            //style do titulo
            headerTitleStyle: {
                textAlign: "center",
                flex: 1,
                fontWeight: 'bold'
            },
            headerLeft: (
                <HeaderBackButton tintColor={'white'}
                    onPress={() => navigation.navigate("Home")} />
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default FirstLoginHeader