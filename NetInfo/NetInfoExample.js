import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, Alert, NetInfo } from 'react-native';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';

class NetInfoExample extends Component {
    static navigationOptions = {
        title: 'NetInfoExample',
    };

    state = {
        objects: [],
        error: '',
        loading: false,
        isConnected: false,
    };

    componentWillMount() {
        createTables();
        NetInfo.isConnected.addEventListener('connectionChange', this.handleFirstConnectivityChange);
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            this.setState({ isConnected });
        });
    }

    componentDidMount() {
        if (this.state.isConnected === false) {
            Alert.alert('Oops', 'Connection is offline');
            this.getObjectsFromDB();
        } else {
            AsyncStorage.getItem(AsyncStorageKeys.token, (err, tokenResult) => {
                this.setState({ error: '', loading: true });
                this.synchronizeObjects(tokenResult);
                this.someOtherRequest(tokenResult);
                AsyncStorage.getItem(AsyncStorageKeys.user, (err, userResult) => {
                    const user = JSON.parse(userResult);
                    this.requestUser(user.id, tokenResult) // update user;
                });
            });
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
    }

    handleFirstConnectivityChange = (isConnected) => {
        console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
        this.setState({ isConnected });
    }

    synchronizeObjects(tokenResult) {
        // search for the objects that need to be synchronized and then do someRequest();
        this.someRequest(tokenResult);
    }

    showAlert() {
        Alert.alert(
            'Check connection?',
            message, [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => console.log(this.state.isConnected) },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { mainContainer } = styles;
        return (
            <View style={mainContainer}>
                <Text style={textStyle} onPress={this.showAlert()}>Net Info</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textStyle: {
        color: 'black',
        fontSize: 17,
        fontWeight: '600',
    },
});

export { NetInfoExample };