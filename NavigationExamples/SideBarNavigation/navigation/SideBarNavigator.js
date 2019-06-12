import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const SideBarNavigator = DrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'ios-home' : 'ios-home-outline'}
              type='ionicon'
              size={20}
              style={{ color: tintColor }}
            />
          ),
        },
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          drawerLabel: 'Profile',
          drawerIcon: ({ tintColor, focused }) => (
            <Icon
              name={focused ? 'ios-person' : 'ios-person-outline'}
              type='ionicon'
              size={20}
              style={{ color: tintColor }}
            />
          ),
        },
      },
});

export default SideBarNavigator;