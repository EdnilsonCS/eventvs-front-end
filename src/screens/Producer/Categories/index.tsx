import React from 'react';
import { showMessage } from 'react-native-flash-message';
import CategoryService, { ICategory } from '@services/CategoryService';
import Input from '@components/Input';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Wrapper,
  Buttons,
  ButtonContainer,
  Header,
  Title,
} from './styles';

const AddCategory = (): JSX.Element => {
  const navigation = useNavigation();
  const schema = Yup.object().shape({
    nome: Yup.string().required('Titulo é um campo obrigatório'),
    descricao: Yup.string().required('Descrição é um campo obrigatório'),
  });

  const {
    control,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      descricao: '',
    },
  });

  const handleCreateNewEvent = async (data: ICategory): Promise<void> => {
    try {
      await CategoryService.createNewCategory(data);
      showMessage({
        message: 'Ops! Cadastro realizado com sucesso',
        type: 'success',
        icon: 'success',
        duration: 3000,
      });
    } catch (err) {
      showMessage({
        message: 'Erro ao fazer login, check suas credenciais',
        type: 'danger',
        icon: 'danger',
        duration: 3000,
      });
    }
  };

  return (
    <Container>
      <Header>
        <Title>Nova categoria</Title>
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

        <ButtonContainer>
          <Buttons color="#6a2aba" onPress={handleSubmit(handleCreateNewEvent)}>
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

export default AddCategory;
