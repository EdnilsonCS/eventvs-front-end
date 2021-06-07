import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import PublicRoutes from './public.routes';
import PrivateRoutes from './private.routes';
import { useAuth } from '../hooks/auth';

const theme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: '#6a2aba' },
};

const Routes: React.FC = () => {
  const { token } = useAuth();

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {token ? <PrivateRoutes /> : <PublicRoutes />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
