import { Component } from 'react';
import * as React from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ionicons';
import { Dimensions } from 'react-native';
import Axios from "axios";

const {width, height} = Dimensions.get('screen');

export default class PostingScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        data: [],
        dataimg: [],
        img: null,
        token: null,
        id: null,
        bio: '',
        };
    }

    async getData() {
        try {

            const value = await AsyncStorage.getItem('token');
            this.setState({ username: value });

            const response1 = await fetch('http://10.0.2.2:3000/image/'+this.state.username);
            const json1 = await response1.json();
            this.setState({ dataimg: json1.data });
            
            this.setState({ img:this.state.dataimg[0].image});
            
        } catch (error) {

            console.log(error);

        }
    }

    posting() {
        Axios.post(`http://10.0.2.2:3000/posts`,{
            post : this.state.bio,
            username : this.state.username
        }).then((response) => {
            this.props.navigation.navigate('Home');
        });
    }

    profile(username) {
        if (username == this.state.username) {
            this.props.navigation.navigate('Account');
        } else {
            this.props.navigation.navigate('OtherAccStack',{username:username});
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { data, img } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerPost}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={40} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerWrap}>
                        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                            <Image source={{uri:img}} style={styles.profileHeader}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ flex:1 }}>
                    <View style={{ justifyContent:'center', alignItems:'center' }}>
                        <View style={styles.textInputBio}>
                            <TextInput
                                multiline
                                numberOfLines={4}
                                textAlignVertical='top'
                                maxLength={250}
                                style={styles.inputBio}
                                onChangeText={(bio) => this.setState({bio})}
                                value={this.state.bio}
                                placeholder="Post"
                            />
                        </View>
                    </View>
                    <View style={{alignItems:'center'}}>
                    <TouchableOpacity 
                        onPress={() => this.posting()}
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
                            }}>Post</Text>
                        </View>
                    </TouchableOpacity>
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
    textInputBio: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 350,
        height: 90,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'center',
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
    header: {
        backgroundColor: '#2ECC71',  
        height:100,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    headerWrap: { 
        alignItems: 'center',
        flexDirection: 'row',
    },
    profileHeader: {
        width: 50, 
        height: 50, 
        marginRight: 30,
        borderRadius: 25,
    },
    headerPost: {
        marginLeft: 30,
    },
    textHeader: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
        marginLeft: 10,
    },
    box: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    dif: {
        marginTop: 10,
        borderWidth: 0.5,
        borderColor: '#fff',
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
    boxFooter: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxFooterContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    boxFooterText: {
        fontSize: 14,
        color: '#6A6868',
        fontFamily: 'Poppins-Regular',
    },
});