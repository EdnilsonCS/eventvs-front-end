import React from 'react';

import api from '@services/api';
import { Alert } from 'react-native';
import { useAuth } from '@hooks/auth';
import SubscribeService, { ISubscribe } from '@services/SubscribeService';
import { Container, Header } from './styles';
import Card from '../../../components/Card';
import SearchInput from '../../../components/SearchInput';

const Subscribes = (): JSX.Element => {
  const { token } = useAuth();
  const [subscribes, setSubscribes] = React.useState<ISubscribe[]>([]);

  React.useEffect(() => {
    const getSubscription = async (): Promise<void> => {
      const dados = await SubscribeService.getSubscribeList();
      setSubscribes(dados);
    };

    getSubscription();
  }, [token]);

  return (
    <Container>
      <Header>Minhas Inscrições</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="#FFFFFF" />
      {subscribes.map(inscricao => (
        <Card
          key={inscricao?.id.toString()}
          description={inscricao.evento.descricao}
          title={inscricao?.evento.nome}
          logradouro={inscricao?.evento.endereco.logradouro}
          numero={inscricao?.evento.endereco.numero}
          bairro={inscricao?.evento.endereco.bairro}
          cidade={inscricao?.evento.endereco.cidade}
          estado={inscricao?.evento.endereco.estado}
          dataHoraInicio={inscricao.evento.dataHoraInicio}
          dataHoraFim={inscricao.evento.dataHoraFim}
          btnColor="#De0b20"
          btnTitle="Cancelar"
        />
      ))}
    </Container>
  );
};

export default Subscribes;
