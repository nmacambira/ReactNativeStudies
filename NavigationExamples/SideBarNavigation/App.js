import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './navigation/RootNavigator';
import SideBarNavigator from './navigation/SideBarNavigator';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SideBarNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
