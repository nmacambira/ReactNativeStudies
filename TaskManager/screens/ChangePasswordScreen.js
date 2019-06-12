import React, { Component } from 'react';
import { View, StyleSheet, Alert, ScrollView, AsyncStorage, NetInfo } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import { BottomButton, Spinner, Header } from '../components';

import { PRequest, Url } from '../api';
import Colors from '../constants/Colors';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';


class ChangePasswordScreen extends Component {
    static navigationOptions = {
        title: 'Alterar senha',
    };

    state = {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: '',
        loading: false,
        showMessage: false,
        token: '',
    };

    componentWillMount() {
        AsyncStorage.getItem(AsyncStorageKeys.token, (err, result) => {
            this.setState({ token: result });
        });
    }

    onButtonPress = async () => {
        const isConnected = await NetInfo.isConnected.fetch();
        console.log('Internet connection: ' + (isConnected ? 'online' : 'offline'));
        if (isConnected) {
            this.requestChangePassword();
        } else {
            Alert.alert('Sem conexão', 'Não há conexão com a internet. Tente novamente mais tarde.');
        }
    }

    requestChangePassword() {
        const { oldPassword, newPassword } = this.state;

        if (oldPassword == '') {
            this.setState({ showMessage: true });

        } else {
            this.setState({ error: '', loading: true });

            const url = Url.service.baseUrl + Url.service.path.changePassword;
            const data = {
                old_password: oldPassword,
                new_password: newPassword,
            };
            const token = this.state.token;
            PRequest('PUT', url, data, token)
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
        const { oldPassword, newPassword } = this.state;
        this.setState({ error: error, loading: false });

        if (oldPassword && newPassword) {
            Alert.alert('Oops', error);
        }
    }

    onRequestSuccess(data) {
        this.setState({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            loading: false,
            error: '',
            showMessage: false,
            token: '',
        });
        console.log(data);

        Alert.alert('', 'Senha alterada com sucesso!');
        //this.props.navigation.goBack();
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
            <BottomButton title='Alterar senha' onPress={this.onButtonPress.bind(this)} />
        );
    }

    handleReturnKey() {
        this.onButtonPress();
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        const { mainContainer, inputContainer, input, validationMessage } = styles;

        return (
            <View style={mainContainer}>
                <Header title='Alterar senha' onPressLeft={() => goBack()} />
                <ScrollView keyboardDismissMode='on-drag'>
                    <View style={inputContainer}>
                        <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Senha atual' onChangeText={(text) => this.setState({ oldPassword: text.trim() })} autoCapitalize={'none'} secureTextEntry={true} />
                        {this.state.showMessage && this.state.oldPassword.length == 0 && <FormValidationMessage containerStyle={validationMessage}>Campo obrigatório</FormValidationMessage>}

                        <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Nova senha' onChangeText={(text) => this.setState({ newPassword: text.trim() })} autoCapitalize={'none'} secureTextEntry={true} />
                        {(this.state.newPassword.length > 0 && this.state.newPassword.length < 8) && <FormValidationMessage containerStyle={validationMessage}>No mínimo 8 caracteres</FormValidationMessage>}

                        <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Confirmar nova senha' onChangeText={(text) => this.setState({ confirmNewPassword: text.trim() })} autoCapitalize={'none'} secureTextEntry={true} returnKeyType="send" onSubmitEditing={this.handleReturnKey.bind(this)} blurOnSubmit={true} />
                        {(this.state.newPassword != this.state.confirmNewPassword) && (this.state.confirmNewPassword.length > 0) && <FormValidationMessage>As novas senhas devem ser iguais</FormValidationMessage>}
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
    },
    stickyBottom: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
});

export { ChangePasswordScreen };