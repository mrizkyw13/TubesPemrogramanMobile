import { Component } from 'react';
import * as React from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ionicons';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class PostEditScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        data: [],
        dataimg: [],
        token: null,
        refreshing: false,
        };
    }

    async getData() {
        this.setState({ refreshing:true })
        try {

            const value = await AsyncStorage.getItem('token');
            this.setState({ username: value });
            const response = await fetch('http://10.0.2.2:3000/posts/username/'+this.state.username);
            const json = await response.json();
            this.setState({ data: json.data });

            const response1 = await fetch('http://10.0.2.2:3000/profile/'+this.state.username);
            const json1 = await response1.json();
            this.setState({ dataimg: json1.data });
            
        } catch (error) {

            console.log(error);

        }finally {

            this.setState({ refreshing:false })

        }
    }

    post(username,postId) {
        if (username == this.state.username) {
            this.props.navigation.navigate('PostEditStack',{itemId:postId});
        } else {
            this.props.navigation.navigate('PostStack',{itemId:postId});
        }
    }

    async logout() {
        try {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('LoginStack');
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { data,dataimg } = this.state;
        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Profile</Text>
                </View>
                <ScrollView style={{ padding: 4 }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.getData()} />
                    }>
                    <View>
                        {
                            dataimg.map((item) => (

                                <View style={styles.profileContainer} key={item.username}>
                                    <Image source={{uri:item.image}} style={styles.profileHeader}/>
                                    <Text style={styles.profileText}>{item.name}</Text>
                                    <Text style={styles.profileTextusername}>{item.username}</Text>
                                    <Text style={styles.profileTextbio}>{item.bio}</Text>
                                    <View style={styles.footer}>
                                        <TouchableOpacity onPress={() => this.logout()}>
                                            <View style={styles.btnPic}>
                                                <Text style={styles.btnTextPic}>Logout</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => navigation.navigate('EditProfileStack')}>
                                            <View style={styles.btnPic} >
                                                <Text style={styles.btnTextPic}>Edit Profile</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.dif}/>
                                </View>
                            ))
                        }
                    </View>
                    <View style={{ padding: 4 }}>
                        {
                            data.map((item) => (
                                <View style={styles.box} key={item.postId}>
                                    <View style={styles.boxHeader}>
                                        <View style={{flexDirection:'row'}}>
                                            <View>
                                                <Image source={{uri:item.image}} style={styles.boxHeaderImg}/>
                                            </View>
                                            <View style={{marginLeft: 10}}>
                                                <Text style={styles.boxHeaderUsername}>{item.username}</Text>
                                                <Text style={styles.boxHeaderDate}>{item.post_date}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => this.post(item.username, item.postId)} >
                                        <View style={styles.boxPost}>
                                            <Text style={styles.boxPostText}>{item.post}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.dif}/>
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
        justifyContent: 'center',
        alignItems:'center',
        height: 70,
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
    },
    btnPic: {
        borderWidth: 1,
        borderColor: '#2ECC71',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        width: 150,
        marginHorizontal:10
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
    footer: {
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginTop: 20,
    },
});