import React from 'react';
import { View, Dimensions } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import BirthDaysScreen from '../../screen/BirthDaysScreen';
import NavigationDrawerStructure from '../headerConfig/Structure'

const BirthDaysHeader = createStackNavigator({
    BirthDays: {
        screen: BirthDaysScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Aniversários",
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
                <View style={{ paddingHorizontal: Dimensions.get("window").width * 0.05 }}>
                    <NavigationDrawerStructure navigation={navigation} />
                </View>
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default BirthDaysHeader