import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, TextInput, StatusBar, KeyboardAvoidingView, Alert, AsyncStorage, ScrollView } from 'react-native';
import { FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { Spinner } from '../components';

import { PRequest, Url } from '../api';
import Colors from '../constants/Colors';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';

FormInput.defaultProps.selectionColor = Colors.button;

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
        header: null,
    };

    state = { email: '', password: '', error: '', loading: false };

    componentWillMount() {
        AsyncStorage.getItem(AsyncStorageKeys.user, (err, result) => {
            console.log(result);
            if (result) {
                this.props.navigation.navigate('Main');
            }
        });
    }

    onButtonPress = async () => {
        const isConnected = await NetInfo.isConnected.fetch();
        console.log('Internet connection: ' + (isConnected ? 'online' : 'offline'));
        if (isConnected) {
            Alert.alert('Sem conexão', 'Não há conexão com a internet. Tente novamente mais tarde.');
        } else {
            this.requestLogin();
        }
    }

    requestLogin() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });

        const url = Url.service.baseUrl + Url.service.path.login;
        const data = {
            username: email.trim(),
            password: password,
        };

        const result = PRequest('POST', url, data)
            .then((result) => {
                if (result.error == null) {
                    if (result.success) {
                        result.response.json()
                            .then((responseJson) => {
                                this.onRequestSuccess(responseJson);
                            })
                            .catch((error) => {
                                console.log(error);
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

    onRequestFail(error) {
        const { email, password } = this.state;
        this.setState({ error: error, loading: false });

        if (email && password) {
            Alert.alert('Erro no Login', error);
        }
    }

    onRequestSuccess(data) {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
        console.log(data);
        this.persistDataOnAsyncStorage(AsyncStorageKeys.token, AsyncStorageKeys.user, data);
    }

    persistDataOnAsyncStorage(tokenKey, userKey, data) {
        AsyncStorage.setItem(tokenKey, data.token, () => {
            AsyncStorage.setItem(userKey, JSON.stringify(data.user), () => {
                // AsyncStorage.getItem(userKey, (err, result) => {
                //     console.log('user', result);
                //     const user = JSON.parse(result);
                //     console.log('userParse', user);
                // });
                this.props.navigation.navigate('Main');
            });
        });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button backgroundColor={Colors.button} textStyle={{ fontWeight: "600", fontSize: 17 }} title='Entrar' onPress={this.onButtonPress.bind(this)} />
        );
    }

    setEmailToLowerCase(text) {
        let input = text.toLowerCase();
        this.setState({ email: input });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { backgroundImage, scrollStyle, logoimage, inputContainer, input, validationMessage } = styles;

        return (
            <ImageBackground style={backgroundImage} source={require('../assets/images/splash.png')}>
                {/* <StatusBar hidden={true} /> */}
                <ScrollView style={scrollStyle} keyboardDismissMode='on-drag'>
                    {/* <KeyboardAvoidingView behavior="padding"> */}
                    <Image source={require('../assets/images/logo.png')} style={logoimage} />
                    <View style={inputContainer}>
                        <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='E-mail' onChangeText={(text) => this.setEmailToLowerCase(text)} autoCapitalize={'none'} keyboardType={'email-address'} autoCorrect={false} value={this.state.email} />
                        {!this.state.email && <FormValidationMessage containerStyle={validationMessage}>{this.state.error}</FormValidationMessage>}

                        <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Senha' onChangeText={(text) => this.setState({ password: text.trim() })} autoCapitalize={'none'} secureTextEntry={true} />
                        {!this.state.password && <FormValidationMessage containerStyle={validationMessage}>{this.state.error}</FormValidationMessage>}
                    </View>

                    {this.renderButton()}

                    <Button color={'#fff'} transparent={true} fontSize={13} textStyle={{ fontWeight: "600" }} title='Esqueci minha senha' onPress={() => navigate('RecoverPassword')} />
                    {/* </KeyboardAvoidingView> */}
                    <View style={{ height: 200 }}></View>
                </ScrollView>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    scrollStyle: {
        // marginTop: 65,
    },
    inputContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    input: {
        color: Colors.tintColor,
        marginTop: 10,
        fontWeight: "600",
        fontSize: 15,
        paddingRight: 20,
    },
    logoimage: {
        width: 207,
        height: 134,
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginBottom: 60,
        marginTop: 60,
    },
    bottomButton: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    validationMessage: {
        marginBottom: -15,
        marginTop: 0,
    },
});

export { LoginScreen };