import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';

import SigninScreen from '../../screens/onboarding/Signin';
import SignupScreen from '../../screens/onboarding/Signup';
import ResetPassword from '@screens/ResetPassword';
import CheckCode from '@screens/ResetPassword/CheckCode';
import NewPassword from '@screens/ResetPassword/NewPassword';
import { PublicRoutesConstants } from '../constants.routes';

export type RootPublicParamList = {
  [PublicRoutesConstants.Login]: undefined;
  [PublicRoutesConstants.CreateAccount]: undefined;
  [PublicRoutesConstants.RecoverPassword]: undefined;
  [PublicRoutesConstants.CheckCode]: undefined;
  [PublicRoutesConstants.NewPassword]: undefined;
};

export type SignInScreenProps = StackScreenProps<RootPublicParamList>;
export type SignUpScreenProps = StackScreenProps<RootPublicParamList>;

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
          cardStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          title: 'Cadastrar',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={PublicRoutesConstants.RecoverPassword}
        component={ResetPassword}
        options={{
          headerShown: true,
          cardStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          title: 'Recuperar senha',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={PublicRoutesConstants.CheckCode}
        component={CheckCode}
        options={{
          headerShown: true,
          cardStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          title: 'Checar código',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name={PublicRoutesConstants.NewPassword}
        component={NewPassword}
        options={{
          headerShown: true,
          cardStyle: {
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          title: 'Nova senha',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default Public;
