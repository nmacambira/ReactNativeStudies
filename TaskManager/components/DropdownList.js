import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements';
import { DropdownButton } from './DropdownButton';
import Colors from '../constants/Colors';

class DropdownList extends React.Component {
    state = { showList: false, title: '' };

    onPress(item) {
        this.setState({ title: item.key, showList: false });
    }

    showList() {
        const show = this.state.showList ? false : true;
        this.setState({ showList: show });
    }

    render() {
        const { label, data, textStyle } = this.props;
        const { rowStyle, labelStyle, container, touchableStyle, itemStyle } = styles;
        return (
            <View>
                <DropdownButton title={this.state.title === '' ? label : this.state.title} onPress={this.showList.bind(this)} />
                {/* {this.state.showList &&
                    <View style={container}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={() => this.onPress(item)}>
                                    <View style={touchableStyle}>
                                        <Text style={itemStyle}>{item.key}</Text>
                                    </View>
                                </TouchableOpacity>
                            }
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                } */}
            </View >
        );
    }
};

const styles = StyleSheet.create({
    rowStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    labelStyle: {
        color: Colors.text,
        fontWeight: "600",
        fontSize: 15,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'grey',
        shadowOffset: { height: 1, width: 1 },
        elevation: 2,
        marginHorizontal: 18,
        marginTop: 8,
        // marginTop: 35,
        // position: 'absolute',
    },
    touchableStyle: {
        borderBottomColor: Colors.background,
        borderBottomWidth: 1,
        marginHorizontal: 8,
    },
    itemStyle: {
        padding: 8,
        fontSize: 16,
    },
});

export { DropdownList };