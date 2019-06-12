import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, CameraRoll } from 'react-native';
import { ImagePicker } from 'expo';
import { SingleButton, ImagePickerModal, Spinner } from '../components';


class CallImagePickerScreen extends Component {
    static navigationOptions = {
        title: 'ImagePicker',
    };

    state = {
        modalVisible: false,
        image: null,
        imageHeight: 0,
        imageWidth: 0,
        loadingImage: false,
        showImageMessage: false,
    };

    callImageModal() {
        Keyboard.dismiss();
        this.setState({ imageModalVisible: true });
    }

    closeImageModal() {
        this.setState({ imageModalVisible: false });
    }

    pickImage = async () => {
        this.closeImageModal();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
        });
        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri, showImageMessage: false });
        }
    };

    pickCamera = async () => {
        this.closeImageModal();
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [4, 3],
        });
        console.log(result);

        if (!result.cancelled) {
            let saveResult = await CameraRoll.saveToCameraRoll(result.uri, "photo");
            this.setState({ image: saveResult, showImageMessage: false });
        }
    };

    renderImage() {
        const { imageStyle } = styles;
        if (this.state.loadingImage) {
            return <Spinner style={{ marginTop: 10, }} size="small" />;
        } else {
            if (this.state.image) {
                return (
                    <Image
                        source={{ uri: this.state.image }}
                        style={[imageStyle, { width: this.state.imageWidth, height: this.state.imageHeight }]}
                        onLoad={() => {
                            Image.getSize(this.state.image, (width, height) => {
                                const ratio = height / width;
                                const widthAux = Layout.window.width - 40;
                                const heightAux = widthAux * ratio;
                                this.setState({ imageHeight: heightAux, imageWidth: widthAux, loadingImage: false });
                            });
                        }}
                    />
                );
            }
        }
    }

    render() {
        const { mainContainer, imageStyle } = styles;

        return (
            <View style={mainContainer}>
                <ImagePickerModal
                    visible={this.state.imageModalVisible}
                    onRequestClose={() => this.closeImageModal()}
                    onPressImage={() => this.pickImage()}
                    onPressCamera={() => this.pickCamera()}
                    onPressClose={() => this.closeImageModal()}
                />

                <View style={{ marginTop: 10 }}>
                    <SingleButton
                        title={this.state.image ? 'Imagem adicionada' : 'Adicionar imagem'}
                        iconName={this.state.image ? 'check-circle' : 'plus-circle'}
                        color={this.state.image ? Colors.button : Colors.navigationBar}
                        onPress={() => this.callImagePicker()}
                    />
                    {this.state.showImageMessage && <Text containerStyle={validationMessage}>Selecione uma imagem</Text>}

                    {this.renderImage()}

                    {/* {this.state.loadingImage && <Spinner style={{ marginTop: 10, }} size="small" />}
                    {this.state.image &&
                        <Image
                            source={{ uri: this.state.image }}
                            style={[imageStyle, { width: this.state.imageWidth, height: this.state.imageHeight }]}
                            onLoad={() => {
                                Image.getSize(this.state.image, (width, height) => {
                                    const ratio = height / width;
                                    const widthAux = Layout.window.width - 40;
                                    const heightAux = widthAux * ratio;
                                    this.setState({ imageHeight: heightAux, imageWidth: widthAux, loadingImage: false });
                                });
                            }}
                        />} */}
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageStyle: {
        marginTop: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: Colors.textgray,
        borderWidth: 1,
    },
});

export { CallImagePickerScreen };