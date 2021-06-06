import React from 'react';
import MaterialCommunityiIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { SignInScreenProps } from '@routes/public.routes';
import { useAuth } from '@hooks/auth';
import { PublicRoutesConstants } from '@routes/constants.routes';
import {
  ButtonContainer,
  LoginButton,
  Container,
  Header,
  CreateAccountContainer,
  CreateAccountText,
} from './styles';

export default function Signin({ navigation }: SignInScreenProps): JSX.Element {
  const { signIn } = useAuth();
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
  const handleLogin = async (data: any): Promise<void> => {
    await signIn(data);
  };
  return (
    <Container>
      <Header>EventVS</Header>
      <Input
        errors={errors}
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        icon="account"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="password"
        label="Senha"
        autoCapitalize="none"
        secureTextEntry
        icon="lock"
        color="#6d43a1"
      />
      <ButtonContainer>
        <LoginButton mode="contained" onPress={handleSubmit(handleLogin)}>
          Login
        </LoginButton>
      </ButtonContainer>
      <CreateAccountContainer
        onPress={() => navigation.push(PublicRoutesConstants.CreateAccount)}
      >
        <CreateAccountText>Criar nova conta</CreateAccountText>
        <MaterialCommunityiIcons name="arrow-right" color="#000" size={20} />
      </CreateAccountContainer>
    </Container>
  );
}
