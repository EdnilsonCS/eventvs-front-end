import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  padding: 0 16px;
  background-color: whitesmoke;
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 20px 0 20px;
`;

export const Wrapper = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: true,
}))`
  height: ${Dimensions.get('screen').height * 0.6}px;
`;

export const Bold = styled.Text`
  font-weight: bold;
  font-size: 20px;
  margin: 15px;
`;

export const ItemContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #bbb;
`;