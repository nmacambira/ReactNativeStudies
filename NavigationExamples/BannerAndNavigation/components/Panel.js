import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const Panel = (props) => {
    const { container, title, card } = styles;
    return (
        <View style={container}>
            <Text style={title}>{props.title}</Text>                     
            <View style={card}>
                {props.children}
            </View>                     
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginBottom: 10,             
        //backgroundColor: '#abb',
    },    
    title:{        
        padding: 4,
        paddingBottom: 8,
        fontSize: 11,
        textAlign: 'center',
        color: Colors.white,
        width: 120,
        backgroundColor: Colors.grayDark,
        overflow:'hidden',
        borderRadius: 4,
        //flexWrap: 'wrap',        
    },
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
      }   
});

export { Panel };