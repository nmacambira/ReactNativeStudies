import { DrawerNavigator } from 'react-navigation';
import DrawerContainer from './DrawerContainer';

import { HomeScreen, SettingsScreen, ContactScreen } from '../screens';

const DrawerStack = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Settings: { screen: SettingsScreen },    
    Contact: { screen: ContactScreen },
  },
  {
    gesturesEnabled: false,
    contentComponent: DrawerContainer
  }
);

export default DrawerStack;