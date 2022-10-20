import React from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import styles from './styles';


export default function HomeScreen(props) {

    console.log('HomeScreenprops', props);

    const onLogoutPress = () => {
        auth()
        .signOut()
        .then(() => console.log('User signed out!'));
        props.navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Hi {props.extraData?.fullName}!</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={onLogoutPress}>
                <Text style={styles.buttonTitle}>Sign out</Text>
            </TouchableOpacity>                
        </View>
    )
}