import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import SpecificDegreeScreen from '../../screen/SpecificDegreeScreen';
import { HeaderBackButton } from 'react-navigation-stack';


const SpecificDegreeHeader = createStackNavigator({
    SpecificDegree: {
        screen: SpecificDegreeScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Ensino",
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
                    onPress={() => navigation.navigate("Degree")} />
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default SpecificDegreeHeader