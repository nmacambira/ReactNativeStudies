import React, { Component } from 'react';
import { View, Text, StyleSheet, DatePickerAndroid, TouchableOpacity, Platform, Alert } from 'react-native';
import { DatePickeriOSModal, CheckBoxCustom } from '../components';


class ShowDatePickerScreen extends Component {
    static navigationOptions = {
        title: 'DatePicker',
    };

    state = {
        modalVisible: false,
        checked: false,

        dateFormatted: new Date().toLocaleDateString("pt-BR"),
        date: new Date(),
    };

    showDatePicker() {
        if (Platform.OS === 'ios') {
            console.log('renderiOSDatePicker')
            this.openDatePickeriOSModal();
        } else {
            console.log('renderAndroidDatePicker')
            this.renderAndroidDatePicker();
        }
    }

    openDatePickeriOSModal() {
        this.setState({ modalVisible: true });
    }

    closeDatePickeriOSModal() {
        this.setState({ modalVisible: false });
    }

    selectDatePickeriOSDate() {
        this.setState({
            modalVisible: false,
            dateFormatted: this.state.date.toLocaleDateString("pt-BR")
        });
    }

    async renderAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                this.setState({ dateFormatted: date.toLocaleDateString("pt-BR"), date: date });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    showAlert() {
        Alert.alert(
            'Atenção',
            'Pergunta', [

                { text: 'Não', onPress: () => this.noPressed() },
                { text: 'Sim', onPress: () => this.yesPressed() },
            ],
            { cancelable: false }
        )
    }

    noPressed() {
        console.log('noPressed: ');
        this.props.navigation.goBack();
    }

    yesPressed() {
        console.log('yesPressed: ');
    }

    checkBoxPress() {
        this.setState({ checked: !this.state.checked });
    }

    render() {
        const { mainContainer, dateStyle, viewTextStyle } = styles;

        return (
            <View style={mainContainer}>
                <DatePickeriOSModal
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.closeDatePickeriOSModal()}
                    onPressCancel={() => this.closeDatePickeriOSModal()}
                    onPressSelect={() => this.selectDatePickeriOSDate()}
                    date={this.state.date}
                    onDateChange={(date) => this.setState({ date })}
                    mode='date'
                />

                <TouchableOpacity onPress={this.showDatePicker.bind(this)}>
                    <View style={viewTextStyle}>
                        <Text style={dateStyle}>{this.state.dateFormatted}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.showAlert.bind(this)}>
                    <View style={viewTextStyle}>
                        <Text style={dateStyle}>Show alert</Text>
                    </View>
                </TouchableOpacity>

                <CheckBoxCustom
                    title='Adicionar livro'
                    titleCheck1='Sim'
                    titleCheck2='Não'
                    iconType='material-community'
                    checkedIcon='check-circle'
                    uncheckedIcon='checkbox-blank-circle-outline'
                    checkedColor={Colors.button}
                    checked={this.state.checked}
                    onPress={this.checkBoxPress.bind(this)}
                />

                <View style={{ marginTop: 10 }}>
                    <SingleButton
                        title={this.state.image ? 'Imagem adicionada' : 'Adicionar imagem'}
                        iconName={this.state.image ? 'check-circle' : 'plus-circle'}
                        color={this.state.image ? Colors.button : Colors.navigationBar}
                        onPress={() => this.callImagePicker()}
                    />
                    {this.state.showImageMessage && <Text containerStyle={validationMessage}>Escolha uma imagem</Text>}

                    {this.state.loadingImage && <Spinner style={{ marginTop: 10, }} size="small" />}

                    {this.state.image &&
                        <Image
                            source={{ uri: this.state.image }}
                            style={[imageStyle, { width: this.state.imageWidth, height: this.state.imageHeight }]}
                            onLoad={() => {
                                Image.getSize(this.state.image, (width, height) => {
                                    const ratio = height / width;
                                    const widthAux = Layout.window.width - 33;
                                    const heightAux = widthAux * ratio;
                                    this.setState({ imageHeight: heightAux, imageWidth: widthAux, loadingImage: false });
                                });
                            }}
                        />}
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
    dateStyle: {
        color: Colors.text,
        fontSize: 17,
        marginTop: 10,
    },
    viewTextStyle: {
        borderBottomColor: Colors.textplaceholder,
        borderBottomWidth: 1,
        marginLeft: 18,
        paddingBottom: 3,
    }
});

export { ShowDatePickerScreen };