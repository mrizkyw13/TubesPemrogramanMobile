import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ionicons';
import { Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { response } from 'express';
import Axios from "axios";
import { Colors } from 'react-native/Libraries/NewAppScreen';

const {width, height} = Dimensions.get('screen');

const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
        stateUpdater(null)
    }, 3000);
}

const NextRegisScreen = ({ route, navigation }) => {

    const { sendUsername, sendPassword } = route.params;
    const [Name, onChangeName] = React.useState(null);
    const [Bio, onChangeBio] = React.useState(null);
    const [Err, onChangeError] = React.useState(null);
    const [Image,setImage] = useState('https://pbs.twimg.com/media/BtFUrp6CEAEmsml?format=jpg&name=small')
    
    const imgDefault = '../images/user.png';

    const signUp = async () => {

        if (Name == null || Bio == null ){
            // Alert.alert('Warning','Masukan data dengan benar')
            updateError('Your form is Blank', onChangeError)
        } else {
            try {
                Axios.post("http://10.0.2.2:3000/register",{
                    Username : sendUsername,
                    Password : sendPassword,
                    Name : Name,
                    Image : Image,
                    Bio : Bio,
                }).then((response) => {
                    console.log(response);
                });
                await AsyncStorage.setItem('token', sendUsername)
                navigation.navigate('HomeStack')
            } catch (error) {
                console.error();
            }
        }
    }

    const imagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setImage(image.path);
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{height:(height-80),justifyContent: 'space-between'}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" color='#fff' size={23} style={{paddingLeft: 20}}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.topMain}>
                        <View>
                            <ImageBackground source={{uri : Image}} style={styles.profilePic} imageStyle = {{borderRadius : 50}}/>
                        </View>
                        <Text style={styles.btnTextUsername}>{(sendUsername)}</Text>
                        <TouchableOpacity style={styles.btnPic} onPress={() => imagePicker()}>
                            <Text style={styles.btnTextPic}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                    {Err ? <Text style={styles.error}>{Err}</Text> : null}
                    <View style={styles.textInput}>
                        <Icon name="person" color='#2C3E50' style={{paddingHorizontal: 15}}></Icon>
                        <TextInput
                        style={styles.input}
                        value={Name}
                        onChangeText={onChangeName}
                        placeholder= {'Name'}
                        />
                    </View>
                    <View style={styles.textInputBio}>
                        <Icon name="create" color='#2C3E50' style={{paddingHorizontal: 15, paddingTop: 5,}}></Icon>
                        <View>
                            <TextInput
                            multiline
                            numberOfLines={4}
                            textAlignVertical='top'
                            maxLength={100}
                            style={styles.inputBio}
                            value={Bio}
                            onChangeText={onChangeBio}
                            placeholder= {'Bio'}
                            />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => signUp()}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign Up</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.textFooter}>Powered by AVD Team</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default NextRegisScreen;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#2C3E50',
    },
    wrapContainer: {
        justifyContent: 'center',
    },
    headerContainer: {
        height: 70,
        backgroundColor: '#2C3E50',
        justifyContent: 'center',
    },
    footerContainer: {
        height: 70,
        backgroundColor: '#2C3E50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        alignItems: 'center',
    },
    textFooter: {
        marginTop: 10,
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    error: {
        marginTop: 20,
        fontSize: 14,
        color: 'red',
        fontFamily: 'Poppins-Regular',
    },
    input: {
        height: 40,
        maxWidth:280,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
    },
    inputBio: {
        height: 90,
        maxWidth:280,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
    },
    topMain: {
        alignItems: 'center',
        width: 350,
    },
    textInput: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 350,
        height: 50,
        flexDirection: 'row',
        marginTop: 30,
    },
    textInputBio: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 350,
        height: 90,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: '#2ECC71',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        width: 350,
        marginTop: 30,
    },
    btnPic: {
        borderWidth: 1,
        borderColor: '#2ECC71',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        width: 150,
        marginTop: 10,
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    profilePic: {
        width: 100,
        height: 100,
    },
    btnTextUsername: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        marginTop: 10,
    },
    btnTextPic: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
})