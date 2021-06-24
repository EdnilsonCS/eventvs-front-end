import styled from 'styled-components/native';
import { TextInput as TextInputPaper } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

export const Container = styled.View`
  margin-top: 20px;
`;

export const TextInput = styled(TextInputPaper).attrs(props => ({
  theme: {
    colors: {},
  },
}))``;

export const Touchable = styled.TouchableWithoutFeedback``;

export const TouchableContainer = styled.View`
  z-index: 9999999999;
  position: relative;
`;

export const Title = styled.Text``;

export const TextError = styled.Text`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: #f13a59;
  margin-top: 10px;
`;

export const IconCareDown = styled(Icon).attrs({
  source: 'AntDesign',
  name: 'caretdown',
})`
  font-size: 16px;
  width: 20px;
  width: 20px;
  position: absolute;
  right: 0px;
  top: 26px;
  right: 15px;
`;

export const TouchableIconDelete = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 26px;
  right: 15px;
`;

export const IconDelete = styled(Icon).attrs({
  source: 'AntDesign',
  name: 'closecircleo',
})`
  font-size: 22px;
`;
