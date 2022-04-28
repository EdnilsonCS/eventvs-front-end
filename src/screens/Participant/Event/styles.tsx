import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Colors } from '@styles/theme';

export const Container = styled.View`
  padding: 0 16px;
  background-color: ${Colors.whiteSmoke};
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 20px 0 20px;
`;

export const ContainerModal = styled.View`
  align-items: flex-end;
  margin: 15px 0px;
`;

export const Wrapper = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: {
    paddingBottom: 100,
  },
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
  border-bottom-color: ${Colors.gray};
`;
