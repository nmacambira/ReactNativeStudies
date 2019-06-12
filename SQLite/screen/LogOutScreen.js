import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import AsyncStorageKeys from '../constants/AsyncStorageKeys';

import { dropTables } from '../db';

class LogOutScreen extends Component {
    static navigationOptions = {
        title: 'LogOut',
    };

    state = {

        loading: false,
        token: '',
        isConnected: false,
    };

    logout = () => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
        });

        let keys = [AsyncStorageKeys.token, AsyncStorageKeys.user];
        AsyncStorage.multiRemove(keys, (err) => {
            dropTables();
            this.props.navigation.dispatch(actionToDispatch);
        });
    };


    render() {
        const { navigate } = this.props.navigation;
        const { mainContainer } = styles;
        return (
            <View style={mainContainer}>
                <Header title='Tarefas' />
                <Button textStyle={{ fontWeight: "600", fontSize: 17 }} title='LogOut' onPress={this.logout} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export { LogOutScreen };