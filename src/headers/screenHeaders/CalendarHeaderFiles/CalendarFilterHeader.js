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
                <TouchableOpacity
                    style={{
                        paddingHorizontal: Dimensions.get("window").width * 0.05,
                    }}
                    onPress={() => navigation.push("CalendarFilter")}
                    >
                    <Text style={{ color: 'white', textAlign: "center", flexWrap: 'wrap' }}>filtro</Text>
                </TouchableOpacity>
            )
        }),
    },
});

export default CalendarFilterHeader