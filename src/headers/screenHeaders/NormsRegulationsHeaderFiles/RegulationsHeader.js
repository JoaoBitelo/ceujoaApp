import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import RegulationsScreen from '../../../screen/NormsRegulationsScreenFiles/RegulationsScreen';
import { HeaderBackButton } from 'react-navigation-stack';


const RegulationsHeader = createStackNavigator({
    Regulations: {
        screen: RegulationsScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Regulamento",
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
                    onPress={() => navigation.navigate("NormsRegulations")} />
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default RegulationsHeader