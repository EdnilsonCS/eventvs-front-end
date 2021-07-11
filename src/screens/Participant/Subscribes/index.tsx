import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '@hooks/auth';
import SubscribeService, { ISubscribe } from '@services/SubscribeService';
import { useNavigation } from '@react-navigation/native';
import { BlankSpace, Container, Header, Wrapper } from './styles';
import Card from '../../../components/Card';
import SearchInput from '../../../components/SearchInput';

const Subscribes = (): JSX.Element => {
  const { token } = useAuth();
  const [subscribes, setSubscribes] = React.useState<ISubscribe[]>([]);
  const getSubscription = async (filterString: string): Promise<void> => {
    const dados = await SubscribeService.getSubscribeList();

    const filterDate = dados.filter(inscricao => {
      const nameEvento = inscricao.evento.nome.toLowerCase();
      const stringToComparation = String(filterString).toLowerCase();

      return nameEvento.includes(stringToComparation);
    });
    setSubscribes(filterDate);
  };
  React.useEffect(() => {
    getSubscription('');
  }, [token]);
  const navigation = useNavigation();
  const handleCancelButton = async (id: number): Promise<void> => {
    Alert.alert(
      'Cancelar inscrição',
      'Você realmente deseja cancelar sua inscrição',
      [
        {
          text: 'sim',
          onPress: async () => {
            await SubscribeService.cancelSubscription(id);
            getSubscription('');
          },
        },
        { text: 'não', onPress: () => console.log('OK Pressed') },
      ],
    );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getSubscription('');
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Container>
      <Header>Minhas Inscrições</Header>
      <SearchInput
        placeholder="Pesquisar..."
        placeholderTextColor="#FFFFFF"
        onChangeText={e => getSubscription(e)}
      />
      <BlankSpace />
      <Wrapper>
        {subscribes.map(inscricao => (
          <Card
            onPressButton={() => handleCancelButton(inscricao.id)}
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
            type="cancel"
          />
        ))}
      </Wrapper>
    </Container>
  );
};

export default Subscribes;
