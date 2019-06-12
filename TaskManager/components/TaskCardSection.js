import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';


const TaskCardSection = ({ label, text, hidden, style }) => {
    const { container, labelStyle, textStyle } = styles;
    return (
        <View style={[container, {
            display: hidden ? 'none' : 'flex'
        }]}>
            <Text style={[labelStyle, style]}>{label}</Text>
            <Text style={[textStyle, style]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        marginBottom: 3,
    },
    labelStyle: {
        color: Colors.textgray,
        fontSize: 12,
    },
    textStyle: {
        marginTop: 2,
        fontSize: 17,
    },
});

export { TaskCardSection };