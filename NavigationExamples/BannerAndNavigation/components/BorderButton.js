import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

class BorderButton extends Component {
    // constructor() {
    //     super();        
    // }
    state = { buttonPressed: false };

    _onButtonPressed() {
        this.setState({ buttonPressed: !this.state.buttonPressed });
    }
    
    render() {
        const { buttonStyle, textStyle, textStylePressed, buttonStylePressed } = styles;
        const { onPress, children } = this.props;

        // style={this.state.buttonPressed ? buttonStylePressed : buttonStyle}
        //style={[buttonStyle, this.state.buttonPressed && buttonStylePressed]}

        //style={this.state.buttonPressed ? textStylePressed : textStyle}
        //style={[textStylePressed, this.state.buttonPressed && textStyle]}
        return (
            <TouchableOpacity onPress={onPress} style={this.state.buttonPressed ? buttonStylePressed : buttonStyle} onPressIn={this._onButtonPressed.bind(this)}>           
                <Text style={this.state.buttonPressed ? textStylePressed : textStyle}>
                    {children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',        
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 13,
        color: Colors.gray,
    },
    textStylePressed: {
        alignSelf: 'center',        
        paddingTop: 8,
        paddingBottom: 8,
        fontSize: 13,        
        color: Colors.blue,        
    },
    buttonStyle: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,               
        borderColor: Colors.gray,
    },
    buttonStylePressed: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,        
        borderColor: Colors.blue,        
    },
});

export { BorderButton };