import React, { Component } from 'react';
import { View, Image, Button, Text } from 'react-native';
import Colors from '../constants/Colors';

class AScreen extends Component {
    static navigationOptions = {
        title: 'AScreen',
    };

    state = {
        image: null,
    }

    returnData = (data) => {
        this.setState(data);
    };

    onPressButton = () => {
        this.props.navigation.navigate('BScreen', {
            returnData: this.returnData, //send method
            text: 'Some text' //send variable
        });
    }

    render() {
        return (
            <View>
                <Button title='GotoBScreen' color={Colors.text} transparent={true} onPress={this.onPressButton} />
                <Image source={{ uri: this.state.image }} style={{ height: 400, weight: 400 }} />
            </View>
        )
    }
}
export { AScreen };

class BScreen extends Component {
    static navigationOptions = {
        title: 'BScreen',
    };

    state = {
        text: '',
        cameraRollUri: null,
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const text = params ? params.text : null;
        if (text) {
            this.setState({ text });
        }
    }

    goBackWithParams = () => {
        const { navigation } = this.props;
        navigation.state.params.returnData({ image: this.state.cameraRollUri }); //send back
        navigation.goBack();
    }

    render() {
        return (
            <View>
                <Text>{this.state.text}</Text>;
                <Button title='GoBackToAScreen' color={Colors.text} transparent={true} onPress={this.goBackWithParams} />
            </View>
        )
    }
}
export { BScreen }; 