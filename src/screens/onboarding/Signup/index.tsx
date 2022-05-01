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
import Button from '@components/Button';
import * as CPFUtil from '@utils/cpf';
import * as NumberUtils from '@utils/number';
import { Colors } from '@styles/theme';
import {
  Container,
  Header,
  ButtonContainer,
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
    nome: Yup.string()
      .test('nome', 'O nome não deve conter números', value => {
        return !NumberUtils.stringContainsNumber(value);
      })
      .required('Nome é um campo obrigatório'),
    cpf: Yup.string()
      .test('cpf', 'Digite um cpf válido', value => {
        return CPFUtil.isValid(value);
      })
      .required('O CPF é um campo obrigatório'),
    email: Yup.string()
      .email('Esse email não é válido')
      .required('E-mail obrigatório'),
    senha: Yup.string()
      .required('Senha obrigatória')
      .min(8, 'Deve ser maior que 8 dígitos'),
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
      } catch (err: any) {
        showMessage({
          message: err.response.data.message,
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        });
      }
    },
    [checked],
  );

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
        autoCapitalize="sentences"
        color={Colors.purple}
      />
      <Input
        errors={errors}
        control={control}
        inputMask
        type="cpf"
        name="cpf"
        label="CPF"
        autoCapitalize="none"
        color={Colors.purple}
      />
      <Input
        errors={errors}
        control={control}
        name="email"
        label="Email"
        autoCapitalize="none"
        color={Colors.purple}
        keyboardType="email-address"
      />
      <Input
        errors={errors}
        control={control}
        name="senha"
        secureTextEntry
        label="Senha"
        autoCapitalize="none"
        color={Colors.purple}
      />
      <Input
        errors={errors}
        control={control}
        name="confirmarSenha"
        secureTextEntry
        label="Confirmar senha"
        autoCapitalize="none"
        color={Colors.purple}
      />
      <CheckBoxContainer>
        <SignupCheckBox
          status={checked ? 'checked' : 'unchecked'}
          onPress={handleToggleCheckBox}
        />
        <CheckBoxText>Solicitar conta de produtor de eventos</CheckBoxText>
      </CheckBoxContainer>
      <ButtonContainer>
        <Button onPress={handleSubmit(handleSignUp)}>Cadastrar</Button>
      </ButtonContainer>
    </Container>
  );
}
