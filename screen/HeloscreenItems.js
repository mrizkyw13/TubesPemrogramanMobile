import * as React from 'react';
import { View, Text, Button, Image, useWindowDimensions, StyleSheet } from 'react-native';

export default HeloScreenItems = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={Styles.container, { width }}>
            <Image source={item.banner} style={Styles.images, { width }} />
            <View style={Styles.footer} >
                <Text style={Styles.footerTextHeader}>{item.judul}</Text>
                <Text style={Styles.footerText}>{item.deskripsi}</Text>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ECC71',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        flex: 3,
        backgroundColor: '#2ECC71',
        paddingHorizontal: 30,
        paddingBottom: 50,
        alignItems: 'center',
    },
    footer: {
        flex: 0.3,
        backgroundColor: '#2C3E50',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 30
    },
    images: {
        resizeMode: 'contain',
        flex: 0.7,
        justifyContent: 'center'
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
})
