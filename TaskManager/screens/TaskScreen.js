import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, AsyncStorage, NetInfo } from 'react-native';
import { Spinner, Header, TaskCard } from '../components';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';

import { GetRequest, Url } from '../api';

import { createTables, selectAllFromTable, insertTask } from '../db';

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
        //createTables();
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
            //this.getTasksFromDB();
        }
    }

    getTasksFromDB() {
        selectAllFromTable('task')
            .then((tasks) => {
                //console.log("tasks: ", tasks);
                this.setState({ tasks: tasks });
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
        let sortData = sortTasks(data);
        console.log(sortData);
        this.setState({
            tasks: data,
            loading: false,
            error: '',
            token: '',
        });
        //this.persistDataOnDB(data);
    }

    sortTasks(data) {
        //Ordena primeiro por priority e segundo por due_date
        var sortData = data.slice(0); // use slice() to copy the array and not just make a reference
        sortData.sort(function (a, b) {
            const sortByDueDate = new Date(b.due_date) - new Date(a.due_date);
            return a.priority === b.priority ? sortByDueDate : a.priority - b.priority;
        });

        return sortData;
    }

    persistDataOnDB(data) {
        insertTask(data, 1, 0);
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