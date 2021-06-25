import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { StatusBar } from 'react-native';

export const Container = styled.ScrollView`
  flex-direction: column;
  padding: 0 16px;
  height: 100%;
  background-color: white;
  padding-top: ${StatusBar.currentHeight}px;
`;

export const Wrapper = styled.View`
  align-items: center;
`;
export const ButtonContainer = styled.View`
  margin: 20px;
`;

export const Img = styled.Image`
  width: 126px;
  height: 126px;
  border-radius: 63px;
  margin-top: 60px;
`;

export const Email = styled.Text`
  font-size: 12px;
  margin: 16px 0;
`;

export const Name = styled.Text`
  font-size: 20px;
  margin-bottom: 30px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const Buttons = styled(Button).attrs(() => ({
  mode: 'contained',
}))``;
