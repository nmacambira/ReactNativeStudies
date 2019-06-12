import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';

class DetailsScreen extends Component {
    static navigationOptions = {
        title: 'Details Screen',
    };

    handleButtonPress = () => {
        Alert.alert(
            'Button pressed!',
            'You did it!',
        );
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <SearchBar
                    round
                    lightTheme
                    placeholder='Search...'
                    onChangeText={() => console.log('Search')}
                    onClearText={() => console.log('TextClear')}
                    containerStyle={{ backgroundColor: 'white', alignSelf: 'stretch' }}
                />

                <Icon reverse color="#517fa4" name="directions" size={62} type="material" />
                <Icon
                    color="#f50"
                    name="heartbeat"
                    size={62}
                    type="font-awesome"
                    onPress={() => console.log('hello')}
                />
                <Text>Details Screen</Text>

                <Button
                    raised
                    color='#FFF'
                    backgroundColor='#00aced'
                    icon={{ name: 'cached', color: 'black' }}
                    title='BUTTON WITH ICON'
                    fontWeight='600'
                    containerViewStyle={{ alignSelf: 'stretch' }}
                    onPress={this.handleButtonPress}
                />
            </View>
        );
    }
}

export default DetailsScreen;