import React, { Component } from 'react';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';
// import { Button } from 'react-native-elements';
import { Banner, MainContainer, BorderButton, ButtonContainer, SpaceContainer, Panel, PanelSection, FullButton } from '../components';


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Tela inicial',
    };

    state = { DCirValue: '0.0', DEsfValue: '0.0' };

    addValue() {
        const { DCirValue, DEsfValue } = this.state;

        this.setState({ DCirValue: parseFloat(DCirValue) + 0.25 });

        // switch (title) {
        //     case 'Circulo':            
        //       return  updateState(DCirValue) ;            
        //     case 'Esfera':
        //       return  updateState(DEsfValue) ;
        //     default:
        //       return 0.0;
        //   }
    }

    removeValue() {
        const { DCirValue } = this.state;

        const result = parseFloat(DCirValue) - 0.25;
        this.setState({ DCirValue: result });
    }

    updateState(state) {
        const result = parseFloat(state) + 0.25;
        this.setState({ state: result });
    }

    render() {
        const { navigate } = this.props.navigation;

        const url = 'https://facebook.github.io/react-native';

        return (
            <View style={styles.container}>
                <Banner imageSource={require('../assets/squares.jpeg')} onPress={() => Linking.openURL(url)} />
                <MainContainer>
                    <ButtonContainer>
                        <BorderButton>Lorem ipsum 1</BorderButton>
                        <SpaceContainer />
                        <BorderButton>Lorem ipsum 2</BorderButton>
                    </ButtonContainer>

                    <Panel title="Direito">
                        <PanelSection title="Círculo" onPressAdd={this.addValue.bind(this)} onPressRemove={this.removeValue.bind(this)} value={this.state.DCirValue.toString()} />
                        <PanelSection title='Esfera' onPressAdd={this.addValue.bind(this)} onPressRemove={this.removeValue.bind(this)} value={this.state.DEsfValue.toString()} />
                        <PanelSection title='Eixo' />
                    </Panel>

                    <Panel title="Esquerdo">
                        <PanelSection title="Circulo" />
                        <PanelSection title='Esfera' />
                        <PanelSection title='Eixo' />
                    </Panel>

                    {/* <Button
                        raised
                        color='#fff'
                        backgroundColor='#61AB46'
                        title='Go to details'
                        //fontWeight='600'
                        containerViewStyle={{ alignSelf: 'stretch', marginRight: 0, marginLeft: 0 }}
                        onPress={() => navigate('Details')}
                    /> */}

                    <FullButton onPress={() => navigate('SelectObject')}> Avançar </FullButton>
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
});

export default HomeScreen;