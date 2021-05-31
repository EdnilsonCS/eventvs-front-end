import React from 'react';

import Card from '../../components/Card';
import SearchInput from '../../components/SearchInput';
import { Container, Header, Wrapper } from './styles';

const DATA = [
  {
    title: 'Coachela',
  },
  {
    title: 'Calourada 2025',
  },
  {
    title: 'Rock in Rio',
  },
  {
    title: 'ComicCon',
  },
  {
    title: 'Oscar 2022',
  },
  {
    title: 'Joao Rock',
  },
  {
    title: 'Villa Mix',
  },
  {
    title: 'SEMAC',
  },
  {
    title: 'NLW',
  },
  {
    title: 'Ibiza',
  },
  {
    title: 'Carnaval Salvador',
  },
  {
    title: 'Aplaudir o Sol',
  },
  {
    title: 'Reverenciar a Lua',
  },
  {
    title: 'OktoberFest Blumenau',
  },
  {
    title: 'Cassino em Macau',
  },
];

export default function Event(): JSX.Element {
  return (
    <Container>
      <Header>Eventvs</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="white" />
      <Wrapper>
        {DATA.map(({ title }) => (
          <Card
            key={Math.random().toString()}
            title={title}
            btnColor="#6d43a1"
            btnTitle="Inscrever"
          />
        ))}
      </Wrapper>
    </Container>
  );
}
