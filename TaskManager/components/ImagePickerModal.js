import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';

const ImagePickerModal = ({ visible, onRequestClose, onPressImage, onPressCamera, onPressClose }) => {
    return (
        <Modal
            visible={visible}
            animationType={'fade'}
            onRequestClose={onRequestClose}
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.innerContainer}>
                    <Text style={{ color: Colors.text, marginVertical: 15 }}>Selecionar uma image da</Text>

                    <Button
                        color="black"
                        onPress={onPressImage}
                        title="Galeria de fotos"
                        textStyle={{ fontSize: 16 }}
                        transparent={true}
                    >
                    </Button>

                    <Button
                        color="black"
                        onPress={onPressCamera}
                        title="Câmera"
                        textStyle={{ fontSize: 16 }}
                        transparent={true}
                    >
                    </Button>

                    <Button
                        onPress={onPressClose}
                        title="Cancelar"
                        textStyle={{ fontWeight: "600", fontSize: 16 }}
                        color={Colors.navigationBar}
                        transparent={true}
                    >
                    </Button>

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
});

export { ImagePickerModal };