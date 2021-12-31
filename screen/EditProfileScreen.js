import { Component } from 'react';
import * as React from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "axios";
import Icon from 'react-native-ionicons';
import { Dimensions } from 'react-native';
import { response } from 'express';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ImagePicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('screen');

export default class EditProfileScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        data: [],
        dataimg: [],
        token: null,
        image: null,
        namaUser: '',
        bio: '',
        refreshing: false,
        };
    }

    async getData() {
        try {

            const value = await AsyncStorage.getItem('token');
            this.setState({ username: value });

            const response1 = await fetch('http://10.0.2.2:3000/profile/'+this.state.username);
            const json1 = await response1.json();
            this.setState({ dataimg: json1.data });

            this.setState({ image:this.state.dataimg[0].image});
            
        } catch (error) {

            console.log(error);

        }
    }

    register = () => {
        Axios.put(`http://10.0.2.2:3000/users/username`,{
            name : this.state.namaUser,
            image : this.state.image,
            bio : this.state.bio,
            username : this.state.username
        }).then((respons) => {
            console.log(respons);
        });
        this.props.navigation.goBack();
    };

    imagePicker = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          console.log(image);
          this.setState({image:image.path});
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { data,dataimg,image } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={30} color='#fff'/>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>Edit Profile</Text>
                </View>
                <ScrollView style={{ padding: 4 }} >
                    <View>
                        {
                            dataimg.map((item) => (

                                <View style={styles.profileContainer} key={item.username}>
                                    <Image source={{uri:image}} style={styles.profileHeader}/>
                                    <TouchableOpacity style={styles.btnPic} onPress={() => this.imagePicker()} >
                                        <Icon name = 'ios-camera' size={26}/>
                                        <Text style={styles.btnTextPic}>Upload Profile</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.profileText}>{item.username}</Text>
                                    <View style={styles.textInput}>
                                        <TextInput
                                            style={styles.input}
                                            onChangeText={(namaUser) => this.setState({namaUser})}
                                            value={this.state.namaUser}
                                            placeholder={item.name}
                                            />
                                    </View>
                                    <View style={styles.textInputBio}>
                                        <TextInput
                                            multiline
                                            numberOfLines={4}
                                            textAlignVertical='top'
                                            maxLength={100}
                                            style={styles.inputBio}
                                            onChangeText={(bio) => this.setState({bio})}
                                            value={this.state.bio}
                                            placeholder={item.bio}
                                        />
                                    </View>
                                    <TouchableOpacity 
                                    onPress={() => this.register()}
                                    style = {{
                                        borderRadius : 10,
                                        height : 50,
                                        width : 180,
                                        marginTop : 40,
                                        alignItems : 'center',
                                        justifyContent: 'center',
                                        backgroundColor : '#2ECC71'
                                    }}>
                                        <View style = {{flexDirection : 'row' , alignItems : 'center'}}>
                                            <Icon name = 'ios-create' size={26}/>
                                            <Text style = {{
                                                color : 'white',
                                                marginTop: 5,
                                                marginLeft : 20 ,
                                                fontSize : 20,
                                                fontFamily: 'Poppins-Regular',
                                            }}>Save</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
};


const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#2C3E50',
    },
    header: {
        justifyContent: 'space-between',
        alignItems:'center',
        height: 70,
        flexDirection: 'row',
        marginHorizontal:20,
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textHeader: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    profileText: {
        fontSize: 28,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        marginTop: 15,
    },
    profileTextusername: {
        fontSize:18,
        color: '#6A6868',
        fontFamily: 'Poppins-Regular',
    },
    profileTextbio: {
        fontSize:18,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        marginTop:10,
    },
    profileHeader: {
        width: 100, 
        height: 100,
        borderRadius: 50,
    },
    btnTextPic: {
        fontSize: 14,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
        marginLeft: 10,
    },
    btnPic: {
        borderWidth: 1,
        borderColor: '#2ECC71',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        width: 180,
        marginVertical:20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dif: {
        width:350,
        marginTop: 30,
        borderWidth: 0.5,
        borderColor: '#fff',
    },
    box: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    boxHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    boxHeaderImg: {
        width: 50, 
        height: 50,
        borderRadius: 25,
    },
    boxHeaderUsername: {
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
    },
    boxHeaderDate: {
        fontSize: 13,
        color: '#6A6868',
        fontFamily: 'Poppins-Regular',
    },
    boxPostText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    boxPost: {
        alignItems: 'center',
        marginVertical: 10, 
    },
    input: {
        height: 40,
        maxWidth:280,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
        borderRadius:10,
    },
    inputBio: {
        height: 90,
        maxWidth:280,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
        borderRadius:10,
        justifyContent: 'center',
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
    textInput: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 350,
        height: 50,
        flexDirection: 'row',
        marginTop: 30,
    },
});