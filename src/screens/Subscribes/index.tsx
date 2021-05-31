import React from 'react';

import { Container, Header } from './styles';
import Card from '../../components/Card';
import SearchInput from '../../components/SearchInput';

const Subscribes = (): JSX.Element => {
  return (
    <Container>
      <Header>Minhas Inscrições</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="#FFFFFF" />
      <Card title="Calourada na UFS" btnTitle="Cancelar" btnColor="#DE0B20" />
      <Card title="Calourada na UFS" btnTitle="Cancelar" btnColor="#DE0B20" />
    </Container>
  );
};

export default Subscribes;
