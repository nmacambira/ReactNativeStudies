import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Banner, MainContainer, Panel, PanelSection, FullButton } from '../components';

import Colors from '../constants/Colors';

class AdditionalItems extends Component {
    static navigationOptions = {
        title: 'Itens adicionais',
    };

    render() {
        const { navigate } = this.props.navigation;

        const { container, panelTextSyle } = styles;

        return (
            <View style={container}>
                <Banner imageSource={require('../assets/squares.jpeg')} onPress={() => Linking.openURL(url)} />
                <MainContainer>
                    <Panel title="Resumo">
                        <Text style={panelTextSyle}>Lorem ipsum 1</Text>
                        <Text style={panelTextSyle}>D: Círculo 0.25 Esfera 1.0 Eixo 1º </Text>
                        <Text style={panelTextSyle}>E: Círculo 1.25 Esfera 1.5 Eixo 2º</Text>
                    </Panel>
                    <FullButton onPress={() => navigate('')}> Avançar </FullButton>
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
});

export default AdditionalItems;