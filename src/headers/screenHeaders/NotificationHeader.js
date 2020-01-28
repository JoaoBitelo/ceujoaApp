import React from 'react';
import { View } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import NotificationScreen from '../../screen/NotificationScreen';
import { HeaderBackButton } from 'react-navigation-stack';

const NotificationHeader = createStackNavigator({
    Notification: {
        screen: NotificationScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Notificações",
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
                    onPress={() => navigation.navigate("CommonArea")} />
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default NotificationHeader