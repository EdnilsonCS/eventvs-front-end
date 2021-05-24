import React from 'react';

import { Container, Header } from './styles';
import Card from '../../components/Card';
import SearchInput from '../../components/SearchInput';

const Subscribes = (): JSX.Element => {
  return (
    <Container>
      <Header>Inscrições</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="#FFFFFF" />
      <Card title="Calourada na UFS" />
      <Card title="Calourada na UFS" />
    </Container>
  );
};

export default Subscribes;
