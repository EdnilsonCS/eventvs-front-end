import React from 'react';
import { useForm } from 'react-hook-form';
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

interface CodeCredentials {
  token: string;
}
  
export default function CheckCode(): JSX.Element {
    const navigation = useNavigation();
    const schema = Yup.object().shape({
      token: Yup.string()
        .required('Código obrigatório')
        .max(6, 'Deve ter no máximo 6 dígitos.'),
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
      },
    });
  
    const checkCode = useCallback(async token => {
      try {
        await ResetPasswordService.checkCode(token);
        showMessage({
          message: 'Código confirmado.',
          type: 'success',
          icon: 'success',
          duration: 3000,
        });
        navigation.navigate(PublicRoutesConstants.NewPassword);
      } catch (err: any) {
        showMessage({
          message: 'Código incorreto.',
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        });
      }
    }, []);
  
    const handleCheckCode = async (token: CodeCredentials): Promise<void> => {
      await checkCode(token);
    };
  
        return (
            <Container>
              <Header>EventVS</Header>
              <Input
                errors={errors}
                control={control}
                name="token"
                label="Código"
                autoCapitalize="none"
                keyboardType="default"
                color={Colors.purple}
              />
              <ButtonContainer>
                <Button
                  variant="primary"
                  mode="contained"
                  onPress={handleSubmit(handleCheckCode)}
                >
                  Checar código
                </Button>
              </ButtonContainer>
            </Container>
        );
}