import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import RootNavigator from './navigation/RootNavigator';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <RootNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3647A0',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default App;