import styled from 'styled-components/native';
import { Button, Checkbox } from 'react-native-paper';

export const ButtonContainer = styled.View`
  margin: 20px;
`;

export const CheckBoxContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CheckBoxText = styled.Text`
  font-size: 12px;
`;
export const SignupCheckBox = styled(Checkbox).attrs(() => ({
  uncheckedColor: '#6d43a1',
  color: '#6a2aba',
}))``;

export const Container = styled.View`
  height: 100%;
  padding: 0 16px;
  background-color: white;
`;

export const FieldContainer = styled.View`
  background-color: #f5f5f5;
  margin: 8px 0;
  border-color: #6a2aba;
  border-width: 2px;
  border-radius: 15px;
  padding: 10px;
`;

export const FieldText = styled.Text`
  font-size: 16px;
  font-family: 'Lato';
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 100px 0 40px;
`;

export const SignupButton = styled(Button).attrs(() => ({
  color: '#6a2aba',
  mode: 'contained',
}))``;
