import React from 'react';
import { Text, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import DrawerStack from '../navigation/DrawerStack';

import { LoginScreen, DetailsScreen, RecoverPassword, ChangePasswordScreen, TaskScreen, AddTaskScreen, ContactScreen, TaskDetailsScreen } from '../screens';
import Colors from '../constants/Colors';


const drawerButton = navigation => (
    // <Text
    //     style={{ fontWeight: 'bold', color: 'red' }}
    //     onPress={() => {
    //         if (navigation.state.index === 0) {
    //             navigation.navigate('DrawerOpen');
    //         } else {
    //             navigation.navigate('DrawerClose');
    //         }
    //     }}
    // >
    //     Open
    // </Text>

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
    //     style={{ fontWeight: 'bold', color: 'red' }}
    //     onPress={() => {
    //         Alert.alert('drawerButtonRight');
    //     }}
    // >
    //     OpenR
    // </Text>

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
            gesturesEnabled: false,
            headerLeft: drawerButton(navigation),
            headerRight: drawerButtonRight(),
        })
    }
);

const RootStackNavigator = StackNavigator(
    {
        Login: { screen: LoginScreen },
        RecoverPassword: { screen: RecoverPassword },
        Profile: { screen: DetailsScreen },
        ChangePassword: { screen: ChangePasswordScreen },
        Contact: { screen: ContactScreen },
        Task: { screen: TaskScreen },
        AddTask: { screen: AddTaskScreen },
        TaskDetails: { screen: TaskDetailsScreen },
        Main: { screen: DrawerNavigation },
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