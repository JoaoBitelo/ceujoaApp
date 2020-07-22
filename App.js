import React from "react";
import { Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HeaderStyle from './src/headers/headerConfig/HeaderStyle';
import HomeHeader from './src/headers/screenHeaders/HomeHeader';
import FirstLoginHeader from './src/headers/screenHeaders/FirstLoginHeader';
import CommonAreaHeader from './src/headers/screenHeaders/CommonAreaHeader';
import CalendarHeader from './src/headers/screenHeaders/CalendarHeader';
import CalendarDetailHeader from './src/headers/screenHeaders/CalendarHeaderFiles/CalendarDetailHeader';
import CalendarFilterHeader from './src/headers/screenHeaders/CalendarHeaderFiles/CalendarFilterHeader';
import NormsRegulationsHeader from './src/headers/screenHeaders/NormsRegulationsHeader';
import RegulationsHeader from './src/headers/screenHeaders/NormsRegulationsHeaderFiles/RegulationsHeader';
import PrincipalLetterHeader from './src/headers/screenHeaders/NormsRegulationsHeaderFiles/PrincipalLetterHeader';
import LetterMagnaHeader from './src/headers/screenHeaders/NormsRegulationsHeaderFiles/LetterMagnaHeader';
import DegreeHeader from './src/headers/screenHeaders/DegreeHeader';
import SpecificDegreeHeader from './src/headers/screenHeaders/SpecificDegreeHeader';
import SpecificDegreeDetailHeader from './src/headers/screenHeaders/SpecificDegreeDetailHeader';
import EtiquetteRulesHeader from './src/headers/screenHeaders/EtiquetteRulesHeader';
import DonationsHeader from './src/headers/screenHeaders/DonationsHeader';

const homeScreen = HomeHeader;
const firstLoginScreen = FirstLoginHeader;
const commonAreaScreen = CommonAreaHeader;
const calendarScreen = CalendarHeader;
const calendarFilterScreen = CalendarFilterHeader;
const calendarDetailScreen = CalendarDetailHeader;
const normsRegulationsScreen = NormsRegulationsHeader;
const regulationsScreen = RegulationsHeader;
const principalLetter = PrincipalLetterHeader;
const letterMagna = LetterMagnaHeader;
const degree = DegreeHeader;
const specificDegree = SpecificDegreeHeader;
const specificDegreeDetail = SpecificDegreeDetailHeader;
const etiquetteRules = EtiquetteRulesHeader;
const donations = DonationsHeader

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
    FirstLogin: { screen: firstLoginScreen },
    CommonArea: { screen: commonAreaScreen },
    Calendar: { screen: calendarScreen },
    CalendarFilter: { screen: calendarFilterScreen },
    CalendarDetail: { screen: calendarDetailScreen },
    NormsRegulations: { screen: normsRegulationsScreen },
    Regulations: { screen: regulationsScreen },
    PrincipalLetter: { screen: principalLetter },
    LetterMagna: { screen: letterMagna },
    Degree: { screen: degree },
    SpecificDegree: { screen : specificDegree },
    SpecificDegreeDetail: { screen: specificDegreeDetail },
    EtiquetteRules: { screen: etiquetteRules },
    Donations: { screen: donations }
  },
  DrawerConfig
);

export default createAppContainer(DrawerNavigator);

