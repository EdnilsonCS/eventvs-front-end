import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack'

import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

import HomeScreen from './screens/Home'
import EventScreen from './screens/Event'
import ProfileScreen from './screens/Profile'
import SigninScreen from './screens/Signin'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const icons: any = {
    Home: {
        lib: Octicons,
        name: 'browser'
    },
    Event: {
        lib: MaterialCommunityIcons,
        name: 'calendar-month-outline'
    },
    Profile: {
        lib: Feather,
        name: 'user'
    }
}

function ButtonNavigation(): JSX.Element {
    return (
        <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ color, size, focused }) => {
                const { lib: Icon, name } = icons[route.name]
                return <Icon name={name} size={size} color={color} />
            }
        })}
        tabBarOptions={{
            style: {
                backgroundColor: '#6A2ABA',
            },
            activeTintColor: '#FFFFFF',
            inactiveTintColor: '#AF7BED'
        }}
        >
            <Tab.Screen
                name='Event'
                component={EventScreen}
                options={{
                    title: 'Eventos'
                }}
                />
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    title: 'Minhas inscrições'
                }}
                />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    title: 'Perfil'
                }}
                />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={SigninScreen} options={{headerShown:false}}/>
            <Stack.Screen name='Navigation' component={ButtonNavigation} options={{headerShown:false}}/>
        </Stack.Navigator>
    )
}