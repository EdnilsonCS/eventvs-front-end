import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { Colors } from '@styles/theme';

export const PrimaryButton = styled.TouchableOpacity`
  height: 40px;
  border-radius: 5px;
  background-color: ${Colors.purple};
  justify-content: center;
  align-items: center;
`;

export const SecondaryButton = styled.TouchableOpacity`
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.red};
  margin-bottom: 30px;
`;

export const TertiaryButton = styled.TouchableOpacity`
  height: 40px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.gray};
  margin-bottom: 30px;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${Colors.white};
`;
