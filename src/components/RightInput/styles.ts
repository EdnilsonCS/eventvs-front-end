import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';

export const Container = styled.View`
  width: 100%;
  margin-top: 20px;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: #f13a59;
  padding: 4px 4px 0 4px;
`;

export const BaseInput = styled(TextInput).attrs(() => ({
  theme: { colors: { primary: '#6a2aba' } },
}))`
  width: 100%;
`;
