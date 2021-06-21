import React from 'react';
import FlashMessage from 'react-native-flash-message';
import Routes from './routes/index.routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <AppProvider>
      <FlashMessage position="top" />
      <Routes />
    </AppProvider>
  );
};

export default App;
