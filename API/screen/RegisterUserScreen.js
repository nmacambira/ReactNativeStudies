import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Text, KeyboardAvoidingView, Alert, CameraRoll, AsyncStorage, TouchableWithoutFeedback, Keyboard, Picker } from 'react-native';

import { ImagePicker } from 'expo';
import { FormInput, FormValidationMessage, Avatar, FormLabel } from 'react-native-elements';
import { Spinner, Header, ImagePickerModal, BottomButton, DropdownButton } from '../components';

import Colors from '../constants/Colors';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';

import { GetRequest, RequestFormData, Url } from '../api';
import * as Utils from '../utils/Utils';


class RegisterUserScreen extends Component {
    static navigationOptions = {
        title: 'Register',
    };

    state = {
        image: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        checkPassword: '',
        managerId: 0,
        jobId: 1,
        token: '',
        jobs: [],
        error: '',
        loading: false,
        passwordInvalid: false,
        showEmailMessage: false,
        modalVisible: false,
        showJobPicker: false,
    }

    componentWillMount() {
        AsyncStorage.getItem(AsyncStorageKeys.token, (err, tokenResult) => {
            this.setState({ token: tokenResult });
            this.requestJobs(tokenResult);
            AsyncStorage.getItem(AsyncStorageKeys.user, (err, result) => {
                //console.log('user', result);
                const user = JSON.parse(result);
                //console.log('userParse', user);
                this.setState({ managerId: user.id });
            });
        });

    }

    requestJobs(token) {
        this.setState({ error: '', loading: true });
        const url = Url.service.baseUrl + Url.service.path.jobs;
        const result = GetRequest(url, token)
            .then((result) => {
                if (result.error == null) {
                    if (result.success) {
                        result.response.json()
                            .then((responseJson) => {
                                this.onRequestSuccess(responseJson);
                            })
                            .catch((error) => {
                                console.log(error);
                                this.onRequestFail('Request error');
                            })
                    } else {
                        this.onRequestFail(result.response);
                    }
                } else {
                    this.onRequestFail('Request error');
                }
            });
    }

    onRequestFail(error) {
        this.setState({ error: error, loading: false });
        Alert.alert('Error', error);
    }

    onRequestSuccess(data) {
        console.log(data);
        this.setState({
            jobs: data,
            loading: false,
            error: ''
        });
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }

    pickImage = async () => {
        this.closeModal();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            // base64: true,
        });
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    pickCamera = async () => {
        this.closeModal();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            // base64: true,
        });
        console.log(result);

        if (!result.cancelled) {
            let saveResult = await CameraRoll.saveToCameraRoll(result.uri, "photo");
            console.log(saveResult);
            this.setState({ image: saveResult });
        }
    };

    renderAvatar() {
        let { image } = this.state;
        if (image) {
            return (
                <Avatar
                    rounded
                    source={{ uri: image }}
                    activeOpacity={0.7}
                    containerStyle={{ alignSelf: 'center', backgroundColor: Colors.text }}
                    onPress={() => this.openModal()}
                    width={80}
                    height={80}
                />
            );
        } else {
            return (
                <Avatar
                    rounded
                    icon={{ name: 'user', type: 'font-awesome', size: 50, color: Colors.tintColor }}
                    activeOpacity={0.7}
                    containerStyle={{ alignSelf: 'center', backgroundColor: Colors.text }}
                    onPress={() => this.openModal()}
                    width={80}
                    height={80}
                />
            );
        }
    }

    setEmailToLowerCase(text) {
        let input = text.toLowerCase();
        this.setState({ email: input });
    }

    renderJobPicker() {
        if (Platform.OS === 'ios') {
            return (
                <View>
                    <Text style={styles.dropdownlabelStyle}>Cargo</Text>
                    <DropdownButton title={this.state.jobId} onPress={this.showPicker.bind(this)} />
                    {this.state.showJobPicker &&
                        <View style={styles.dropdownStyle}>
                            <Picker
                                selectedValue={this.state.jobId}
                                onValueChange={(itemValue, itemIndex) => this.setState({ jobId: itemValue, showJobMessage: false })}>
                                <Picker.Item label="Selecione o cargo" value="Selecione o cargo" />
                                {jobs.map(
                                    (job, index) => <Picker.Item key={index} label={job.title} value={job.id} />
                                )}
                            </Picker>
                        </View>
                    }
                </View>
            );

        } else {
            return (
                <View>
                    <Text style={styles.dropdownlabelStyle}>Cargo</Text>
                    <View style={styles.dropdownStyle}>
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.jobId}
                            onValueChange={(itemValue, itemIndex) => this.setState({ jobId: itemValue, showJobMessage: false })}>
                            <Picker.Item label="Selecione o cargo" value="Selecione o cargo" />
                            {jobs.map(
                                (job, index) => <Picker.Item key={index} label={job.title} value={job.id} />
                            )}
                        </Picker>
                    </View>
                </View>
            );
        }
    }

    showPicker() {
        const show = this.state.showJobPicker ? false : true;
        this.setState({ showJobPicker: show });
    }

    renderRequestButton() {
        if (this.state.loading) {
            return (
                <View style={styles.stickyBottom}>
                    <Spinner size="small" />
                </View>
            );
        }

        return (
            <BottomButton title='Register' onPress={this.checkIfEmailIsValid.bind(this)} />
        );
    }

    checkIfEmailIsValid() {
        if (this.state.email != '' && Utils.validateEmail(this.state.email)) {
            this.setState({ showEmailMessage: false });
            this.requestRegisterUser();
        } else {
            this.setState({ showEmailMessage: true });
        }
    }

    requestRegisterUser() {
        const { image, firstName, lastName, email, phone, password, checkPassword, token, managerId, jobId } = this.state;
        this.setState({ passwordInvalid: false, error: '', loading: true });

        if ((password.length >= 8) && (password == checkPassword)) {
            const url = Url.service.baseUrl + Url.service.path.register;
            const imageData = { key: 'profile_photo', imageURI: image };
            const params = {
                email: email.trim(),
                first_name: firstName,
                last_name: lastName,
                phone_number: phone,
                manager_id: managerId,
                job_id: jobId,
                password: password,
            };
            const result = RequestFormData('POST', url, params, imageData, token)
                .then((result) => {
                    if (result.error == null) {
                        if (result.success) {
                            result.response.json()
                                .then((responseJson) => {
                                    this.onRequestSuccess(responseJson);
                                })
                                .catch((error) => {
                                    console.log('Error: ', error);
                                    this.onRequestFail('Request error');
                                })
                        } else {
                            this.onRequestFail(result.response);
                        }
                    } else {
                        this.onRequestFail('Request error');
                    }
                });
        } else {
            this.setState({ passwordInvalid: true, loading: false });
        }
    }

    onRequestFail(error) {
        const { name, email, phone, password } = this.state;
        this.setState({ error: error, loading: false });

        if (name && email && phone && password) {
            Alert.alert('Error', error);
        }
    }

    onRequestSuccess(data) {
        state = {
            image: null,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            checkPassword: '',
            managerId: 0,
            jobId: 1,
            token: '',
            jobs: [],
            error: '',
            loading: false,
            passwordInvalid: false,
            showEmailMessage: false,
            modalVisible: false,
        }

        console.log(data);
        if (data) {
            Alert.alert(
                'Success',
                'User successfully registered',
                [
                    {
                        text: 'OK',
                        onPress: () => this.props.navigation.goBack(),
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        const { mainContainer, photo, photoText, inputContainer, input, validationMessage, labelStyle } = styles;

        return (
            <View style={mainContainer}>
                <Header title='Register' onPressLeft={() => goBack()} />
                <ImagePickerModal
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.closeModal()}
                    onPressImage={() => this.pickImage()}
                    onPressCamera={() => this.pickCamera()}
                    onPressClose={() => this.closeModal()}
                />
                <ScrollView style={{ marginBottom: 65 }}>
                    <KeyboardAvoidingView behavior="padding">
                        <View style={photo}>
                            {this.renderAvatar()}
                            <Text style={photoText}>Add a photo</Text>
                        </View>

                        <View style={inputContainer}>
                            {this.state.firstName != '' && <FormLabel labelStyle={labelStyle}>First Name</FormLabel>}
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='First Name' onChangeText={(text) => this.setState({ firstName: text.trim() })} autoCorrect={false} />
                            {!this.state.firstName && <FormValidationMessage containerStyle={validationMessage}>{this.state.error}</FormValidationMessage>}

                            {this.state.lastName != '' && <FormLabel labelStyle={labelStyle}>Last Name</FormLabel>}
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Last Name' onChangeText={(text) => this.setState({ lastName: text.trim() })} autoCorrect={false} />
                            {!this.state.lastName && <FormValidationMessage containerStyle={validationMessage}>{this.state.error}</FormValidationMessage>}

                            {this.state.email != '' && <FormLabel labelStyle={labelStyle}>E-mail</FormLabel>}
                            <FormInput inputStyle={styles.input} placeholderTextColor={Colors.textplaceholder} placeholder='E-mail' onChangeText={(text) => this.setEmailToLowerCase(text)} autoCapitalize={'none'} keyboardType={'email-address'} autoCorrect={false} value={this.state.email} />
                            {this.state.showEmailMessage && !Utils.validateEmail(this.state.email) && <FormValidationMessage containerStyle={validationMessage}>Enter a valid e-mail address</FormValidationMessage>}

                            {this.state.phone != '' && <FormLabel labelStyle={labelStyle}>Phone</FormLabel>}
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                                <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Phone' keyboardType={'numeric'} onChangeText={(text) => this.setState({ phone: Utils.formatPhoneNumber(text) })} value={this.state.phone} />
                            </TouchableWithoutFeedback>
                            {!this.state.phone && <FormValidationMessage containerStyle={validationMessage}>{this.state.error}</FormValidationMessage>}

                            {this.renderJobPicker()}
                            {this.state.showJobMessage && <FormValidationMessage containerStyle={validationMessage}>Specify the position</FormValidationMessage>}

                            {this.state.password != '' && <FormLabel labelStyle={labelStyle}>Password</FormLabel>}
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Password' onChangeText={(text) => this.setState({ password: text.trim() })} secureTextEntry={true} />
                            {(this.state.passwordInvalid && this.state.password.length < 8) && <FormValidationMessage containerStyle={validationMessage}>At least 8 characters</FormValidationMessage>}

                            {this.state.checkPassword != '' && <FormLabel labelStyle={labelStyle}>Check Password</FormLabel>}
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Check Password' onChangeText={(text) => this.setState({ checkPassword: text.trim() })} secureTextEntry={true} />
                            {(this.state.password != this.state.checkPassword) && (this.state.checkPassword.length > 0) && <FormValidationMessage>The passwords must be the same</FormValidationMessage>}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>

                {this.renderRequestButton()}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    photo: {
        marginTop: 10,
        alignSelf: 'center',
    },
    photoText: {
        fontSize: 12,
        marginTop: 4,
    },
    inputContainer: {
        marginTop: 10,
    },
    input: {
        color: Colors.text,
        borderColor: Colors.textplaceholder,
        fontWeight: "600",
        fontSize: 15,
        paddingRight: 20,
    },
    validationMessage: {
        marginBottom: -10,
        marginTop: 0,
    },
    stickyBottom: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    labelStyle: {
        marginTop: 10,
        fontSize: 12,
        color: Colors.text,
        fontWeight: "400",
    },
    dropdownStyle: {
        marginTop: 10,
        marginHorizontal: 18,
    },
    dropdownlabelStyle: {
        color: Colors.text,
        fontSize: 12,
        marginTop: 10,
        marginHorizontal: 18,
    },
});

export { RegisterUserScreen };