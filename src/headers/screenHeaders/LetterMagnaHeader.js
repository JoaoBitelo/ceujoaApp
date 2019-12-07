import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import LetterMagnaScreen from '../../screen/LetterMagnaScreen';
import { HeaderBackButton } from 'react-navigation-stack';


const LetterMagnaHeader = createStackNavigator({
    LetterMagna: {
        screen: LetterMagnaScreen,
        navigationOptions: ({ navigation }) => ({
            title: "Princípios",
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

export default LetterMagnaHeader