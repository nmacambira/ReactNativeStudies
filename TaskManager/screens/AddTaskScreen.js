import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, KeyboardAvoidingView, Alert, AsyncStorage, Picker, DatePickerIOS, DatePickerAndroid } from 'react-native';

import { FormInput, FormValidationMessage, FormLabel } from 'react-native-elements';
import { Spinner, Header, BottomButton, CustomPicker, DatePickeriOSModal } from '../components';

import Colors from '../constants/Colors';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';

import { GetRequest, RequestFormData, Url } from '../api';
import * as Utils from '../utils/Utils';

const priorities = [
    { id: 0, title: 'Urgente' },
    { id: 1, title: 'Alta' },
    { id: 2, title: 'Normal' },
    { id: 3, title: 'Baixa' }
];

const statusList = [
    { id: 'in_progress', title: 'Em andamento' },
    { id: 'on_hold', title: 'Com impedimento' },
    { id: 'created', title: 'Criada' },
    { id: 'completed', title: 'Concluída' },
    { id: 'canceled', title: 'Cancelada' }
];

class AddTaskScreen extends Component {
    static navigationOptions = {
        title: 'Cadastrar tarefa',
    };

    state = {
        file: null,
        projectId: '',
        employeeId: '',
        title: '',
        detail: '',
        priority: 2,
        dueDateFormatted: new Date().toLocaleDateString("pt-BR"),
        dueDate: new Date(),
        status: 'created',
        workingHours: 0.0,
        token: null,
        projects: [],
        employees: [],
        error: '',
        loading: false,
        showProjectMessage: false,
        showEmployeeMessage: false,
        modalVisible: false,
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const token = params ? params.token : null;
        if (token) {
            this.setState({ token });
            this.requestProjects(token);
            AsyncStorage.getItem(AsyncStorageKeys.user, (err, result) => {
                const user = JSON.parse(result);
                if (user.category === 'Employee') {
                    this.setState({ employees: [user] }); //employee
                } else {
                    this.requestEmployees(token); //manager
                }
            });
        }
    }

    requestProjects(token) {
        this.setState({ error: '', loading: true });
        const url = Url.service.baseUrl + Url.service.path.projects;
        const result = GetRequest(url, token)
            .then((result) => {
                if (result.error == null) {
                    if (result.success) {
                        result.response.json()
                            .then((responseJson) => {
                                this.onRequestProjectsSuccess(responseJson);
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
        this.setState({ error: error, loading: false });
        Alert.alert('Erro', error);
    }

    onRequestProjectsSuccess(data) {
        console.log(data);
        this.setState({
            projects: data,
            loading: false,
            error: ''
        });
    }

    requestEmployees(token) {
        this.setState({ error: '', loading: true });
        const url = Url.service.baseUrl + Url.service.path.users;
        const result = GetRequest(url, token)
            .then((result) => {
                if (result.error == null) {
                    if (result.success) {
                        result.response.json()
                            .then((responseJson) => {
                                this.onRequestUsersSuccess(responseJson);
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

    onRequestUsersSuccess(data) {
        console.log(data);
        this.setState({
            employees: data,
            loading: false,
            error: ''
        });
    }

    renderProjectPicker() {
        return <CustomPicker
            pickerLabel={'Projeto'}
            pickerItemLabel={'Selecione o projeto'}
            pickerItemValue={-1}
            objetcsMap={this.state.projects.map(
                (project, index) => <Picker.Item key={index} label={project.title} value={project.id} />
            )}
            selectedValue={this.state.projectId}
            onValueChange={(itemValue, itemIndex) => this.setState({ projectId: itemValue, showProjectMessage: false })} />
    }

    renderEmployeePicker() {
        return <CustomPicker
            pickerLabel={'Funcionário'}
            pickerItemLabel={'Selecione o funcionário'}
            pickerItemValue={-1}
            objetcsMap={this.state.employees.map(
                (employee, index) => <Picker.Item key={index} label={employee.first_name} value={employee.id} />
            )}
            selectedValue={this.state.employeeId}
            onValueChange={(itemValue, itemIndex) => this.setState({ employeeId: itemValue, showEmployeeMessage: false })} />
    }

    renderPriorityPicker() {
        return <CustomPicker
            pickerLabel={'Prioridade'}
            pickerItemLabel={'Selecione a prioridade'}
            pickerItemValue={2}
            objetcsMap={priorities.map(
                (priority, index) => <Picker.Item key={index} label={priority.title} value={priority.id} />
            )}
            selectedValue={this.state.priority}
            onValueChange={(itemValue, itemIndex) => this.setState({ priority: itemValue })} />
    }

    renderStatusPicker() {
        return <CustomPicker
            pickerLabel={'Status'}
            pickerItemLabel={'Selecione o status'}
            pickerItemValue={'created'}
            objetcsMap={statusList.map(
                (status, index) => <Picker.Item key={index} label={status.title} value={status.id} />
            )}
            selectedValue={this.state.status}
            onValueChange={(itemValue, itemIndex) => this.setState({ status: itemValue })} />
    }

    renderDueDate() {
        const { labelStyle, dateStyle, viewTextStyle } = styles;
        return (
            <TouchableOpacity onPress={this.showDatePicker.bind(this)}>
                <FormLabel labelStyle={labelStyle}>Data</FormLabel>
                <View style={viewTextStyle}>
                    <Text style={dateStyle}>{this.state.dueDateFormatted}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    showDatePicker() {
        if (Platform.OS === 'ios') {
            console.log('renderiOSDatePicker')
            this.openDatePickeriOSModal();
        } else {
            console.log('renderAndroidDatePicker')
            this.renderAndroidDatePicker();
        }
    }

    openDatePickeriOSModal() {
        this.setState({ modalVisible: true });
    }

    closeDatePickeriOSModal() {
        this.setState({ modalVisible: false });
    }

    selectDatePickeriOSDate() {
        this.setState({
            modalVisible: false,
            dueDateFormatted: this.state.dueDate.toLocaleDateString("pt-BR")
        });
    }

    async renderAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                this.setState({ dueDateFormatted: date.toLocaleDateString("pt-BR"), dueDate: date });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
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
            <BottomButton title='Adicionar tarefa' onPress={this.requestAddTask.bind(this)} />
        );
    }

    requestAddTask() {
        const { file, projectId, employeeId, title, detail, priority, dueDate, status, workingHours, token } = this.state;
        this.setState({ error: '', loading: true });

        if (project_id && employee_id && title) {
            const url = Url.service.baseUrl + Url.service.path.tasks;
            const fileData = { key: 'file', imageURI: file };
            const params = {
                project_id: projectId,
                employee_id: employeeId,
                title: title.trim(),
                detail: detail.trim(),
                priority: priority,
                due_date: Utils.formatDateToISOString(dueDate),
                status: status,
                working_hours: workingHours,
            };
            const result = RequestFormData('POST', url, params, fileData, token)
                .then((result) => {
                    if (result.error == null) {
                        if (result.success) {
                            result.response.json()
                                .then((responseJson) => {
                                    this.onRequestAddTasksSuccess(responseJson);
                                })
                                .catch((error) => {
                                    console.log('Error: ', error);
                                    this.onRequestAddTaskFail('Erro na requisição');
                                })
                        } else {
                            this.onRequestAddTaskFail(result.response);
                        }
                    } else {
                        this.onRequestAddTaskFail('Erro na requisição');
                    }
                });
        } else {
            this.setState({ loading: false });
        }
    }

    onRequestAddTaskFail(error) {
        const { projectId, employeeId, title } = this.state;
        this.setState({ error: error, loading: false });

        if (projectId && employeeId && title) {
            Alert.alert('Erro', error);
        }
    }

    onRequestAddTasksSuccess(data) {
        state = {
            file: null,
            projectId: '',
            employeeId: '',
            title: '',
            detail: '',
            priority: 2,
            dueDateFormatted: new Date().toLocaleDateString("pt-BR"),
            dueDate: new Date(),
            status: 'created',
            workingHours: 0.0,
            token: null,
            projects: [],
            employees: [],
            error: '',
            loading: false,
            showProjectMessage: false,
            showEmployeeMessage: false,
            modalVisible: false,
        }

        console.log(data);
        if (data) {
            Alert.alert(
                'Sucesso',
                'Tarefa adicionada com sucesso',
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
        const { mainContainer, inputContainer, input, validationMessage, labelStyle } = styles;

        return (
            <View style={mainContainer}>
                <Header title='Cadastrar tarefa' onPressLeft={() => goBack()} />
                <DatePickeriOSModal
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.closeDatePickeriOSModal()}
                    onPressCancel={() => this.closeDatePickeriOSModal()}
                    onPressSelect={() => this.selectDatePickeriOSDate()}
                    date={this.state.dueDate}
                    onDateChange={(date) => this.setState({ dueDate: date })}
                    mode='date'
                />
                <ScrollView style={{ marginBottom: 65 }}>
                    <KeyboardAvoidingView behavior="padding">
                        <View style={inputContainer}>
                            {this.renderProjectPicker()}
                            {this.state.showProjectMessage && <FormValidationMessage containerStyle={validationMessage}>Selecione o projeto</FormValidationMessage>}

                            {this.renderEmployeePicker()}
                            {this.state.showEmployeeMessage && <FormValidationMessage containerStyle={validationMessage}>Selecione o funcionário</FormValidationMessage>}

                            <FormLabel labelStyle={labelStyle}>Tarefa</FormLabel>
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Tarefa' onChangeText={(text) => this.setState({ title: text.trim() })} />
                            {!this.state.title && <FormValidationMessage containerStyle={validationMessage}>{this.state.error}</FormValidationMessage>}

                            <FormLabel labelStyle={labelStyle}>Detalhes</FormLabel>
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Detalhes' onChangeText={(text) => this.setState({ detail: text.trim() })} />

                            {this.renderPriorityPicker()}

                            {this.renderDueDate()}

                            {this.renderStatusPicker()}

                            <FormLabel labelStyle={labelStyle}>Horas trabalhadas</FormLabel>
                            <FormInput inputStyle={input} placeholderTextColor={Colors.textplaceholder} placeholder='Horas trabalhadas' onChangeText={(text) => this.setState({ workingHours: text.trim() })} />
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
    dateStyle: {
        color: Colors.text,
        fontSize: 17,
        marginTop: 10,
    },
    viewTextStyle: {
        borderBottomColor: Colors.textplaceholder,
        borderBottomWidth: 1,
        marginLeft: 18,
        paddingBottom: 3,
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

export { AddTaskScreen };