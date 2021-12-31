import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-ionicons';
import HomeScreen from './HomeScreen';
import EditScreen from './EditScreen';
import { SearchScreen } from './SearchScreen';
import OtherAccScreen from './OtherAccScreen';
import PostScreen from './PostScreen';
import PostingScreen from './PostingScreen';
import PostEditScreen from './PostEditScreen';
import EditProfileScreen from './EditProfileScreen';
import { SettingScreen } from './SettingScreen';
import AccountScreen from './AccountScreen';
import { SplashScreen } from './SplashScreen';
import { HeloScreen } from './HeloScreen';
import RegisScreen from './RegisScreen';
import NextRegisScreen from './NextRegisScreen';
import LoginScreen from './LoginScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackScreen = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashStack" screenOptions={{headerShown:false}}>
                <Stack.Screen name="SplashStack" component={SplashScreen} />
                <Stack.Screen name="HeloStack" component={HeloScreen} />
                <Stack.Screen name="LoginStack" component={LoginScreen} />
                <Stack.Screen name="RegisStack" component={RegisScreen} />
                <Stack.Screen name="NextRegisStack" component={NextRegisScreen} />
                <Stack.Screen name="HomeStack" component={AppTabScreen} />
                <Stack.Screen name="PostStack" component={PostScreen} />
                <Stack.Screen name="PostingStack" component={PostingScreen} />
                <Stack.Screen name="PostEditStack" component={PostEditScreen} />
                <Stack.Screen name="EditStack" component={EditScreen} />
                <Stack.Screen name="OtherAccStack" component={OtherAccScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const AccStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="AccStack" component={AccountScreen} />
            <Stack.Screen name="SettingStack" component={SettingScreen} />
            <Stack.Screen name="EditStack" component={EditScreen} />
            <Stack.Screen name="EditProfileStack" component={EditProfileScreen} />
        </Stack.Navigator>
    );
}

const AppTabScreen = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = focused
                    ? 'home'
                    : 'home';
                } else if (route.name === 'Search') {
                    iconName = focused ? 'rocket' : 'rocket';
                } else if (route.name === 'Account') {
                    iconName = focused ? 'person' : 'person';
                }

                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#2ECC71',
                tabBarInactiveTintColor: '#fff',
                tabBarActiveBackgroundColor: '#2C3E50',
                tabBarInactiveBackgroundColor: '#2C3E50',
                headerShown:false,
                tabBarShowLabel:false,
                tabBarStyle: { height: 60 },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Account" component={AccStackScreen} />
        </Tab.Navigator>
    );
}

export default HomeStackScreen;
