import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Spinner,
    Header,
    FullButton,
    DropdownList,
    DropdownButton
} from '../components';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    state = {
        list: [
            { id: 0, key: 'Devin' },
            { id: 1, key: 'Jackson' },
            { id: 2, key: 'James' },
            { id: 3, key: 'Joel' },
            { id: 4, key: 'John' },
            { id: 5, key: 'Jillian' },
            { id: 6, key: 'Jimmy' },
            { id: 7, key: 'Julie' },
        ]
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {/* <Header title='Home' /> */}
                <Text style={styles.welcome}>
                    Home!
                </Text>
                {/* <Spinner size="small" /> */}

                <DropdownList label={'Teste'} data={this.state.list} />
                <DropdownButton title={'Teste'} />

                <FullButton onPress={() => navigate('Details')}> Go To Details </FullButton>
            </View>
        );
    }
}

export { HomeScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingHorizontal: 16,
    },
});