import React from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Avatar } from 'react-native-elements';
import Colors from '../constants/Colors';
import AsyncStorageKeys from '../constants/AsyncStorageKeys';
import Url from '../constants/Url';

class DrawerContainer extends React.Component {
    state = { userName: '', image: null, }

    componentWillMount() {
        AsyncStorage.getItem(AsyncStorageKeys.user, (err, result) => {
            const user = JSON.parse(result);
            this.setState({ userName: user.full_name });
            if (user.photo_image) {
                const uri = __DEV__ ? Url.service.baseUrl + user.photo_image : user.photo_image;
                // const uri = user.photo_image;
                // const uri = Url.service.baseUrl + user.photo_image;
                this.setState({ image: uri });
            }
        });
    }

    logout = () => {
        const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'Login' })]
        });

        const keys = [AsyncStorageKeys.token, AsyncStorageKeys.user];
        AsyncStorage.multiRemove(keys, (err) => {
            this.props.navigation.dispatch(actionToDispatch);
        });
    };

    renderAvatarButton() {
        const { image } = this.state;
        if (image) {
            return (
                <Avatar
                    medium
                    rounded
                    source={{ uri: image }}
                    activeOpacity={0.7}
                    containerStyle={{ alignSelf: 'center', backgroundColor: 'white' }}
                />
            );
        } else {
            return (
                <Avatar
                    medium
                    rounded
                    icon={{ name: 'user', type: 'font-awesome', size: 35, color: Colors.navigationBar }}
                    activeOpacity={0.7}
                    containerStyle={{ alignSelf: 'center', backgroundColor: 'white' }}
                />
            );
        }
    }

    render() {
        const { navigation } = this.props;
        const { container, userContainer, avatarContainer, profileContainer, username, profile, drawerItem } = styles;
        return (
            <ScrollView>
                <View style={container}>
                    <View style={userContainer}>
                        <View style={avatarContainer}>
                            {this.renderAvatarButton()}
                        </View>
                        <View style={profileContainer}>
                            <Text style={username} numberOfLines={2} ellipsizeMode={'tail'}>{this.state.userName}</Text>
                            <Text style={profile} onPress={() => navigation.navigate('Profile')}>PROFILE</Text>
                        </View>
                    </View>
                    <Text onPress={() => navigation.navigate('Home')} style={styles.drawerItem}>
                        Home
                    </Text>
                    <Text onPress={() => navigation.navigate('Contact')} style={styles.drawerItem}>
                        Contact
                    </Text>
                    <Text onPress={() => navigation.navigate('Settings')} style={styles.drawerItem}>
                        Settings
                    </Text>
                    <Text onPress={this.logout} style={styles.drawerItem}>
                        Logout
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingHorizontal: 2,
    },
    userContainer: {
        backgroundColor: Colors.navigationBar,
        height: 80,
        flexDirection: "row",
        alignItems: 'center',
        marginTop: -10,
        marginHorizontal: -2,
    },
    avatarContainer: {
        flex: 0.3,
    },
    profileContainer: {
        flex: 0.7,
    },
    username: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.tintColor,
    },
    profile: {
        color: Colors.tintColor,
        marginTop: 5,
    },
    drawerItem: {
        fontSize: 16,
        color: Colors.text,
        padding: 5,
        margin: 5,
        textAlign: 'left',
        // fontWeight: '500',
    }
});

export default DrawerContainer;