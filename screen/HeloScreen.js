import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-ionicons';

export const HeloScreen = ({ navigation }) => {

    return (
        <View style={Styles.container}>
            <View style={Styles.header}>
                <Image source={require('../images/banner1.png')} style={Styles.images} />
            </View>
            <View style={Styles.footer}>
                <View>
                    <Text style={Styles.footerTextHeader}>Welcome to Bumble</Text>
                    <Text style={Styles.footerText}>Stay connected with everyone!</Text>
                    <Text style={Styles.footerText}>Sign in with account</Text>
                </View>
                <TouchableOpacity style={Styles.btn} onPress={() => navigation.navigate('LoginStack')}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={Styles.btnText}>Sign In</Text>
                        <Icon name="arrow-forward" color='#2C3E50' size={23} style={{paddingLeft: 10}}></Icon>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
    
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ECC71',
    },
    header: {
        flex: 3,
        backgroundColor: '#2ECC71',
        paddingHorizontal: 30,
        paddingBottom: 50,
        alignItems: 'center',
    },
    footer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#2C3E50',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    images: {
        resizeMode: 'contain',
        width: 300,
    },
    footerTextHeader: {
        fontSize: 32,
        color: '#2ECC71',
        fontFamily: 'Poppins-Bold',
    },
    footerText: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Light',
    },
    btn: {
        backgroundColor: '#2ECC71',
        borderRadius: 20,
        alignItems: 'center',
        paddingVertical: 8,
    },
    btnText: {
        fontSize: 20,
        color: '#2C3E50',
        fontFamily: 'Poppins-Regular',
    },
})