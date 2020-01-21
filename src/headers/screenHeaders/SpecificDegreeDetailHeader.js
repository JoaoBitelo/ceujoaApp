import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import SpecificDegreeDetailScreen from '../../screen/SpecificDegreeDetailScreen';
import { HeaderBackButton } from 'react-navigation-stack';


const SpecificDegreeDetailHeader = createStackNavigator({
    SpecificDegreeDetail: {
        screen: SpecificDegreeDetailScreen,
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
                    onPress={() => navigation.navigate("SpecificDegree")} />
            ),
            headerRight: (
                <View style={{ flex: 1 }}>

                </View>
            )
        }),
    },
});

export default SpecificDegreeDetailHeader