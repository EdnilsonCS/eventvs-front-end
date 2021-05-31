import React from 'react';
import MaterialCommunityiIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from '../../components/Input';
import {
  ButtonContainer,
  LoginButton,
  Container,
  Header,
  CreateAccountContainer,
  CreateAccountText,
} from './styles';

export default function Signin({ navigation }: any) {
  return (
    <Container>
      <Header>EventVS</Header>
      <Input
        label="Email"
        autoCapitalize="none"
        name="account"
        color="#6d43a1"
      />
      <Input
        label="Senha"
        autoCapitalize="none"
        secureTextEntry
        name="lock"
        color="#6d43a1"
      />
      <ButtonContainer>
        <LoginButton
          mode="contained"
          onPress={() => navigation.push('Navigation')}
        >
          Login
        </LoginButton>
      </ButtonContainer>
      <CreateAccountContainer onPress={() => navigation.push('CreateAccount')}>
        <CreateAccountText>Criar nova conta</CreateAccountText>
        <MaterialCommunityiIcons name="arrow-right" color="#000" size={20} />
      </CreateAccountContainer>
    </Container>
  );
}
