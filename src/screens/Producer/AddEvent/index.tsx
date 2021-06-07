import React from 'react';

import Input from '@components/Input';
import { AddScreenProps } from '@routes/private.routes';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrivateRoutesConstants } from '@routes/constants.routes';
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
  const schema = Yup.object().shape({
    email: Yup.string().email().required('E-mail obrigatório'),
    password: Yup.string().required('Senha obrigatória'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <Container>
      <Header>
        <Title>Novo Evento</Title>
      </Header>
      <Wrapper>
        <Input
          name="title"
          errors={errors}
          control={control}
          label="Título"
          color="#6d43a1"
        />
        <Input
          name="description"
          errors={errors}
          control={control}
          label="Descrição"
          color="#6d43a1"
        />
        <Input
          errors={errors}
          control={control}
          name="startDate"
          label="Data de ínicio"
          rightIcon="calendar"
          color="#6d43a1"
        />
        <Input
          name="closeDate"
          errors={errors}
          control={control}
          label="Data de encerramento"
          rightIcon="calendar"
          color="#6d43a1"
        />
        <Input
          name="status"
          errors={errors}
          control={control}
          label="Status"
          color="#6d43a1"
        />
        <Input
          name="category"
          errors={errors}
          control={control}
          label="Categoria"
          color="#6d43a1"
        />
        <Input
          name="andress"
          errors={errors}
          control={control}
          label="Logradouro"
          color="#6d43a1"
        />
        <Input
          name="district"
          errors={errors}
          control={control}
          label="Bairro"
          color="#6d43a1"
        />
        <NumberWrapper>
          <Input
            label="CEP"
            name="cep"
            errors={errors}
            control={control}
            color="#6d43a1"
            styleContainer={{ width: '50%', marginRight: '5%' }}
          />
          <Input
            label="Número"
            name="number"
            errors={errors}
            control={control}
            color="#6d43a1"
            styleContainer={{ width: '45%' }}
          />
        </NumberWrapper>
        <Input
          label="Cidade"
          name="city"
          color="#6d43a1"
          errors={errors}
          control={control}
        />
        <Input
          label="Estado"
          name="state"
          color="#6d43a1"
          errors={errors}
          control={control}
        />
        <ButtonContainer>
          <Buttons color="#6a2aba" onPress={() => null}>
            Cadastrar
          </Buttons>
        </ButtonContainer>

        <ButtonContainer>
          <Buttons
            color="#DE0b20"
            onPress={() => navigation.navigate(PrivateRoutesConstants.Event)}
          >
            Voltar
          </Buttons>
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

export default AddEvent;
