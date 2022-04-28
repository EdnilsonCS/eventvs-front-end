import { Colors } from '@styles/theme';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${Colors.purple};
  border-radius: 10px;
  height: 200px;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0px 18px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Title = styled.Text`
  color: ${Colors.purple};
  font-size: 20px;
  width: 200px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 7px;
`;

export const ButtonText = styled.Text`
  margin-left: 15px;
  margin-right: 15px;
  color: ${Colors.white};
`;
