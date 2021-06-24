import styled, { css } from 'styled-components/native';
import IconComponent from 'react-native-vector-icons/MaterialCommunityIcons';

interface ContainerProps {
  checked: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 22px;
  height: 22px;
  border-width: 2px;
  border-radius: 5px;
  border-color: white;
  justify-content: center;
  align-items: center;

  ${props =>
    props.checked &&
    css`
      background-color: white;
      border-color: #6d43a1;
    `}
`;

export const Icon = styled(IconComponent).attrs({
  source: 'MaterialCommunityIcons',
  name: 'check-bold',
  color: '#FFFF',
  size: 18,
})``;
