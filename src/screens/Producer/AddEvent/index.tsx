import React from 'react';

import RightInput from '@components/RightInput';
import { AddScreenProps } from '@routes/private.routes';
import {
  Container,
  Wrapper,
  Buttons,
  ButtonContainer,
  Header,
  Title,
  NumberWrapper,
  MiniInput,
} from './styles';

const AddEvent = ({ navigation }: AddScreenProps): JSX.Element => {
  return (
    <Container>
      <Header>
        <Title>Novo Evento</Title>
      </Header>
      <Wrapper>
        <RightInput label="Título" color="#6d43a1" />
        <RightInput label="Descrição" color="#6d43a1" />
        <RightInput label="Data de ínicio" name="calendar" color="#6d43a1" />
        <RightInput
          label="Data de encerramento"
          name="calendar"
          color="#6d43a1"
        />
        <RightInput label="Status" color="#6d43a1" />
        <RightInput label="Categoria" color="#6d43a1" />
        <RightInput label="Logradouro" color="#6d43a1" />
        <RightInput label="Bairro" color="#6d43a1" />
        <NumberWrapper>
          <MiniInput label="CEP" />
          <MiniInput label="Número" />
        </NumberWrapper>
        <RightInput label="Cidade" color="#6d43a1" />
        <RightInput label="Estado" color="#6d43a1" />
        <ButtonContainer>
          <Buttons color="#6a2aba" onPress={() => null}>
            Cadastrar
          </Buttons>
        </ButtonContainer>

        <ButtonContainer>
          <Buttons color="#DE0b20" onPress={() => navigation.navigate('Event')}>
            Voltar
          </Buttons>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default AddEvent;
