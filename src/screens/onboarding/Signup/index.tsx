import React from 'react';
import { SignUpScreenProps } from '@routes/public/index.routes';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { useCallback } from 'react';
import AuthService from '@services/AuthService';
import {
  Container,
  Header,
  ButtonContainer,
  SignupButton,
  SignupCheckBox,
  CheckBoxContainer,
  CheckBoxText,
} from './styles';

interface SignUpCredentials {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}

export default function SignUp({ navigation }: SignUpScreenProps): JSX.Element {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    cpf: Yup.string().required('Cpf é um campo obrigatório'),
    email: Yup.string().email().required('E-mail obrigatório'),
    password: Yup.string().required('Senha obrigatória'),
    confirmPassword: Yup.string()
      .when('password', {
        is: val => !!val.length,
        then: Yup.string().required('Campo Obrigatório'),
        otherwise: Yup.string(),
      })
      .oneOf([Yup.ref('password')], 'Confirmação incorreta'),
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
  const [checked, setChecked] = React.useState(false);

  function handleToggleCheckBox(): void {
    setChecked(prevState => !prevState);
  }
  const signUp = useCallback(async ({ nome, cpf, email, senha }) => {
    const response = await AuthService.signUp({
      nome,
      cpf,
      email,
      senha,
    });

    const participantData = response.data;
  }, []);

  const handleSignUp = async (data: SignUpCredentials): Promise<void> => {
    await signUp(data);
    navigation.navigate(PublicRoutesConstants.Login);
  };
  return (
    <Container>
      <Header>Eventvs</Header>
      <Input
        errors={errors}
        control={control}
        name="nome"
        label="Nome"
        autoCapitalize="none"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="cpf"
        label="CPF"
        autoCapitalize="none"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="senha"
        secureTextEntry
        label="Senha"
        autoCapitalize="none"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="confirmPassword"
        secureTextEntry
        label="Confirmar senha"
        autoCapitalize="none"
        color="#6d43a1"
      />
      <CheckBoxContainer>
        <SignupCheckBox
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleToggleCheckBox}
        />
        <CheckBoxText>Solicitar conta de produtor de eventos</CheckBoxText>
      </CheckBoxContainer>
      <ButtonContainer>
        <SignupButton onPress={handleSubmit(handleSignUp)}>
          Cadastrar
        </SignupButton>
      </ButtonContainer>
    </Container>
  );
}
