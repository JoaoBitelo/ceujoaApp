import React from 'react';
import { View, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import FinancialScreen from '../../screen/FinancialScreen';
import NavigationDrawerStructure from '../headerConfig/Structure';


const FinancialHeader = createStackNavigator({
    EtiquetteRules: {
        screen: FinancialScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Financeiro",
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

export default FinancialHeader