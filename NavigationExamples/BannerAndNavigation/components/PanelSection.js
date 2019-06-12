import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';

const PanelSection = ({ title, value, onChangeText, onPressAdd, onPressRemove }) => {
    const { container, labelStyle, addRemoveContainer, inputStyle } = styles;
    return (
        <View style={container}>
            <Text style={labelStyle}>{title}</Text>
            <View style={addRemoveContainer}>
            {/* onPress={() => console.log('remove') */}
                <Icon name='remove-circle' color={Colors.grayDark} onPress={onPressRemove} />
                <TextInput
                    style={inputStyle}
                    keyboardType='numeric'
                    placeholder='0.0'
                    value={value}
                    onChangeText={onChangeText}
                />
                <Icon name='add-circle' color={Colors.grayDark} onPress={onPressAdd} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
    },
    labelStyle: {
        flex: 3,
        paddingLeft: 10,
    },
    addRemoveContainer: {
        flex: 2,
        flexDirection: 'row',                
    },
    inputStyle: {
        flex: 1,
        color: '#000',
        fontSize: 12,
        marginRight: 5,
        marginLeft: 5,
        textAlign: 'center',
        borderColor: Colors.gray,
        borderWidth: 1,                
    },
});

export { PanelSection };