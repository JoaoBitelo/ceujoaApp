import React from 'react';
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import CalendarScreen from '../../screen/CalendarScreen';
import NavigationDrawerStructure from '../headerConfig/Structure'

const CalendarHeader = createStackNavigator({
    Calendar: {
        screen: CalendarScreen,
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
                <View style={{ paddingHorizontal: Dimensions.get("window").width * 0.05 }}>
                    <NavigationDrawerStructure navigation={navigation} />
                </View>
            ),
            headerRight: (
                <TouchableOpacity
                    style={{
                        paddingHorizontal: Dimensions.get("window").width * 0.05,
                    }}
                    onPress={() => navigation.navigate("CalendarFilter")}
                >
                    <Text style={{ color: 'white', textAlign: "center", flexWrap: 'wrap' }}>filtro</Text>
                </TouchableOpacity>
            )
        }),
    },
});

export default CalendarHeader