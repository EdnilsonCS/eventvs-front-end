import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { MaskService } from 'react-native-masked-text';
import { PublicRoutesConstants } from '@routes/constants.routes';
import { useCallback } from 'react';
import AuthService from '@services/AuthService';
import { useNavigation } from '@react-navigation/core';
import { showMessage } from 'react-native-flash-message';
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

export default function SignUp(): JSX.Element {
  const navigation = useNavigation();
  const schema = Yup.object().shape({
    nome: Yup.string().required('Nome obrigatório'),
    cpf: Yup.string().required('Cpf é um campo obrigatório'),
    email: Yup.string()
      .email('Esse email não é válido')
      .required('E-mail obrigatório'),
    senha: Yup.string().required('Senha obrigatória'),
    confirmarSenha: Yup.string()
      .when('senha', {
        is: (val: any) => !!val.length,
        then: Yup.string().required('Campo Obrigatório'),
        otherwise: Yup.string(),
      })
      .oneOf([Yup.ref('senha')], 'Confirmação incorreta'),
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
      senha: '',
      nome: '',
      cpf: '',
    },
  });
  const [checked, setChecked] = React.useState(false);

  const handleToggleCheckBox = (): void => {
    setChecked(prevState => !prevState);
  };

  const signUp = useCallback(
    async ({ nome, cpf, email, senha }) => {
      try {
        if (checked) {
          await AuthService.signUpProducer({
            nome,
            cpf: MaskService.toRawValue('cpf', cpf),
            email,
            senha,
          });
          showMessage({
            message: 'Cadastro de produtor solicitado com sucesso',
            type: 'success',
            icon: 'success',
            duration: 3000,
          });
        } else {
          await AuthService.signUp({
            nome,
            cpf: MaskService.toRawValue('cpf', cpf),
            email,
            senha,
          });
          showMessage({
            message: 'Cadastro realizado com sucesso',
            type: 'success',
            icon: 'success',
            duration: 3000,
          });
        }
      } catch (err) {
        showMessage({
          message: 'Não conseguimos realizar seu cadastro.',
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        });
      }
    },
    [checked],
  );

  const handleSignUp = async (data: SignUpCredentials): Promise<void> => {
    console.log(data);

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
        autoCapitalize="sentences"
        color="#6d43a1"
      />
      <Input
        errors={errors}
        control={control}
        inputMask
        type="cpf"
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
        keyboardType="email-address"
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
        name="confirmarSenha"
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
