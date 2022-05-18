import styled from 'styled-components/native';
import { Colors } from '@styles/theme';

export const ButtonContainer = styled.View`
  margin: 20px;
`;

export const Container = styled.View`
  height: 100%;
  padding: 0 16px;
  background-color: ${Colors.white};
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 100px 0 40px;
`;