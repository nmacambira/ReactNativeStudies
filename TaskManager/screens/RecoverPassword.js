import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Alert, ScrollView, NetInfo } from 'react-native';
import { BottomButton, Spinner, Header } from '../components';

import { PRequest, Url } from '../api';
import Colors from '../constants/Colors';


class RecoverPassword extends Component {
    static navigationOptions = {
        title: 'Recuperar senha',
    };

    state = {
        email: '',
        error: '',
        loading: false,
        showMessage: false,
    };

    onButtonPress = async () => {
        const isConnected = await NetInfo.isConnected.fetch();
        console.log('Internet connection: ' + (isConnected ? 'online' : 'offline'));
        if (isConnected) {
            this.requestRecoverPassword();
        } else {
            Alert.alert('Sem conexão', 'Não há conexão com a internet. Tente novamente mais tarde.');
        }
    }

    requestRecoverPassword() {
        const { email } = this.state;

        if (email == '') {
            this.setState({ showMessage: true });

        } else {
            this.setState({ error: '', loading: true });

            const url = Url.service.baseUrl + Url.service.path.recoverPassword;
            const data = {
                email: email.toLowerCase(),
            };
            PRequest('POST', url, data)
                .then((result) => {
                    if (result.error == null) {
                        if (result.success) {
                            result.response.json()
                                .then((responseJson) => {
                                    this.onRequestSuccess(responseJson);
                                })
                                .catch((error) => {
                                    console.log('JSON Error');
                                    this.onRequestFail('Erro na requisição');
                                })
                        } else {
                            this.onRequestFail(result.response);
                        }
                    } else {
                        this.onRequestFail('Erro na requisição');
                    }
                });
        }
    }

    onRequestFail(error) {
        const { email } = this.state;
        this.setState({ error: error, loading: false });

        if (email) {
            Alert.alert('Oops', error);
        }
    }

    onRequestSuccess(data) {
        this.setState({
            email: '',
            loading: false,
            error: '',
            showMessage: false,
        });
        console.log(data);

        Alert.alert('Solicitação atendida', 'Verifique seu e-mail');
        this.props.navigation.goBack();
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <View style={styles.stickyBottom}>
                    <Spinner size="small" />
                </View>
            );
        }

        return (
            <BottomButton title='Recuperar senha' onPress={this.onButtonPress.bind(this)} />
        );
    }

    handleReturnKey() {
        this.onButtonPress();
    }

    render() {
        const { goBack } = this.props.navigation;
        const { mainContainer, inputContainer, input, validationMessage } = styles;

        return (
            <View style={mainContainer}>
                <Header title='Recuperar senha' onPressLeft={() => goBack()} />
                <ScrollView keyboardDismissMode='on-drag'>
                    <View style={inputContainer}>
                        <TextInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='E-mail' onChangeText={(text) => this.setState({ email: text.trim() })} autoCapitalize={'none'} keyboardType={'email-address'} autoCorrect={false} />

                        {this.state.showMessage && this.state.email.length == 0 && <Text containerStyle={validationMessage}>Digite o e-mail cadastrado no sistema</Text>}
                    </View>
                </ScrollView>
                {this.renderButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        color: Colors.text,
        marginTop: 10,
        borderColor: Colors.textplaceholder,
        fontWeight: "600",
        fontSize: 15,
        paddingRight: 20,
    },
    validationMessage: {
        marginBottom: -15,
        marginTop: 0,
        color: Colors.text,
        fontSize: 11,
    },
    stickyBottom: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});

export { RecoverPassword };