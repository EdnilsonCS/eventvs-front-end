import React from 'react';
import { SignUpScreenProps } from '@routes/public.routes';
import {
  Container,
  Header,
  ButtonContainer,
  SignupButton,
  SignupCheckBox,
  FieldContainer,
  FieldText,
  CheckBoxContainer,
  CheckBoxText,
} from './styles';

export default function SignUp({ navigation }: SignUpScreenProps): JSX.Element {
  const [checked, setChecked] = React.useState(false);

  function handleToggleCheckBox(): void {
    setChecked(prevState => !prevState);
  }

  return (
    <Container>
      <Header>Eventvs</Header>
      <FieldContainer>
        <FieldText>Nome</FieldText>
      </FieldContainer>
      <FieldContainer>
        <FieldText>CPF</FieldText>
      </FieldContainer>
      <FieldContainer>
        <FieldText>Email</FieldText>
      </FieldContainer>
      <FieldContainer>
        <FieldText>Senha</FieldText>
      </FieldContainer>
      <FieldContainer>
        <FieldText>Confirmar senha</FieldText>
      </FieldContainer>
      <CheckBoxContainer>
        <SignupCheckBox
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleToggleCheckBox}
        />
        <CheckBoxText>Solicitar conta de produtor de eventos</CheckBoxText>
      </CheckBoxContainer>
      <ButtonContainer>
        <SignupButton onPress={() => navigation.navigate('Login')}>
          Cadastrar
        </SignupButton>
      </ButtonContainer>
    </Container>
  );
}
