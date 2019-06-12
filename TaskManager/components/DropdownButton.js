import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

class DropdownButton extends React.Component {
    render() {
        const { title, onPress, textStyle } = this.props;
        const { rowStyle, labelStyle } = styles;
        return (
            <View>
                <TouchableOpacity onPress={onPress} >
                    <View style={rowStyle}>
                        <Text style={[labelStyle, textStyle]}>
                            {title}
                        </Text>
                        {/* <Icon name='arrow-drop-down' color={Colors.text} size={30} /> */}
                    </View>
                </TouchableOpacity>
            </View >
        );
    }
};

const styles = StyleSheet.create({
    rowStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    labelStyle: {
        color: Colors.text,
        fontWeight: "600",
        fontSize: 15,
    },
});

export { DropdownButton };