import React from 'react';
import { SignUpScreenProps } from '@routes/public.routes';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { PublicRoutesConstants } from '@routes/constants.routes';
import {
  Container,
  Header,
  ButtonContainer,
  SignupButton,
  SignupCheckBox,
  CheckBoxContainer,
  CheckBoxText,
} from './styles';

export default function SignUp({ navigation }: SignUpScreenProps): JSX.Element {
  const schema = Yup.object().shape({
    name: Yup.string().email().required('Nome obrigatório'),
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
  const handleSignUp = (data): void => {
    navigation.navigate(PublicRoutesConstants.Login);
  };
  return (
    <Container>
      <Header>Eventvs</Header>
      <Input
        errors={errors}
        control={control}
        name="name"
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
        name="password"
        label="Senha"
        autoCapitalize="none"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="confirmPassword"
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
