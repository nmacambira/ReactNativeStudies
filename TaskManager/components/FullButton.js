import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FullButton = ({ onPress, children }) => {
    return (
        <View style={styles.containerStyle}>
            <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
                <Text style={styles.textStyle}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        //flex: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        height: 43,
        marginBottom: 10,
        marginTop: 10,
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#61AB46',
    },
    textStyle: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#fff',
    },
});

export { FullButton };