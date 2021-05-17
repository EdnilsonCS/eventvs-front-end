import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { token } = useAuth();

  return (
    <NavigationContainer>
      {token ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
