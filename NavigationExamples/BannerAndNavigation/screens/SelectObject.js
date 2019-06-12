import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SearchBar, Icon, Button } from 'react-native-elements';

import { Banner, MainContainer, ButtonContainer, Panel, ObjectDetails } from '../components';

import Colors from '../constants/Colors';

class SelectObject extends Component {
    static navigationOptions = {
        title: 'Tipo de objeto',
    };

    state = {
        objects: []
    };

    // Lifecycle method
    componentWillMount() {
        // ASYNC HTTP request to get movies from API
        // fetch('https://facebook.github.io/react-native/movies.json')
        //     .then((response) => response.json())
        //     .then((responseJson) => this.setState({ objects: response.data }))
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }

    // Helper method to render objects details
    // renderObjects() {
    //     return this.state.objects.map(obj =>
    //         <ObjectDetails key={obj.name} obj={obj} />
    //     );
    // }

    selectedObjects() {
        console.log('selected objects');
        this.props.navigation.navigate('AdditionalItems');
        //const { navigate } = this.props.navigation;
        //navigate('AdditionalItems');
    }

    render() {
        const { container, panelTextSyle } = styles;

        return (
            <View style={styles.container}>
                <Banner imageSource={require('../assets/squares.jpeg')} onPress={() => Linking.openURL(url)} />
                <MainContainer>
                    <Panel title="Resumo">
                        <Text style={panelTextSyle}>Lorem ipsum 1</Text>
                        <Text style={panelTextSyle}>D: Círculo 0.25 Esfera 1.0 Eixo 1º </Text>
                        <Text style={panelTextSyle}>E: Círculo 1.25 Esfera 1.5 Eixo 2º</Text>
                    </Panel>

                    <SearchBar
                        round
                        lightTheme
                        placeholder='Pesquisar'
                        onChangeText={() => console.log('Search')}
                        onClearText={() => console.log('TextClear')}
                        containerStyle={{ backgroundColor: 'white', borderBottomWidth: 0, borderTopWidth: 0, marginRight: -8, marginLeft: -8, marginBottom: 0, marginTop: -4 }}
                        inputStyle={{ backgroundColor: '#EEEDF2', fontSize: 12 }}
                    />

                    <ScrollView style={styles.scrollViewStyle}>
                        {/* {this.renderObjects()} */}
                        <ObjectDetails imageSource={require('../assets/squares.jpeg')} name='Lorem ipsum' price='R$ 10,00' onPress={this.selectedObjects.bind(this)} />
                    </ScrollView>

                </MainContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    panelTextSyle: {
        fontSize: 12,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
        color: Colors.grayDark
    },
    scrollViewStyle: {
        paddingTop: 5,
    },
});

// Make a component available to other parts of the app
export default SelectObject;