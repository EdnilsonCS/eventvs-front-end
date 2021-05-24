import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from '../screens/Signin';
import SignupScreen from '../screens/Signup';
import { PublicRoutesConstants } from './constants.routes';

export type RootPublicParamList = {
  [PublicRoutesConstants.Login]: undefined;
  [PublicRoutesConstants.CreateAccount]: undefined;
};

const Stack = createStackNavigator<RootPublicParamList>();

const Public: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={PublicRoutesConstants.Login}>
      <Stack.Screen
        name={PublicRoutesConstants.Login}
        component={SigninScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={PublicRoutesConstants.CreateAccount}
        component={SignupScreen}
        options={{
          headerShown: true,
          title: 'Cadastrar',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default Public;
