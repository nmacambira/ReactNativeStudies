import React from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { DropdownButton } from '../components';

import Colors from '../constants/Colors';

class CustomPicker extends React.Component {
    state = { showPicker: false, };

    showPickerView() {
        const show = this.state.showPicker ? false : true;
        this.setState({ showPicker: show });
    }

    renderPickerItem(pickerItemLabel, pickerItemValue, objetcsMap) {
        return (
            <View>
                <Picker.Item label={pickerItemLabel} value={pickerItemValue} />
                {objetcsMap}
            </View>
        );

    }

    render() {
        const { pickerLabel, pickerItemLabel, pickerItemValue, objetcsMap, selectedValue, onValueChange } = this.props;
        const { dropdownlabelStyle, dropdownStyle } = styles;

        if (Platform.OS === 'ios') {
            return (
                <View>
                    <Text style={dropdownlabelStyle}>{pickerLabel}</Text>
                    <DropdownButton title={selectedValue} onPress={this.showPickerView.bind(this)} />
                    {this.state.showPickerView &&
                        <View style={dropdownStyle}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={onValueChange}>
                                {this.renderPickerItem(pickerItemLabel, pickerItemValue, objetcsMap)}
                            </Picker>
                        </View>
                    }
                </View>
            );

        } else {
            return (
                <View>
                    <Text style={dropdownlabelStyle}>{pickerLabel}</Text>
                    <View style={dropdownStyle}>
                        <Picker
                            mode="dropdown"
                            selectedValue={selectedValue}
                            onValueChange={onValueChange}>
                            {this.renderPickerItem(pickerItemLabel, pickerItemValue, objetcsMap)}
                        </Picker>
                    </View>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    dropdownStyle: {
        marginTop: 10,
        marginHorizontal: 18,
    },
    dropdownlabelStyle: {
        color: Colors.text,
        fontSize: 12,
        marginTop: 10,
        marginHorizontal: 18,
    },
});

export { CustomPicker };