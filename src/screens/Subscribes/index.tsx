import React from 'react';

import { Container, Header, Input, Wrapper } from './styles';
import Card from '../../components/Card';

const Subscribes = (): JSX.Element => {
  return (
    <Container>
      <Header>Inscrições</Header>
      <Wrapper>
        <Input placeholder="Pesquisar..." placeholderTextColor="#FFFFFF" />
      </Wrapper>
      <Card title="Calourada na UFS" />
      <Card title="Calourada na UFS" />
    </Container>
  );
};

export default Subscribes;
