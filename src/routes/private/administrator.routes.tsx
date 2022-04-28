import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Producers from '@screens/Administrator/Producers';
import Profile from '@screens/Administrator/Profile';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import { Colors } from '@styles/theme';

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
        activeColor={Colors.white}
        inactiveColor={Colors.purplePink}
        shifting
      >
        <AdministratorTab.Screen
          name={PrivateRoutesConstants.Producers}
          component={Producers}
          options={{
            tabBarIcon: 'tune',
            tabBarColor: Colors.purple,
            title: 'Produtores',
          }}
        />
        <AdministratorTab.Screen
          name={PrivateRoutesConstants.Profile}
          component={Profile}
          options={{
            tabBarIcon: 'account',
            tabBarColor: Colors.purple,
            title: 'Perfil',
          }}
        />
      </AdministratorTab.Navigator>
    </>
  );
}
