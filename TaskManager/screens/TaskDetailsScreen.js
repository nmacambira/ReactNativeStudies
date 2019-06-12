import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';


class TaskDetailsScreen extends Component {
    static navigationOptions = {
        title: 'Tarefa',
    };

    state = {
        task: null,
        error: '',
        loading: false,
    };

    componentWillMount() {
        const { params } = this.props.navigation.state;
        const task = params ? params.task : null;
        if (task) {
            this.setState({ task: task });
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        const { mainContainer, inputContainer } = styles;

        return (
            <View style={mainContainer}>
                <Header title='Tarefa' onPressLeft={() => goBack()} />
                <ScrollView keyboardDismissMode='on-drag'>
                    <View style={inputContainer}>
                        {/* WIP */}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export { TaskDetailsScreen };