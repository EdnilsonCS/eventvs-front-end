import styled from 'styled-components/native';
import { Button } from 'react-native-paper';

export const PrimaryButton = styled(Button).attrs(() => ({
  mode: 'contained',
  color: '#6a2aba',
}))``;

export const SecondaryButton = styled(Button).attrs(() => ({
  mode: 'contained',
}))`
  background-color: '#DE0b20';
  margin-bottom: 30;
`;
