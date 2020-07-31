import React from 'react';
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import CalendarDetailScreen from '../../../screen/CalendarScreenFiles/CalendarDetailScreen';
import { HeaderBackButton } from 'react-navigation-stack';

const CalendarDetailHeader = createStackNavigator({
    CalendarDetail: {
        screen: CalendarDetailScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Detalhes",
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
                    onPress={() => navigation.navigate("ATA")}
                >
                    <Text style={{ color: 'white', textAlign: "center", flexWrap: 'wrap' }}>adm</Text>
                </TouchableOpacity>
            )
        }),
    },
});

export default CalendarDetailHeader