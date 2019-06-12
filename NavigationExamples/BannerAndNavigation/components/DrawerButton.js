import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const DrawerButton = ({ navigation }) => (
    <Icon    
        color='#FFF'
        backgroundColor='#00aced'
        icon={{name: 'menu', color: 'black'}}
        title=''    
        onPress={() => navigation.navigate('DrawerToggle')}
    />
);

DrawerButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton;