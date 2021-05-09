import React from 'react'
import { Button, Text, View } from 'react-native'

export default function Signin({navigation}) {
    return (
        <View>
            <Text>
                Login
            </Text>
                <Button title='btn' onPress={() => navigation.push('Navigation')}>
                  <Text>Isso é um button</Text>   
                </Button>
        </View>
    )
}