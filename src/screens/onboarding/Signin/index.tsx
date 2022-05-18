import React from 'react';
import MaterialCommunityiIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { SignInCredentials, useAuth } from '@hooks/auth';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { useNavigation } from '@react-navigation/native';
import Button from '@components/Button';
import { Colors } from '@styles/theme';
import {
  ButtonContainer,
  Container,
  Header,
  CreateAccountContainer,
  RecoverPasswordContainer,
  CreateAccountText,
  RecoverPasswordText,
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
        keyboardType="email-address"
        leftIcon="account"
        color={Colors.purple}
      />
      <Input
        errors={errors}
        control={control}
        name="password"
        label="Senha"
        autoCapitalize="none"
        secureTextEntry
        leftIcon="lock"
        color={Colors.purple}
      />
      <ButtonContainer>
        <Button
          variant="primary"
          mode="contained"
          onPress={handleSubmit(handleLogin)}
        >
          Login
        </Button>
      </ButtonContainer>
      <RecoverPasswordContainer
        onPress={() => navigation.navigate(PublicRoutesConstants.RecoverPassword)}
      >
        <RecoverPasswordText>Recuperar senha</RecoverPasswordText>
        <MaterialCommunityiIcons
          name="arrow-right"
          color={Colors.black}
          size={20}
        />
      </RecoverPasswordContainer>
      <CreateAccountContainer
        onPress={() => navigation.navigate(PublicRoutesConstants.CreateAccount)}
      >
        <CreateAccountText>Criar nova conta</CreateAccountText>
        <MaterialCommunityiIcons
          name="arrow-right"
          color={Colors.black}
          size={20}
        />
      </CreateAccountContainer>
    </Container>
  );
}
