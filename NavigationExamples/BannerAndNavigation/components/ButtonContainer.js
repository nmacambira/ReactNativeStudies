import React from 'react';
import { View, StyleSheet } from 'react-native';

const ButtonContainer = (props) => {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {                                
        justifyContent: "space-between",  
        flexDirection: 'row',
        flexWrap: 'wrap',       
        paddingBottom: 10,        
        //backgroundColor: 'red',       
    },
});

export { ButtonContainer };