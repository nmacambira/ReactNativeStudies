import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Layout from '../constants/Layout';

const Banner = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Image source={props.imageSource} style={styles.image} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        backgroundColor: '#000',
    },
    image: {        
        flex: 1,
        resizeMode: 'stretch',
        width: null,
        height: null,
        //height: Layout.height / 4, //160
    },
});

export { Banner };