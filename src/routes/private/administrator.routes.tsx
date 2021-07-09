import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Producers from '@screens/Administrator/Producers';
import Profile from '@screens/Administrator/Profile';
import { PrivateRoutesConstants } from '@routes/constants.routes';

type AdministratorRootTabParamList = {
  [PrivateRoutesConstants.Producers]: undefined;
  [PrivateRoutesConstants.Profile]: undefined;
};

const AdministratorTab =
  createMaterialBottomTabNavigator<AdministratorRootTabParamList>();

export default function AdministratorNavigation(): JSX.Element {
  return (
    <>
      <AdministratorTab.Navigator
        initialRouteName={PrivateRoutesConstants.Producers}
        activeColor="white"
        inactiveColor="#A7f"
        shifting
      >
        <AdministratorTab.Screen
          name={PrivateRoutesConstants.Producers}
          component={Producers}
          options={{
            tabBarIcon: 'tune',
            tabBarColor: '#62a',
            title: 'Produtores',
          }}
        />
        <AdministratorTab.Screen
          name={PrivateRoutesConstants.Profile}
          component={Profile}
          options={{
            tabBarIcon: 'account',
            tabBarColor: '#6a2aba',
            title: 'Perfil',
          }}
        />
      </AdministratorTab.Navigator>
    </>
  );
}
