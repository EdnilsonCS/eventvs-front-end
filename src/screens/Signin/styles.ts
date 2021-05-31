import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const Container = styled.View`
  height: 100%;
  padding: 0 16px;
`;

export const ButtonContainer = styled.View`
  margin: 60px;
`;

export const LoginButton = styled(Button).attrs(() => ({
  color: '#6a2aba',
  mode: 'contained',
}))``;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 100px 0 90px;
`;

export const CreateAccountContainer = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  align-items: center;
`;

export const CreateAccountText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
