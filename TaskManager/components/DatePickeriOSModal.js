import React from 'react';
import { View, Text, StyleSheet, Modal, DatePickerIOS } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const DatePickeriOSModal = ({ visible, onRequestClose, date, onDateChange, mode, onPressCancel, onPressSelect }) => {
    return (
        <Modal
            visible={visible}
            animationType={'fade'}
            onRequestClose={onRequestClose}
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <View style={{ height: 300, }}>
                        <Text style={styles.titleStyle}> Selecione uma data</Text>

                        <DatePickerIOS
                            date={date}
                            onDateChange={onDateChange}
                            mode={mode}
                        />

                        <View style={styles.rowStyle}>
                            <Button
                                color={Colors.navigationBar}
                                onPress={onPressCancel}
                                title="Cancelar"
                                textStyle={{ fontWeight: "600", fontSize: 16 }}
                                transparent={true}
                                buttonStyle={styles.rowItemStyle}
                            >
                            </Button>

                            <Button
                                color={Colors.navigationBar}
                                onPress={onPressSelect}
                                title="Selecionar"
                                textStyle={{ fontSize: 16 }}
                                transparent={true}
                                buttonStyle={styles.rowItemStyle}
                            >
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        shadowOpacity: 0.75,
        shadowRadius: 100,
        shadowColor: 'black',
        shadowOffset: { height: 0, width: 0 },
        elevation: 2,
        marginHorizontal: 30,
        borderRadius: 15,
    },
    titleStyle: {
        color: Colors.text,
        marginTop: 15,
        textAlign: 'center',
    },
    rowStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    rowItemStyle: {
        flex: 0.5,
        alignSelf: 'stretch',
    },
});

export { DatePickeriOSModal };