import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import { useCallback } from 'react';
import ResetPasswordService from '@services/ResetPasswordService';
import { ServerContainerRef, useNavigation } from '@react-navigation/native';
import Button from '@components/Button';
import { Colors } from '@styles/theme';
import { showMessage } from 'react-native-flash-message';
import { 
    ButtonContainer,
    Container,
    Header,
} from './styles';
import { PublicRoutesConstants } from '@routes/constants.routes';

interface NewPasswordCredentials {
    token: string;
    novaSenha: string;
    confirmarNovaSenha: string;
  }
  
export default function NewPassword(): JSX.Element {
    const navigation = useNavigation();
    const schema = Yup.object().shape({
      novaSenha: Yup.string()
        .required('Senha obrigatória')
        .min(8, 'Deve ser maior que 8 dígitos'),
      confirmarNovaSenha: Yup.string().required('Campo Obrigatório'),
    });
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      mode: 'onBlur',
      defaultValues: {
        token: '',
        novaSenha: '',
        confirmarNovaSenha: '',
      },
    });
  
    const newPassword = useCallback(
      async ({ token, novaSenha, confirmarNovaSenha }) => {
        try {
          console.log(token);
          await ResetPasswordService.resetPassword({
            token,
            novaSenha,
            confirmarNovaSenha,
          });
          showMessage({
            message: 'Senha alterada com sucesso.',
            type: 'success',
            icon: 'success',
            duration: 3000,
          });
        } catch (err: any) {
            showMessage({
                message: 'Não foi possível alterar sua senha.',
                type: 'danger',
                icon: 'danger',
                duration: 3000,
            });
        }
      },
      [],
    );
  
    const handleNewPassword = async (
      data: NewPasswordCredentials,
    ): Promise<void> => {
      if (data.novaSenha !== data.confirmarNovaSenha) {
        return;
      }
      await newPassword(data);
      navigation.navigate(PublicRoutesConstants.Login);
    };
  
    return (
      <Container>
          <Header>EventoVS</Header>
          <Input
            errors={errors}
            control={control}
            name="novaSenha"
            secureTextEntry
            label="Nova senha"
            autoCapitalize="none"
            color={Colors.purple}
          />
          <Input
            errors={errors}
            control={control}
            name="confirmarNovaSenha"
            secureTextEntry
            label="Confirmar nova senha"
            autoCapitalize="none"
            color={Colors.purple}
          />
          <ButtonContainer>
              <Button onPress={handleSubmit(handleNewPassword)}>
                  Salvar
              </Button>
          </ButtonContainer>
      </Container>
    );
  }