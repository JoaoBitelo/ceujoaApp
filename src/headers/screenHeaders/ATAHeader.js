import React from 'react';
import { Dimensions, Text, TouchableOpacity, Alert } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import ATAScreen from '../../screen/ATAScreen';
import { HeaderBackButton } from 'react-navigation-stack';
import FetchService from "../../services/FetchService";
import ResponseHandler from "../../services/ResponseHandler";
import { AsyncStorage } from "react-native";

_saveChanges = async (navigation) => {
    this.FetchService = new FetchService();
    this.ResponseHandler = new ResponseHandler();
    var itemID = await AsyncStorage.getItem('currentEvent');
    var users = await AsyncStorage.getItem('ata');
    itemID = JSON.parse(itemID);
    users = JSON.parse(users);
    var res = await this.FetchService.updateATA(itemID.$oid, users);
    console.log("a resta foiiiiiiiii: " + JSON.stringify(res))
    if (res === null) {
      this.ResponseHandler.nullResponse();
      navigation.navigate('Home');
    } else if (res === false) {
      this.ResponseHandler.falseResponse();
      navigation.navigate('Home');
    } else {
      await this.ResponseHandler.trueResponse(res);
      navigation.navigate("CalendarDetail")
    }
}

const ATAHeader = createStackNavigator({
    ATA: {
        screen: ATAScreen,
        navigationOptions: ({ navigation }) => ({
            title: "ATA",
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
                    onPress={() => navigation.navigate("CalendarDetail")} />
            ),
            headerRight: (
                <TouchableOpacity
                    style={{
                        paddingHorizontal: Dimensions.get("window").width * 0.05,
                    }}
                    onPress={() => this._saveChanges(navigation)}
                >
                    <Text style={{ color: 'white', textAlign: "center", flexWrap: 'wrap' }}>SALVAR</Text>
                </TouchableOpacity>
            )
        }),
    },
});

export default ATAHeader