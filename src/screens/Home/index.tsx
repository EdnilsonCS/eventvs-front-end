import React from "react"

import { Container, Header, Title, Wrapper,Entipo } from './styles'

const Home = (): JSX.Element => {
    return (
        <Container>
            <Header>Inscrições</Header>
            <Wrapper>
                <Title>Ibiza</Title>
                <Entipo/>
            </Wrapper>
        </Container>
    )
}

export default Home