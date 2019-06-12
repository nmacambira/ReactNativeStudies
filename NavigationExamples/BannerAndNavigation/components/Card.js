import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const Card = (props) => {
    const { card } = styles;
    return (
        <View style={card}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: Colors.grayLight,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginTop: -5,
        backgroundColor: Colors.white,
        marginBottom: 10,
    }
});

export { Card };