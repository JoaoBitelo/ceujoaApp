import React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import CalendarFilterScreen from '../../screen/CalendarFilterScreen';
import NavigationDrawerStructure from '../headerConfig/Structure'

const CalendarFilterHeader = createStackNavigator({
    CalendarFilter: {
        screen: CalendarFilterScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Calendárioooooo",
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
                <TouchableOpacity
                    style={{
                        paddingHorizontal: Dimensions.get("window").width * 0.05,
                    }}
                    onPress={() => navigation.navigate("Home")}
                    >
                    <Text style={{ color: 'white', textAlign: "center", flexWrap: 'wrap' }}>FILTRO</Text>
                </TouchableOpacity>
            )
        }),
    },
});

export default CalendarFilterHeader