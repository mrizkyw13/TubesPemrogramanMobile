import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostList } from './PostList';

const Stack = createNativeStackNavigator();

const AppHome = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="PostList" component={PostList} options={{ title: 'Timeline' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppHome;