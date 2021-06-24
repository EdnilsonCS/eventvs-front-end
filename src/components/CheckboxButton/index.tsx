import React from 'react';
import { Container, Icon } from './styles';

interface CheckBoxButtonProps {
  checked: boolean;
}

const CheckBoxButton: React.FC<CheckBoxButtonProps> = ({ checked }) => (
  <Container checked={checked}>
    <Icon />
  </Container>
);

export default CheckBoxButton;
