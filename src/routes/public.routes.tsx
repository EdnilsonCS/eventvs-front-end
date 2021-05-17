import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SigninScreen from '../screens/Signin';
import { PublicRoutesConstants } from './constants.routes';

export type RootPublicParamList = {
  [PublicRoutesConstants.Login]: undefined;
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
    </Stack.Navigator>
  );
};

export default Public;
