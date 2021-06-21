import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import Routes from './routes/index.routes';
import AppProvider from './hooks';

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const App: React.FC = () => {
  return (
    <AppProvider>
      <KeyboardAvoidingView
        behavior="position"
        style={s.container}
        contentContainerStyle={s.container}
        keyboardVerticalOffset={-200}
      >
        <FlashMessage position="top" />
        <Routes />
      </KeyboardAvoidingView>
    </AppProvider>
  );
};

export default App;
