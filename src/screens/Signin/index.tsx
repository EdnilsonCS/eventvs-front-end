import React from 'react'
import { Button } from 'react-native'
import Input from '../../components/Input'
import { ButtonContainer, Container } from './styles'

export default function Signin({ navigation }: any) {
    return (
        <Container>
            <Input label='Email' autoCapitalize='none'/>
            <Input label='Senha' autoCapitalize='none' secureTextEntry/>
            <ButtonContainer>
                <Button title='Entrar' onPress={() => navigation.push('Navigation')} />
            </ButtonContainer>
        </Container>
    )
}