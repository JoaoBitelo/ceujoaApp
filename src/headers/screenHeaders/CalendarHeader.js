import React from 'react';
import { View, Dimensions, Text } from "react-native";
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={{flex:1 , color: 'white', textAlign: 'center', flexWrap: 'wrap'}}>filtro</Text>
                </View>
            )
        }),
    },
});

export default CalendarHeader