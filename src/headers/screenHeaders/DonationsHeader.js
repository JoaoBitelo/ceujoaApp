import React from 'react';
import { View, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DonationsScreen from '../../screen/DonationsScreen';
import NavigationDrawerStructure from '../headerConfig/Structure';


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

export default DonationsHeader