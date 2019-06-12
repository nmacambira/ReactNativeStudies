import React from 'react';
import { StackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

import Colors from '../constants/Colors';

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
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