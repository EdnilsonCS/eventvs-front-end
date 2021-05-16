import React from 'react'
import { BaseInput, Container, Error } from './styles'

export default function Input({errorText,...props}: any) {
    return (
        <Container>
            <BaseInput mode='outlined' returnKeyType={'next'} underlineColor='transparent' selectionColor='#338f1d'{...props}/>
            {errorText ? <Error>{errorText}</Error> : null}
        </Container>
    )
}