import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SelectObject from '../screens/SelectObject';
import AdditionalItems from '../screens/AdditionalItems';
// import { HomeScreen, DetailsScreen, SelectObject, AdditionalItems } from '../screens';

import Colors from '../constants/Colors';

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
  SelectObject: { screen: SelectObject },
  AdditionalItems: { screen: AdditionalItems },
},
  {
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: Colors.blue,
      },
      headerTintColor: Colors.tintColor,
    }),

  });

export default RootNavigator;