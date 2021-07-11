import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '@hooks/auth';
import {
  Bold,
  Buttons,
  ButtonContainer,
  Container,
  Email,
  Img,
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
        <Buttons
          style={{ backgroundColor: '#DE0b20', marginBottom: 30 }}
          onPress={signOut}
        >
          Sair
        </Buttons>
      </ButtonContainer>
    </Container>
  );
}
