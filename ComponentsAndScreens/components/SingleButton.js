import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const SingleButton = ({ title, onPress, containerStyle, iconName, color }) => {
    const { rowStyle, buttonContainer } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={[buttonContainer, containerStyle]}>
            <View style={rowStyle}>
                <Text style={{ color: color, fontWeight: '600', textAlign: 'left' }}>{title}</Text>
                <Icon
                    name={iconName}
                    type='material-community'
                    color={color}
                    iconStyle={{ padding: 10 }}
                    underlayColor='transparent'
                />
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        alignSelf: 'stretch',
        marginTop: 8,
        marginHorizontal: 16,
    },
    rowStyle: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingLeft: 16,
    },
});

export { SingleButton };