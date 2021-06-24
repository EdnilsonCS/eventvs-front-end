import React from 'react';
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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [citys, setCitys] = useState<ICity[]>([]);
  const navigation = useNavigation();
  const schema = Yup.object().shape({
    email: Yup.string().email().required('E-mail obrigatório'),
    password: Yup.string().required('Senha obrigatória'),
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
      state: '',
      password: '',
    },
  });

  const selectedState = useWatch<string>({
    control,
    name: 'state',
  });
  const cepValue = useWatch<string>({
    control,
    name: 'cep',
  });
  console.log(selectedState);
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

        if (cepInformation.state) setValue('state', cepInformation.state);
        if (cepInformation.street) setValue('andress', cepInformation.street);

        if (cepInformation.city) setValue('city', cepInformation.city);

        if (cepInformation.neighborhood)
          setValues('district', cepInformation.neighborhood);
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
        <Input
          name="status"
          errors={errors}
          control={control}
          label="Status"
          color="#6d43a1"
        />
        <Select
          label="Categorias"
          menuPlaceholder="Categorias"
          name="category"
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
            name="number"
            errors={errors}
            control={control}
            color="#6d43a1"
            styleContainer={{ width: '45%' }}
          />
        </NumberWrapper>
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

        <Select
          label="Estado"
          name="state"
          errors={errors}
          control={control}
          options={formattedStates}
        />
        <Select
          menuPlaceholder="Cidade"
          disabled={formattedCitys.length === 0}
          label="Cidade"
          name="city"
          color="#6d43a1"
          errors={errors}
          control={control}
          options={formattedCitys}
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
