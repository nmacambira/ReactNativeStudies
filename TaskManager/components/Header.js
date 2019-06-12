import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';

const Header = ({ title, onPressLeft, onPressRight, hideRightIcon }) => {
    return (
        <View style={styles.container}>
            <Icon
                name='chevron-left'
                type='feather'
                size={30}
                color={Colors.tintColor}
                iconStyle={styles.iconStyle}
                underlayColor='transparent'
                onPress={onPressLeft} />
            <Text style={styles.textStyle}>{title}</Text>
            <View style={{ display: hideRightIcon ? 'none' : 'flex' }}>
                <Icon
                    name='plus'
                    type='font-awesome'
                    color={'transparent'}
                    iconStyle={styles.iconStyle}
                    underlayColor='transparent'
                    onPress={onPressRight} />
                {/* <Text style={textStyle}>{text}</Text> */}
            </View>
        </View >
    );
};

const styles = {
    container: {
        backgroundColor: Colors.navigationBar,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 64,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    },
    textStyle: {
        color: Colors.tintColor,
        fontSize: 17,
        fontWeight: '600',
    },
    iconStyle: {
        padding: 10,
        paddingLeft: 0,
    },
};

export { Header };