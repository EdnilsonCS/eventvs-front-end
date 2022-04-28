import { Colors } from '@styles/theme';
import styled from 'styled-components/native';

export const Input = styled.TextInput`
  margin-left: 15px;
`;

export const Container = styled.View`
  background-color: ${Colors.purple};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
`;
