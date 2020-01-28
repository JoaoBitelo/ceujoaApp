import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DonationsScreen from '../../screen/DonationsScreen';
import { HeaderBackButton } from 'react-navigation-stack';


const DonationsHeader = createStackNavigator({
    Donations: {
        screen: DonationsScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Doações",
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

export default DonationsHeader