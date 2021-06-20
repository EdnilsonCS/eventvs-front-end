import React from 'react';

import api from '@services/api';
import { Container, Header } from './styles';
import Card from '../../../components/Card';
import SearchInput from '../../../components/SearchInput';

interface ISubscribe {
  id: number;
  data_hora: string;
  is_cancelada: number;
  evento_id: number;
  participante_id: number;
}

const Subscribes = (): JSX.Element => {
  const [subscribes, setSubscribes] = React.useState<ISubscribe[]>([]);

  React.useEffect(() => {
    api.get<ISubscribe[]>('/inscricoes').then(response => {
      setSubscribes(response.data);
    });
  }, []);

  return (
    <Container>
      <Header>Minhas Inscrições</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="#FFFFFF" />
      {subscribes.map(title => (
        <Card
          key={title.evento_id.toString()}
          title={title.id.toString()}
          btnColor="#De0b20"
          btnTitle="Cancelar"
        />
      ))}
    </Container>
  );
};

export default Subscribes;
