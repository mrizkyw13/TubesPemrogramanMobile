import { Component } from 'react';
import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-ionicons';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen');

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
        data: [],
        token: null,
        isShowingText: true,
        Err: null,
        username: '',
        password: '',
        };
    }

    async getData() {
        try {
    
            if (this.state.username == "" && this.state.password == "" ) {
                this.updateError('Username and Password is Empty')
            } else if (this.state.username == "" ){
                this.updateError('Username is Empty')
            } else if (this.state.password == "" ){
                this.updateError('Password is Empty')
            } else {
                const response = await fetch('http://10.0.2.2:3000/login');
                const json = await response.json();
                this.setState({ data: json.data });
                let user = this.state.data.find(users => users.username === this.state.username)
                if (user == null){
                    this.updateError('Username and Password Uncorrect')
                } else {
                    if (this.state.password == user.password) {
                        await AsyncStorage.setItem('token', this.state.username)
                        this.props.navigation.navigate('HomeStack')
                    } else {
                        this.updateError('Username and Password Uncorrect')
                    }
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    setText = () => {
        const { isShowingText } =this.state;

        console.log(isShowingText);
        if (isShowingText){
            this.setState({ isShowingText: false });
        } else {
            console.log('true');
            this.setState({ isShowingText: true });
        }
    }

    updateError = (error) => {
        this.setState({ Err: error });
        setTimeout(() => {
            this.setState({ Err: null });
        }, 3000);
    }

    async tokenlogin() {
        const value = await AsyncStorage.getItem('token')
        if (value !== null) {
            this.props.navigation.navigate('HomeStack');
        }else {
            this.props.navigation.navigate('LoginStack');
        }
    }

    render() {
        const { data, token, Err } = this.state;
        const { navigation } = this.props;

        return (
            <ScrollView style={styles.container}>
            <View style={{height:(height-80),justifyContent: 'space-between'}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" color='#fff' size={23} style={{paddingLeft: 20}}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.childContainer}>
                        <Text style={styles.textHeader}>Bumble</Text>
                        <Text style={styles.text}>Sign In</Text>
                    </View>
                    {Err ? <Text style={styles.error}>{Err}</Text> : null}
                    <View style={styles.textInput}>
                        <Icon name="person" color='#2C3E50' style={{paddingHorizontal: 15}}></Icon>
                        <TextInput
                        style={styles.input}
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                        placeholder="Username"
                        />
                    </View>
                    <View>
                        <View style={styles.textInput}>
                            <Icon name="lock" color='#2C3E50' style={{paddingHorizontal: 15}}></Icon>
                            <View style={styles.pass}>
                                <TextInput
                                style={styles.input}
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                placeholder="Password"
                                secureTextEntry={this.state.isShowingText}
                                />
                                <Switch
                                onValueChange={this.setText}
                                value={!this.state.isShowingText}
                                style={{marginRight:10}}
                                /> 
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.getData()}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.signUp}>
                        <Text style={styles.textSignUp}>Do not have an account? </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisStack')}>
                            <Text style={styles.textSignUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.textFooter}>Powered by AVD Team</Text>
                </View>
            </View>
        </ScrollView>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C3E50',
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
    childContainer: {
        alignItems: 'center',
        marginVertical: 0,
    },
    mainContainer: {
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderColor: '#fff',
    },
    textHeader: {
        marginVertical: 0,
        fontSize: 55,
        color: '#2ECC71',
        fontFamily: 'Poppins-Bold',
    },
    text: {
        marginTop: -10,
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    error: {
        marginTop: 10,
        fontSize: 14,
        color: 'red',
        fontFamily: 'Poppins-Regular',
    },
    textForgot: {
        marginTop: 10,
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    textSignUp: {
        marginTop: 10,
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    textSignUpLink: {
        marginTop: 10,
        fontSize: 15,
        color: '#2ECC71',
        fontFamily: 'Poppins-Regular',
    },
    textFooter: {
        marginTop: 10,
        fontSize: 15,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
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
    pass: {
        flex:1, 
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    btn: {
        backgroundColor: '#2ECC71',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        width: 350,
        marginTop: 30,
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Poppins-Regular',
    },
    signUp: {
        width: 350,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});