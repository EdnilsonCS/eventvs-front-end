import styled from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  padding: 0px 16px;
  justify-content: space-evenly;
  height: 100%;
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
`;

export const Header = styled.View`
  margin: 16px;
`;

export const NumberWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 40px;
  align-self: center;
  font-weight: bold;
`;

export const Wrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 16,
  },
}))``;

export const Buttons = styled(Button).attrs(() => ({
  mode: 'contained',
}))``;
