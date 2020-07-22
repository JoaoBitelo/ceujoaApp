import React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import CalendarFilterScreen from '../../../screen/CalendarScreenFiles/CalendarFilterScreen';
import { HeaderBackButton } from 'react-navigation-stack';

const CalendarFilterHeader = createStackNavigator({
    CalendarFilter: {
        screen: CalendarFilterScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Calendário",
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
                    onPress={() => navigation.navigate("Calendar")} />
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default CalendarFilterHeader