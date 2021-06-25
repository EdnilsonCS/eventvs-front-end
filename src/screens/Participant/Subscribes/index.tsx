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
  const getSubscription = async (): Promise<void> => {
    const dados = await SubscribeService.getSubscribeList();
    setSubscribes(dados);
  };
  React.useEffect(() => {
    getSubscription();
  }, [token]);

  const handleCancelButton = async (id: number): Promise<void> => {
    Alert.alert(
      'Cancelar inscrição',
      'Você realmente deseja cancelar sua inscrição',
      [
        {
          text: 'sim',
          onPress: async () => {
            await SubscribeService.cancelSubscription(id);
          },
        },
        { text: 'não', onPress: () => console.log('OK Pressed') },
      ],
    );

    getSubscription();
  };

  return (
    <Container>
      <Header>Minhas Inscrições</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="#FFFFFF" />
      {subscribes.map(inscricao => (
        <Card
          onPressCancelButton={() => handleCancelButton(inscricao.id)}
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
