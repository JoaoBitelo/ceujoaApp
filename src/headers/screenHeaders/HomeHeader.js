import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../../screen/HomeScreen';

const HomeHeader = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default HomeHeader