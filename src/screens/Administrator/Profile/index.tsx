import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '@hooks/auth';
import Button from '@components/Button';
import {
  Bold,
  ButtonContainer,
  Container,
  Email,
  Name,
  Wrapper,
} from './styles';

export default function Profile(): JSX.Element {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Wrapper>
        <Icon name="account-outline" size={50} />
        <Email>
          <Bold>{user.email}</Bold>
        </Email>
        <Name>
          <Bold>{user.name}</Bold>
        </Name>
      </Wrapper>

      <ButtonContainer>
        <Button variant="secondary" onPress={signOut}>
          Sair
        </Button>
      </ButtonContainer>
    </Container>
  );
}
