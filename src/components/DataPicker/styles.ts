import styled from 'styled-components/native';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { Colors } from '@styles/theme';

export const Container = styled.View`
  margin-top: 20px;
`;

export const TextError = styled.Text`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: ${Colors.red};
  margin-top: 10px;
`;

export const Touchable = styled.TouchableWithoutFeedback``;

export const TouchableContainer = styled.View`
  z-index: 9999999999;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const ButtonModal = styled.TouchableOpacity`
  left: 0px;
`;

export const ButtonCancelTitle = styled.Text`
  font-size: 22px;
`;

export const Title = styled.Text`
  margin-right: 20px;
  font-size: 14px;
`;

export const TextInput = styled(TextInputPaper)``;
