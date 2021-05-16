import styled from 'styled-components/native';
import { TextInput } from 'react-native-paper'

export const Container = styled.View`
  width: 100%;
  margin-top: 12px;
`;

export const BaseInput = styled(TextInput)`
    width: 100%;
`

export const Error = styled.Text`
    font-size: 14px;
    color: #f13a59;
    padding: 4px 4px 0 4px;
`