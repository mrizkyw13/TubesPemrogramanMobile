import { Component } from 'react';
import * as React from 'react';
import { View, Text, RefreshControl, TouchableOpacity, StyleSheet, ScrollView, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ionicons';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class PostScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        data: [],
        dataimg: [],
        img: null,
        token: null,
        id: null,
        post: null,
        };
    }

    async getData() {
        try {
            const { route } = this.props;
            const { itemId } = route.params;
            this.setState({ id:itemId });

            const value = await AsyncStorage.getItem('token');
            this.setState({ username: value });
            const response = await fetch('http://10.0.2.2:3000/posts/id/'+this.state.id);
            const json = await response.json();
            this.setState({ data: json.data });

            const response1 = await fetch('http://10.0.2.2:3000/image/'+this.state.username);
            const json1 = await response1.json();
            this.setState({ dataimg: json1.data });
            
            this.setState({ img:this.state.dataimg[0].image});
            
        } catch (error) {

            console.log(error);

        }
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
        const { navigation,route } = this.props;
        const { itemId } = route.params;

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
                <ScrollView>
                    <View style={{ padding: 4 }}>
                        {
                            data.map((item) => (
                                <View style={styles.box} key={item.postId}>
                                    <View style={styles.boxHeader}>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity onPress={() => this.profile(item.username)} >
                                                <View>
                                                    <Image source={{uri:item.image}} style={styles.boxHeaderImg}/>
                                                </View>
                                            </TouchableOpacity>
                                                <View style={{marginLeft: 10}}>
                                                    <TouchableOpacity onPress={() => this.profile(item.username)} >
                                                        <Text style={styles.boxHeaderUsername}>{item.username}</Text>
                                                    </TouchableOpacity>
                                                    <Text style={styles.boxHeaderDate}>{item.post_date}</Text>
                                                </View>
                                            </View>
                                    </View>
                                    <View style={styles.boxPost}>
                                        <Text style={styles.boxPostText}>{item.post}</Text>
                                    </View>

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