import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Colors from '../constants/Colors';

const CheckBoxCustom = ({ title, titleCheck1, titleCheck2, iconType, checkedIcon, uncheckedIcon, checkedColor, checked, onPress }) => {
    return (
        <View style={styles.rowStyle}>
            <Text style={styles.textStyle}>{title}</Text>
            <CheckBox
                title={titleCheck1}
                textStyle={styles.textStyle}
                iconType={iconType}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                checkedColor={checkedColor}
                checked={checked}
                size={27}
                containerStyle={styles.containerStyle}
                onPress={onPress}
            />
            <CheckBox
                title={titleCheck2}
                textStyle={styles.textStyle}
                iconType={iconType}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                checkedColor={checkedColor}
                checked={!checked}
                size={27}
                containerStyle={styles.containerStyle}
                onPress={onPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    rowStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginTop: 10,
    },
    textStyle: {
        fontSize: 17,
        color: Colors.text,
        fontWeight: "500",
    },
    containerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0
    },
});

export { CheckBoxCustom };