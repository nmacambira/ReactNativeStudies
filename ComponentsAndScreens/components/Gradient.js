import React from 'react';
import { LinearGradient } from 'expo';
import Colors from '../constants/Colors';

const Gradient = ({ children }) => {
    return (
        <LinearGradient
            colors={[Colors.lightGreen, Colors.green]}
            start={[0, 0.4]}
            style={styles.gradient}>
            {children}
        </LinearGradient>
    );
};

const styles = {
    gradient: {
        height: 64,
    },
};

export { Gradient };

//EXAMPLE
//RootNavigation.js
// import { StackNavigator, Header } from 'react-navigation';
// import { Gradient } from '../components';

// // Default config for DrawerStack screens
// navigationOptions: ({ navigation }) => ({
//     header: (props) => <Gradient><Header {...props} /></Gradient>,
//     headerStyle: { backgroundColor: 'transparent' },
//     headerTintColor: Colors.tintColor,
//     gesturesEnabled: false,
//     headerLeft: drawerButton(navigation),
//     headerRight: drawerButtonRight(),
//   })