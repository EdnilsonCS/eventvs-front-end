import React from 'react';
import { Button } from 'react-native';
import MaterialCommunityiIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from '../../components/Input';
import {
  ButtonContainer,
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
        <Button title="Login" onPress={() => navigation.push('Navigation')} />
      </ButtonContainer>
      <CreateAccountContainer onPress={() => navigation.push('CreateAccount')}>
        <CreateAccountText>Criar nova conta</CreateAccountText>
        <MaterialCommunityiIcons name="arrow-right" color="#000" size={20} />
      </CreateAccountContainer>
    </Container>
  );
}
