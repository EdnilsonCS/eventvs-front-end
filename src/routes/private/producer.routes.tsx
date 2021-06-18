import React from 'react';
import ProducerEventScreen from '@screens/Producer/Event';
import ProducerAddScreen from '@screens/Producer/AddEvent';
import ProducerProfileScreen from '@screens/Producer/Profile';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { PrivateRoutesConstants } from '../constants.routes';

export type AddScreenProps =
  MaterialBottomTabScreenProps<ProducerRootTabParamList>;

export type ProducerRootTabParamList = {
  [PrivateRoutesConstants.Profile]: undefined;
  [PrivateRoutesConstants.Event]: undefined;
  [PrivateRoutesConstants.Add]: undefined;
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

export default ProducerNavigation;
