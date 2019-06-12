import React, { Component } from 'react';
import { View, StyleSheet, Alert, ScrollView, AsyncStorage, NetInfo } from 'react-native';
import { FormInput, FormValidationMessage } from 'react-native-elements';
import { BottomButton, Spinner, Header } from '../components';

import { PRequest, Url } from '../api';
import Colors from '../constants/Colors';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';


class ContactScreen extends Component {
    static navigationOptions = {
        title: 'Contato',
    };

    state = {
        token: '',
        name: '',
        email: '',
        subject: '',
        message: '',
        error: '',
        loading: false,
        showMessage: false,
    };

    componentWillMount() {
        AsyncStorage.getItem(AsyncStorageKeys.token, (err, result) => {
            this.setState({ token: result });
            AsyncStorage.getItem(AsyncStorageKeys.user, (err, result) => {
                const user = JSON.parse(result);
                const full_name = user.first_name + " " + user.last_name
                this.setState({ name: full_name, email: user.email });
            });
        });
    }

    onButtonPress = async () => {
        const isConnected = await NetInfo.isConnected.fetch();
        console.log('Internet connection: ' + (isConnected ? 'online' : 'offline'));
        if (isConnected) {
            this.requestContact();
        } else {
            Alert.alert('Sem conexão', 'Não há conexão com a internet. Tente novamente mais tarde.');
        }
    }

    requestContact() {
        const { subject, message, email, name, token } = this.state;

        if (subject == '') {
            this.setState({ showMessage: true });

        } else {
            this.setState({ error: '', loading: true });

            const url = Url.service.baseUrl + Url.service.path.contact;
            const data = {
                subject: subject,
                message: message,
                sender_email: email,
                name: name,
            };
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
        const { subject, message } = this.state;
        this.setState({ error: error, loading: false });

        if (subject && message) {
            Alert.alert('Oops', error);
        }
    }

    onRequestSuccess(data) {
        this.setState({
            token: '',
            name: '',
            email: '',
            subject: '',
            message: '',
            error: '',
            loading: false,
            showMessage: false,
        });
        console.log(data);

        Alert.alert('', 'Mensagem enviada com sucesso');
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
            <BottomButton title='Enviar mensagem' onPress={this.onButtonPress.bind(this)} />
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
                <Header title='Contato' onPressLeft={() => goBack()} />
                <ScrollView keyboardDismissMode='on-drag'>
                    <View style={inputContainer}>
                        <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Assunto' onChangeText={(text) => this.setState({ subject: text.trim() })} />
                        {this.state.showMessage && this.state.subject.length == 0 && <FormValidationMessage containerStyle={validationMessage}>Campo obrigatório</FormValidationMessage>}

                        <FormInput inputStyle={[input, { textAlignVertical: 'top' }]} placeholderTextColor={Colors.textplaceholder} placeholder='Mensagem' onChangeText={(text) => this.setState({ message: text.trim() })} multiline={true} numberOfLines={10} />
                        {this.state.showMessage && this.state.message.length > 0 && <FormValidationMessage containerStyle={validationMessage}>Campo obrigatório</FormValidationMessage>}
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

export { ContactScreen };