import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { Colors } from '@styles/theme';

export const PrimaryButton = styled(Button).attrs(() => ({
  mode: 'contained',
  color: Colors.purple,
}))``;

export const SecondaryButton = styled(Button).attrs(() => ({
  mode: 'contained',
}))`
  background-color: ${Colors.red};
  margin-bottom: 30;
`;
