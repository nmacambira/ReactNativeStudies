import { DrawerNavigator } from 'react-navigation';
import DrawerContainer from './DrawerContainer';

import { TaskScreen, DetailsScreen, ContactScreen, ChangePasswordScreen } from '../screens';

// drawer stack
const DrawerStack = DrawerNavigator(
    {
        Main: { screen: TaskScreen },
        Profile: { screen: DetailsScreen },
        ChangePassword: { screen: ChangePasswordScreen },
        Contact: { screen: ContactScreen },
    },
    {
        gesturesEnabled: false,
        contentComponent: DrawerContainer
    },
    {
        // Default config for Stack screens
        navigationOptions: ({ navigation }) => ({
            // headerBackTitle: null,
            headerStyle: {
                // backgroundColor: Colors.navigationBar,
                // top: Platform.OS === 'ios' ? 10 : 0,
                // position: 'absolute',
                // backgroundColor: 'transparent',
                // zIndex: 100,
                // top: 0,
                // left: 0,
                // right: 0
            },
            // headerTintColor: Colors.tintColor,
            // headerTitleStyle: {
            //   fontWeight: 'normal',
            // },
        }),
    }
);

export default DrawerStack;