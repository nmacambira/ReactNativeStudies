import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { Card, CardSection } from './index';
import Colors from '../constants/Colors';

const ObjectDetails = ({ onPress, imageSource, name, price }) => {
    //const ObjectDetails = ({ object, imageSource }) => {
    //const { thumbnail_image, name, price } = object; // ajustar itens de acordo com o json

    const { container, thumbnailContainerStyle, thumbnailStyle, headerContentStyle, headerTextStyle, priceTextStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={container}>
            <Card>
                <CardSection>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={thumbnailStyle}
                            source={imageSource}
                        //source={{ uri: thumbnail_image }}
                        />
                    </View>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{name}}</Text>
                        <Text style={priceTextStyle}>{price}</Text>
                    </View>
                </CardSection>
            </Card>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 6,
        marginLeft: 10,
        marginRight: 10,
    },
    thumbnailStyle: {
        height: 40,
        width: 40
    },
    headerContentStyle: {
        flexDirection: 'column',
    },
    headerTextStyle: {
        fontSize: 12,
        color: Colors.grayDark
    },
    priceTextStyle: {
        fontSize: 20,
        color: Colors.grayDark
    },
});

export { ObjectDetails };