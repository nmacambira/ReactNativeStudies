import React, { Component } from 'react';
import { View, Text, Linking, StyleSheet, ScrollView } from 'react-native';
import { Banner, MainContainer, BorderButton, ButtonContainer, SpaceContainer, Panel, PanelSection, FullButton } from '../components';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    };

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
                        <PanelSection title="Circulo" />
                        <PanelSection title='Esfera' />
                        <PanelSection title='Eixo' />
                    </Panel>

                    <Panel title="Esquerdo">
                        <PanelSection title="Ciírculo" />
                        <PanelSection title='Esfera' />
                        <PanelSection title='Eixo' />
                    </Panel>

                    {/* <Button
                    raised
                    color='#fff'
                    backgroundColor='#61AB46'
                    title='Go to details'
                    fontWeight='600'                    
                    containerViewStyle={{ alignSelf: 'stretch' }}
                    onPress={() => navigate('Details')}
                /> */}

                    <FullButton onPress={() => navigate('Details')}> Avançar </FullButton>
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