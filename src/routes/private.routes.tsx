import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabScreenProps,
} from '@react-navigation/material-bottom-tabs';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import ProducerEventScreen from '@screens/Producer/Event';
import ProducerAddScreen from '@screens/Producer/AddEvent';
import ProducerProfileScreen from '@screens/Producer/Profile';
import SubscribesScreen from '@screens/Participant/Subscribes';
import EventScreen from '@screens/Participant/Event';
import ProfileScreen from '@screens/Participant/Profile';
import { PrivateRoutesConstants } from './constants.routes';

export type RootTabParamList = {
  [PrivateRoutesConstants.Profile]: undefined;
  [PrivateRoutesConstants.Event]: undefined;
  [PrivateRoutesConstants.Subscribes]: undefined;
};

export type ProducerRootTabParamList = {
  [PrivateRoutesConstants.Profile]: undefined;
  [PrivateRoutesConstants.Event]: undefined;
  [PrivateRoutesConstants.Add]: undefined;
};

export type ProfileScreenProps = BottomTabBarProps<RootTabParamList>;

export type AddScreenProps =
  MaterialBottomTabScreenProps<ProducerRootTabParamList>;

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

const ProducerTab =
  createMaterialBottomTabNavigator<ProducerRootTabParamList>();

const ProducerNavigation: React.FC = props => {
  return (
    <>
      <ProducerTab.Navigator
        initialRouteName={PrivateRoutesConstants.Event}
        activeColor="white"
        inactiveColor="#A7f"
        shifting
      >
        <ProducerTab.Screen
          name={PrivateRoutesConstants.Event}
          component={ProducerEventScreen}
          options={{
            title: 'Eventos',
            tabBarIcon: 'calendar-month-outline',
            tabBarColor: '#6a2aba',
          }}
        />
        <ProducerTab.Screen
          name={PrivateRoutesConstants.Add}
          component={ProducerAddScreen}
          options={{
            tabBarIcon: 'plus-circle',
            tabBarLabel: '',
            tabBarColor: '#6c43a1',
          }}
        />
        <ProducerTab.Screen
          name={PrivateRoutesConstants.Profile}
          component={ProducerProfileScreen}
          options={{
            title: 'Perfil',
            tabBarIcon: 'account-outline',
            tabBarColor: '#6b4491',
          }}
        />
      </ProducerTab.Navigator>
    </>
  );
};

export { ProducerNavigation };
export default ButtonNavigation;
