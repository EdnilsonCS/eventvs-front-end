import styled, { css } from 'styled-components/native';
import IconComponent from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '@styles/theme';

interface ContainerProps {
  checked: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 22px;
  height: 22px;
  border-width: 2px;
  border-radius: 5px;
  color: ${Colors.white};
  justify-content: center;
  align-items: center;

  ${props =>
    props.checked &&
    css`
      background-color: ${Colors.white};
      border-color: ${Colors.purple};
    `}
`;

export const Icon = styled(IconComponent).attrs({
  source: 'MaterialCommunityIcons',
  name: 'check-bold',
  color: Colors.white,
  size: 18,
})``;
