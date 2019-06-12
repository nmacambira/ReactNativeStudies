import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout'

const BottomButton = ({ onPress, title }) => {
    return (
        <View style={styles.stickyBottom}>
            <Button backgroundColor={Colors.button} textStyle={{ fontWeight: "600", fontSize: 17 }} title={title} onPress={onPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    stickyBottom: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        width: Layout.window.width - 4,
    },
});

export { BottomButton };