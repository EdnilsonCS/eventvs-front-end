import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper';
import { Colors } from '@styles/theme';

export const Container = styled.View`
  margin-top: 20px;
`;

export const BaseInput = styled(TextInput).attrs(() => ({
  mode: 'outlined',
  underlineColor: 'transparent',
}))`
  border-radius: 20px;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: ${Colors.red};
  padding: 4px 4px 0 4px;
`;
