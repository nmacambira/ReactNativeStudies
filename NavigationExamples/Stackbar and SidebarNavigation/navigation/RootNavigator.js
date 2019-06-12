import React from 'react';
import { Text, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import DrawerStack from '../navigation/DrawerStack';

import Colors from '../constants/Colors';

import { LoginScreen } from '../screens';




const drawerButton = navigation => (
	// <Text
 //    style={{ padding: 5, color: 'white' }}
 //    onPress={() => {
 //      // Coming soon: navigation.navigate('DrawerToggle')
 //      // https://github.com/react-community/react-navigation/pull/2492
 //      if (navigation.state.index === 0) {
 //        navigation.navigate('DrawerOpen');
 //      } else {
 //        navigation.navigate('DrawerClose');
 //      }
 //    }}
 //  >
 //    {' '}
 //    Menu
 //  </Text>

  <Icon
    name='ios-menu'
    type='ionicon'
    color={Colors.tintColor}
    iconStyle={{ padding: 15 }}
    underlayColor='transparent'
    onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen');
      } else {
        navigation.navigate('DrawerClose');
      }
    }}
  />
);

const drawerButtonRight = navigation => (
	// <Text
 //    style={{ padding: 5, color: 'white' }}
 //    onPress={() => {
 //      Alert.alert('drawerButtonRight');
 //    }}
 //  >
 //    {' '}
 //    Right
 //  </Text>

  <Icon
    name='heartbeat'
    type='font-awesome'
    color={Colors.tintColor}
    iconStyle={{ padding: 15 }}
    underlayColor='transparent'
    onPress={() => {
      Alert.alert('drawerButtonRight');
    }}
  />
);

const DrawerNavigation = StackNavigator(
  {
    DrawerStack: { screen: DrawerStack }
  },
  {
    // Default config for DrawerStack screens
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: Colors.navigationBar },
      headerTintColor: Colors.tintColor,
      // title: 'Home',
      gesturesEnabled: false,
      headerLeft: drawerButton(navigation),
      headerRight: drawerButtonRight(),
    })
  }
);

const RootStackNavigator = StackNavigator(
  {
  	// Login: {
   //    screen: Login,
   //    navigationOptions: {
   //      header: null
   //    }
   //  },
    Login: { screen: LoginScreen },
    Home: { screen: DrawerNavigation },
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'Login',
  },
  {
    // Default config for Stack screens
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: Colors.navigationBar,
      },
      headerTintColor: Colors.tintColor,
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}