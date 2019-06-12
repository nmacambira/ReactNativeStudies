import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { FullButton } from '../components';

class DetailsScreen extends Component {
    static navigationOptions = {
        title: 'Details',
    };

    _handleButtonPress = () => {
        Alert.alert(
            'Button pressed!',
            'You did it!',
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FullButton onPress={this._handleButtonPress}> Alert </FullButton>
                />
            </View>
        );
    }
}

export { DetailsScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
});