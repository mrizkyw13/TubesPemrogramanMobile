import * as React from 'react';
import { View, Text, Button } from 'react-native';

export const SearchScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Search Screen</Text>
            <Button
            title="Go to Other Screen"
            onPress={() => navigation.navigate('OtherAccStack')}
            />
        </View>
    );
}