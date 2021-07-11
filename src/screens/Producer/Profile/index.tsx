/* eslint-disable prettier/prettier */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-indent */
import Input from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/auth';
import {
    Bold,
    Buttons,
    ButtonContainer,
    Container,
    Email,
    Img,
    Name,
    Wrapper
} from './styles'

export default function Profile(): JSX.Element {
  const { signOut} =  useAuth()




  const  navigation = useNavigation();
    return (
        <Container>
            <Wrapper>
            <Icon name="account-outline" size={50} />
            <Email>
              <Bold>ednilsoncs@dcomp.ufs.br</Bold>
            </Email>
                <Name><Bold>Ednilson Cardoso dos Santos</Bold></Name>
            </Wrapper>


            <ButtonContainer>
                <Buttons style={{backgroundColor: '#DE0b20',marginBottom: 30}} onPress={signOut}>
                    Sair
                </Buttons>
            </ButtonContainer>
        </Container>
    )
}

