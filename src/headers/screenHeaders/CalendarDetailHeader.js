import React from 'react';
import { View } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import CalendarDetailScreen from '../../screen/CalendarDetailScreen';
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
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default CalendarDetailHeader