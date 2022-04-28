import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import SubscribesScreen from '@screens/Participant/Subscribes';
import EventScreen from '@screens/Participant/Event';
import ProfileScreen from '@screens/Participant/Profile';
import { Colors } from '@styles/theme';
import { PrivateRoutesConstants } from '../constants.routes';

export type RootTabParamList = {
  [PrivateRoutesConstants.Profile]: undefined;
  [PrivateRoutesConstants.Event]: undefined;
  [PrivateRoutesConstants.Subscribes]: undefined;
};

export type ProfileScreenProps = BottomTabBarProps<RootTabParamList>;

const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

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

const ParticipantNavigation: React.FC = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={PrivateRoutesConstants.Subscribes}
        activeColor={Colors.white}
        inactiveColor={Colors.purplePink}
        shifting
      >
        <Tab.Screen
          name={PrivateRoutesConstants.Event}
          component={EventScreen}
          options={{
            title: 'Eventos',
            tabBarIcon: 'calendar-month-outline',
            tabBarColor: Colors.purple,
          }}
        />
        <Tab.Screen
          name={PrivateRoutesConstants.Subscribes}
          component={SubscribesScreen}
          options={{
            title: 'Minhas inscrições',
            tabBarIcon: 'application',
            tabBarColor: Colors.purple,
          }}
        />
        <Tab.Screen
          name={PrivateRoutesConstants.Profile}
          component={ProfileScreen}
          options={{
            title: 'Perfil',
            tabBarIcon: 'account-outline',
            tabBarColor: Colors.purple,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default ParticipantNavigation;
