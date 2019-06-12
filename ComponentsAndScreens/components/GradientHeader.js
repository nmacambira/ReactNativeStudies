import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import { Gradient } from './Gradient';
import Colors from '../constants/Colors';

const GradientHeader = ({ title, onPressLeft, onPressRight }) => {
    return (
        <Gradient>
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
                <Icon
                    name='heartbeat'
                    type='font-awesome'
                    color={'transparent'}
                    iconStyle={styles.iconStyle}
                    underlayColor='transparent'
                    onPress={onPressRight} />
            </View >
        </Gradient>
    );
};

const styles = {
    container: {
        backgroundColor: 'transparent',
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        //height: 64,
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

export { GradientHeader };