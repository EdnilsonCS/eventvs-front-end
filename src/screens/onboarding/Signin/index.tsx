import React from 'react';
import MaterialCommunityiIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { SignInCredentials, useAuth } from '@hooks/auth';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import {
  ButtonContainer,
  LoginButton,
  Container,
  Header,
  CreateAccountContainer,
  CreateAccountText,
} from './styles';

export default function Signin(): JSX.Element {
  const navigation = useNavigation();
  const { signIn } = useAuth();
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Esse email não é válido')
      .required('E-mail obrigatório'),
    password: Yup.string()
      .required('Senha obrigatória')
      .min(3, 'É necessário que a senha tenha no minimo 3 digitos'),
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
  const handleLogin = async (data: SignInCredentials): Promise<void> => {
    try {
      await signIn(data);
    } catch (error) {
      if (error.response) {
        showMessage({
          message: error.response.data.message,
          type: 'danger',
          icon: 'danger',
          duration: 5000,
        });
      } else {
        showMessage({
          message: 'verifique sua conexão com a internet',
          type: 'danger',
          icon: 'danger',
          duration: 5000,
        });
      }
    }
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
        keyboardType="email-address"
        leftIcon="account"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        name="password"
        label="Senha"
        autoCapitalize="none"
        secureTextEntry
        leftIcon="lock"
        color="#6d43a1"
      />
      <ButtonContainer>
        <LoginButton mode="contained" onPress={handleSubmit(handleLogin)}>
          Login
        </LoginButton>
      </ButtonContainer>
      <CreateAccountContainer
        onPress={() => navigation.navigate(PublicRoutesConstants.CreateAccount)}
      >
        <CreateAccountText>Criar nova conta</CreateAccountText>
        <MaterialCommunityiIcons name="arrow-right" color="#000" size={20} />
      </CreateAccountContainer>
    </Container>
  );
}
