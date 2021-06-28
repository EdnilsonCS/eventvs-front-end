import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  border-width: 1px;
  border-radius: 10px;
  border-color: #6d43a1;
  width: 100px;
  height: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const FilterText = styled.Text`
  color: #af7bed;
  font-size: 12px;
  margin: 0 0 0 1px;
`;

export const Wrapper = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const FilterContainer = styled.View`
  flex: 1;
  padding: 0 16px;
  justify-content: space-evenly;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const Icon = styled(MaterialIcons).attrs(() => ({
  name: 'tune',
}))`
  color: #af7bed;
`;

export const FilterButton = styled(Button).attrs(() => ({
  mode: 'contained',
}))`
  margin: 0 10px;
`;
