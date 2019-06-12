import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from './Card';
import { TaskCardSection } from './TaskCardSection';
import * as Utils from '../utils/utils';

const TaskCard = ({ onPress, task }) => {
    const { project_title, title, priority, due_date, working_hours, status } = task;
    const { container, statusStyle, infoContentStyle, priorityStyle, titleStyle, rowStyle } = styles;
    const statusData = Utils.renderStatus(status);
    const priorityData = Utils.renderPriority(priority);
    return (
        <TouchableOpacity onPress={onPress}>
            <Card>
                <View style={container}>
                    <View style={[statusStyle, { backgroundColor: statusData.color }]} />
                    <View style={infoContentStyle}>
                        <Text style={priorityStyle}>{priorityData}</Text>
                        <View>
                            <TaskCardSection label='' text={title} style={titleStyle} />
                        </View>
                        <View>
                            <TaskCardSection label='Projeto' text={project_title} />
                        </View>
                        <View style={rowStyle}>
                            <TaskCardSection label='Data limite:' text={Utils.formatDate(due_date)} />
                            <TaskCardSection label='Horas trabalhadas:' text={working_hours} />
                        </View>
                        <View>
                            <TaskCardSection label='Status' text={statusData.string} />
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
    },
    statusStyle: {
        width: 6,
        left: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
    },
    infoContentStyle: {
        flex: 1,
        margin: 10,
        marginLeft: 16,
    },
    priorityStyle: {
        fontSize: 26,
        fontWeight: '500',
        marginBottom: 10,
    },
    titleStyle: {
        fontWeight: '600',
    },
    rowStyle: {
        flexDirection: "row",
        justifyContent: 'flex-start',
    }
});

export { TaskCard };