import React from 'react';

import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import { useNavigation } from '@react-navigation/native';
import EventService from '@services/EventService';
import DataPicker from '@components/DataPicker';
import {
  Container,
  Wrapper,
  Buttons,
  ButtonContainer,
  Header,
  Title,
  NumberWrapper,
} from './styles';

const AddEvent = (): JSX.Element => {
  const navigation = useNavigation();
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

  const handleCreateNewEvent = async (data: any): Promise<void> => {
    const endereco = {
      nome: data.nome,
      descricao: data.descricao,
      statusEvento: 'CRIADO',
      dataHoraFim: data.dataHoraFim,
      dataHoraInicio: data.dataHoraInicio,
    };

    const event = {
      endereco,
    };

    try {
      EventService.createNewEvent(event);
    } catch (err) {
      console.log('teste');
    }
  };
  return (
    <Container>
      <Header>
        <Title>Novo Evento</Title>
      </Header>
      <Wrapper>
        <Input
          name="nome"
          errors={errors}
          control={control}
          label="Título"
          color="#6d43a1"
        />
        <Input
          name="descricao"
          errors={errors}
          control={control}
          label="Descrição"
          color="#6d43a1"
        />
        <DataPicker
          errors={errors}
          control={control}
          name="dataHoraInicio"
          minimumDate={new Date()}
          label="Data de ínicio"
        />
        <DataPicker
          name="dataHoraFim"
          minimumDate={new Date()}
          errors={errors}
          control={control}
          label="Data de encerramento"
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
