import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import SubscribesScreen from '../screens/Subscribes';
import EventScreen from '../screens/Event';
import ProfileScreen from '../screens/Profile';
import { PrivateRoutesConstants } from './constants.routes';

export type RootTabParamList = {
  [PrivateRoutesConstants.Profile]: undefined;
  [PrivateRoutesConstants.Event]: undefined;
  [PrivateRoutesConstants.Subscribes]: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const icons: any = {
  [PrivateRoutesConstants.Subscribes]: {
    lib: Octicons,
    name: 'browser',
  },
  [PrivateRoutesConstants.Event]: {
    lib: MaterialCommunityIcons,
    name: 'calendar-month-outline',
  },
  [PrivateRoutesConstants.Profile]: {
    lib: Feather,
    name: 'user',
  },
};

const ButtonNavigation: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={PrivateRoutesConstants.Subscribes}
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: '#6A2ABA',
        },
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#AF7BED',
      }}
    >
      <Tab.Screen
        name={PrivateRoutesConstants.Event}
        component={EventScreen}
        options={{
          title: 'Eventos',
        }}
      />
      <Tab.Screen
        name={PrivateRoutesConstants.Subscribes}
        component={SubscribesScreen}
        options={{
          title: 'Minhas inscrições',
        }}
      />
      <Tab.Screen
        name={PrivateRoutesConstants.Profile}
        component={ProfileScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export default ButtonNavigation;
