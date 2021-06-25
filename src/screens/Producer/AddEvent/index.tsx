import React from 'react';
import { showMessage } from 'react-native-flash-message';
import { ICategory } from '@services/CategoryService';
import Input from '@components/Input';
import { useForm, useWatch } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import { useNavigation } from '@react-navigation/native';
import EventService from '@services/EventService';
import DataPicker from '@components/DataPicker';
import { useState } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import CategoryService from '@services/CategoryService';
import Select from '@components/Select';
import LocationService, { ICity, IState } from '@services/LocationService';
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
  const statusEvent = [
    {
      id: 'PUBLICADO',
      name: 'Publicado',
    },
    {
      id: 'CRIADO',
      name: 'Criado',
    },
  ];
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [citys, setCitys] = useState<ICity[]>([]);
  const navigation = useNavigation();
  const schema = Yup.object().shape({
    nome: Yup.string().required('Titulo é um campo obrigatório'),
    descricao: Yup.string().required('Descrição é um campo obrigatório'),
    statusEvento: Yup.string().required('Status é um campo obrigatório'),
    categoriaId: Yup.string().required('Categoria é um campo obrigatório'),
    dataHoraFim: Yup.date().required('Data de inicio é um campo obrigatório'),
    dataHoraInicio: Yup.date().required('Data de fim é um campo obrigatório'),
    logradouro: Yup.string().required('Logradouro é um campo obrigatório'),
    numero: Yup.number().required('Número é um campo obrigatório'),
    bairro: Yup.string().required('Bairro é um campo obrigatório'),
    cidade: Yup.string().required('Cidade é um campo obrigatório'),
    estado: Yup.string().required('Estado é um campo obrigatório'),
    cep: Yup.string().required('E-mail é um campo obrigatório'),
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      nome: '',
      descricao: '',
      statusEvento: '',
      categoriaId: '',
      dataHoraFim: '',
      dataHoraInicio: '',
      logradouro: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
    },
  });

  const selectedState = useWatch<string>({
    control,
    name: 'estado',
  });
  const cepValue = useWatch<string>({
    control,
    name: 'cep',
  });
  console.log(selectedState);
  const handleCreateNewEvent = async (data: any): Promise<void> => {
    const endereco = {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cidade: data.cidade,
      estado: data.estado,
      cep: data.cep,
    };

    const event = {
      endereco,
      nome: data.nome,
      descricao: data.descricao,
      statusEvento: data.statusEvento,
      categoriaId: data.categoriaId,
      dataHoraFim: data.dataHoraFim,
      dataHoraInicio: data.dataHoraInicio,
    };

    try {
      await EventService.createNewEvent(event);
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

  useEffect(() => {
    const getCategoryList = async (): Promise<void> => {
      const serviceCategories = await CategoryService.getCategoryList();

      setCategories(serviceCategories);
    };

    getCategoryList();
  }, []);

  useEffect(() => {
    const getStateList = async (): Promise<void> => {
      const serviceState = await LocationService.getStateList();

      setStates(serviceState);
    };

    getStateList();
  }, []);

  useEffect(() => {
    const getCityList = async (): Promise<void> => {
      const serviceCity = await LocationService.getCityList({
        UF: selectedState,
      });

      setCitys(serviceCity);
    };

    getCityList();
  }, [getValues, selectedState]);
  useEffect(() => {
    const getInformationBycep = async (): Promise<void> => {
      if (cepValue && cepValue.length > 7) {
        const cepInformation = await LocationService.getInformationByCep({
          cepNumber: cepValue.replace('-', ''),
        });

        if (cepInformation.state)
          setValue('estado', cepInformation.state, {
            shouldValidate: true,
          });
        if (cepInformation.street)
          setValue('logradouro', cepInformation.street);

        if (cepInformation.city) setValue('cidade', cepInformation.city, true);

        if (cepInformation.neighborhood)
          setValues('bairro', cepInformation.neighborhood, true);
      }
    };

    getInformationBycep();
  }, [cepValue, setValue]);

  const formattedStates = useMemo(() => {
    return states.map(item => {
      return {
        name: item.nome,
        id: item.sigla,
      };
    });
  }, [states]);
  const formattedCategories = useMemo(() => {
    return categories.map(item => {
      return {
        name: item.nome,
        id: item.id,
      };
    });
  }, [categories]);
  const formattedCitys = useMemo(() => {
    return citys.map(item => {
      return {
        name: item.nome,
        id: item.nome,
      };
    });
  }, [citys]);
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
        <Select
          menuPlaceholder="Status"
          name="statusEvento"
          errors={errors}
          control={control}
          label="Status"
          color="#6d43a1"
          options={statusEvent}
        />
        <Select
          label="Categorias"
          menuPlaceholder="Categorias"
          name="categoriaId"
          errors={errors}
          control={control}
          options={formattedCategories}
        />
        <NumberWrapper>
          <Input
            inputMask
            type="zip-code"
            label="CEP"
            name="cep"
            errors={errors}
            control={control}
            color="#6d43a1"
            styleContainer={{ width: '50%', marginRight: '5%' }}
          />
          <Input
            label="Número"
            name="numero"
            errors={errors}
            control={control}
            color="#6d43a1"
            styleContainer={{ width: '45%' }}
          />
        </NumberWrapper>
        <Input
          name="logradouro"
          errors={errors}
          control={control}
          label="Logradouro"
          color="#6d43a1"
        />
        <Input
          name="bairro"
          errors={errors}
          control={control}
          label="Bairro"
          color="#6d43a1"
        />

        <Select
          label="Estado"
          name="estado"
          errors={errors}
          control={control}
          options={formattedStates}
        />
        <Select
          menuPlaceholder="Cidade"
          disabled={formattedCitys.length === 0}
          label="Cidade"
          name="cidade"
          color="#6d43a1"
          errors={errors}
          control={control}
          options={formattedCitys}
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

export default AddEvent;
