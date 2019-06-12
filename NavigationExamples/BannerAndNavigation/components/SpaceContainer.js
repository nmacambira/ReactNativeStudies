import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SpaceContainer = () => {
    return (
        <View style={styles.container}/>       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',        
        //backgroundColor: 'red',
    },  
});

export { SpaceContainer };