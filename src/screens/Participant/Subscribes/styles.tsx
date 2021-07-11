import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export const BlankSpace = styled.View`
  margin: 10px 0;
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 30px;
  padding: 15px;
  font-weight: bold;
  font-family: Lato;
`;

export const Wrapper = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: true,
}))`
  height: ${Dimensions.get('screen').height * 0.6}px;
`;
