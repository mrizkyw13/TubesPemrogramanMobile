import * as React from 'react';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SplashScreen = ({ navigation }) => {
    
    
    const tokenlogin = async() => {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            navigation.navigate('HomeStack')
        }else {
            setTimeout(() => {
                navigation.replace('HeloStack');
            }, 4000);
        }
    }

    tokenlogin()

    return (
        <ImageBackground source={require('../images/Splash2.png')} style={{flex:1}}/>
    )
}