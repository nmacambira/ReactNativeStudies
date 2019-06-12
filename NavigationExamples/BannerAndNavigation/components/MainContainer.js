import React from 'react';
import { View, StyleSheet } from 'react-native';

const MainContainer = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        padding: 16,        
    },
});

export { MainContainer };