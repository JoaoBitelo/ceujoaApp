import React from 'react'
import { View, TouchableOpacity, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';

export default class NavigationDrawerStructure extends React.Component {
  constructor() {
    super();
    this.state = { menuOpen: false };
  }

  backButtonHandler = () => {
    console.log("bbbbbb")
    if (this.state.menuOpen === true) {
      console.log("tava aberto")
      this.setState({ menuOpen: false })
      BackHandler.removeEventListener('hardwareBackPress', this.backButtonHandler);
      this.props.navigation.closeDrawer();
      return true;
    } else {
      console.log("tava fechado")
      this.setState({ menuOpen: false })
      return false;
    }

  }


  toggleDrawer = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.backButtonHandler);
    console.log("abriur")
    this.setState({ menuOpen: true })
    this.props.navigation.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon
            name='menu'
            color='white'
            type='material' />
        </TouchableOpacity>
      </View>
    );
  }
}