import React from "react";
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HeaderStyle from './src/headers/headerConfig/HeaderStyle';
import HomeHeader from './src/headers/screenHeaders/HomeHeader';
import CommonAreaHeader from './src/headers/screenHeaders/CommonAreaHeader';
import CalendarHeader from './src/headers/screenHeaders/CalendarHeader';
import CalendarDetailHeader from './src/headers/screenHeaders/CalendarDetailHeader';
import NormsRegulationsHeader from './src/headers/screenHeaders/NormsRegulationsHeader';
import RegulationsHeader from './src/headers/screenHeaders/RegulationsHeader';
import PrincipalLetterHeader from './src/headers/screenHeaders/PrincipalLetterHeader';
import LetterMagnaHeader from './src/headers/screenHeaders/LetterMagnaHeader';


const homeScreen = HomeHeader;
const commonAreaScreen = CommonAreaHeader;
const calendarScreen = CalendarHeader;
const calendarDetailScreen = CalendarDetailHeader;
const normsRegulationsScreen = NormsRegulationsHeader;
const regulationsScreen = RegulationsHeader;
const principalLetter = PrincipalLetterHeader;
const letterMagna = LetterMagnaHeader;

const DrawerConfig = {
  drawerWidth: Dimensions.get('window').width * 0.7,
  contentComponent: ({ navigation }) => {
    return (<HeaderStyle navigation={navigation} />)
  }
}

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: homeScreen,
      navigationOptions: {
        drawerLockMode: "locked-closed",
        disableGestures: true,
      },
    },
    CommonArea: { screen: commonAreaScreen },
    Calendar: { screen: calendarScreen },
    CalendarDetail: { screen: calendarDetailScreen },
    NormsRegulations: { screen: normsRegulationsScreen },
    Regulations: { screen: regulationsScreen },
    PrincipalLetter: { screen: principalLetter },
    LetterMagna: { screen: letterMagna }

  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator);

