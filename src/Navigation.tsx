import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack'

import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeScreen from './screens/Home'
import ExploreScreen from './screens/Explore'
import SettingsScreen from './screens/Settings'
import SigninScreen from './screens/Signin'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const icons: any = {
    Home: {
        lib: Entypo,
        name: 'home'
    },
    Explore: {
        lib: Ionicons,
        name: 'compass'
    },
    Settings: {
        lib: Ionicons,
        name: 'settings'
    }
}

function ButtonNavigation(): JSX.Element {
    return (
        <Tab.Navigator
        initialRouteName='Explore'
        screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                const { lib: Icon, name } = icons[route.name]
                return <Icon name={name} size={size} color={color} />
            }
        })}
        >
            <Tab.Screen
                name='Explore'
                component={ExploreScreen}
                options={{
                    title: 'Explorar'
                }}
                />
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'Início'
                }}
                />
            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    title: 'Configurações'
                }}
                />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={SigninScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Navigation' component={ButtonNavigation}/>
        </Stack.Navigator>
    )
}