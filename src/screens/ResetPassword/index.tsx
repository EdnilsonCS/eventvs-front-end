import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@components/Input';
import ResetPasswordService from '@services/ResetPasswordService';
import { useNavigation } from '@react-navigation/native';
import Button from '@components/Button';
import { Colors } from '@styles/theme';
import {
  ButtonContainer,
  Container,
  Header,
} from './styles';
import { showMessage } from 'react-native-flash-message';
import { PublicRoutesConstants } from '@routes/constants.routes';

interface ResetPasswordCredentials {
    email: string;
}

export default function ResetPassword(): JSX.Element {
    const navigation = useNavigation();
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail não cadastrado.')
        .required('E-mail obrigatório.'),
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
        },
    });

    const resetPassword = async (email: any): Promise<void> => {
        try {
          await ResetPasswordService.sendEmailResetPassword(email);
          showMessage({
            message: 'Código para recuperação de senha enviado para o seu e-mail.',
            type: 'success',
            icon: 'success',
            duration: 3000,
          });
        } catch (err: any) {
          showMessage({
            message: 'Não conseguimos recuperar sua senha.',
            type: 'danger',
            icon: 'danger',
            duration: 3000,
          });
        }
    };

    const handleResetPassword = async (
      email: ResetPasswordCredentials,
    ): Promise<void> => {
      await resetPassword(email);
      navigation.navigate(PublicRoutesConstants.CheckCode);
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
              <ButtonContainer>
                  <Button
                    variant="primary"
                    mode="contained"
                    onPress={handleSubmit(handleResetPassword)}
                  >
                    Enviar E-mail
                  </Button>
              </ButtonContainer>
          </Container>
      );
}