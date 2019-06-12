import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, AsyncStorage, NetInfo } from 'react-native';
import { Spinner, Header, TaskCard } from '../components';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';

import { GetRequest, Url } from '../api';

import { createTables, selectAllFromTable, insertTask, selectAllWithConditionFromDB, selectLastIdFromTable } from '../db';

class TaskScreen extends Component {
    static navigationOptions = {
        title: 'Tarefas',
    };

    state = {
        tasks: [],
        error: '',
        loading: false,
        token: '',
        isConnected: false,
    };

    componentWillMount() {
        createTables();
        const isConnected = await NetInfo.isConnected.fetch();
        console.log('Internet connection: ' + (isConnected ? 'online' : 'offline'));
        this.setState({ isConnected });
    }

    componentDidMount() {
        if (this.state.isConnected) {
            AsyncStorage.getItem(AsyncStorageKeys.token, (err, tokenResult) => {
                this.setState({ error: '', loading: true, token: tokenResult });
                this.requestTasks(tokenResult);
            });
        } else {
            Alert.alert('Sem conexão', 'Não há conexão com a internet. Tente novamente mais tarde.');
            this.getTasksFromDB();

            //Example
            //this.selectAllTasksWithCondition(user);
        }
    }

    getTasksFromDB() {
        selectAllFromTable('task')
            .then((tasks) => {
                console.log("tasks: ", tasks);
                this.setState({ tasks: tasks });
            });
    }

    //Example
    selectAllTasksWithCondition(user) {
        const condition = 'employee_id=' + user.id;
        selectAllWithConditionFromDB('task', condition)
            .then((tasks) => {
                console.log('tasks: ', tasks);
            });
    }

    requestTasks(token) {
        this.setState({ error: '', loading: true });

        const url = Url.service.baseUrl + Url.service.path.tasks;

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

    onRequestSuccess(data) {
        console.log(data);
        this.setState({
            tasks: data,
            loading: false,
            error: '',
            token: '',
        });
        this.persistDataOnDB(data);

        //Example
        //this.persistDataOnDB2();
    }

    persistDataOnDB(data) {
        insertTask(data, 1, 0);
    }

    //Example
    persistDataOnDB2() {
        const { taskId, taskLocalId, status, workingHours, isSync } = this.state;
        const params = {
            task_id: taskId,
            task_id_local: taskLocalId,
            status: status,
            working_hours: parseFloat(workingHours).toFixed(2),
        };
        console.log(params);
        selectLastIdFromTable('task').then((result) => {
            if (taskLocalId) { //task edited
                params.id_local = taskLocalId;
                params.id = taskId;
                insertTask([params], isSync, 1);

            } else { //new task
                const id = result + 1;
                params.id = id;
                insertTask([params], 0, 0);
            }

            Alert.alert('Sucesso', 'Tarefa salva!');
        });
    }

    renderTasks() {
        const { tasks } = this.state;
        if (this.state.loading) {
            return <Spinner />;
        }

        if (tasks && tasks.length > 0) {
            return (
                <ScrollView>
                    {this.state.tasks.map(task =>
                        <TaskCard key={task.id} task={task} onPress={() => this.goTaskDetails(task)} />
                    )}
                </ScrollView>
            );

        } else {
            return <Text style={styles.feedbackText}>Toque em + para adicionar uma tarefa</Text>;
        }
    }

    goTaskDetails(task) {
        console.log(task);
        this.props.navigation.navigate('TaskDetails', {
            task: task,
            onGoBack: () => this.refreshScreen(),
        })
    }

    refreshScreen() {
        console.log('refreshScreen');
        this.requestTasks();
    }

    render() {
        const { navigate } = this.props.navigation;
        const { mainContainer } = styles;
        return (
            <View style={mainContainer}>
                <Header
                    title='Tarefas'
                    onPressRight={() => navigate('AddTask', {
                        token: token,
                    })}
                    hideRightIcon={false} />
                {this.renderTasks()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    feedbackText: {
        paddingTop: 150,
        alignSelf: 'center',
        color: Colors.textgray,
    },
});

export { TaskScreen };