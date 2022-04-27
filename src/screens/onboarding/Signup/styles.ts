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

export const Container = styled.ScrollView`
  height: 100%;
  padding: 0 16px;
  background-color: white;
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 100px 0 40px;
`;
