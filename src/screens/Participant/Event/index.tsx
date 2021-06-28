import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

import Card from '@components/Card';
import SearchInput from '@components/SearchInput';
import FilterModal from '@components/FilterModal';
import EventService, { IEvent } from '@services/EventService';
import SubscribeService from '@services/SubscribeService';
import { Container, ContainerModal, Header, Wrapper } from './styles';

export default function Event(): JSX.Element {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [events, setEvents] = useState<IEvent[]>([]);
  const getEventsList = async (): Promise<void> => {
    const data = await EventService.getEventList();

    setEvents(data);
  };
  useEffect(() => {
    getEventsList();
  }, []);

  const handleSubscribe = async (id: number): Promise<void> => {
    await SubscribeService.submitSubscribe({
      evento_id: id,
      participante_id: user.id,
    });

    getEventsList();
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getEventsList();
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <Container>
      <Header>Eventvs</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="white" />
      <ContainerModal>
        <FilterModal />
      </ContainerModal>
      <Wrapper>
        {events.map(event => (
          <Card
            key={event.id}
            title={event.nome}
            logradouro={event.endereco.logradouro}
            numero={event.endereco.numero}
            bairro={event.endereco.bairro}
            cidade={event.endereco.cidade}
            estado={event.endereco.estado}
            dataHoraInicio={event.dataHoraInicio}
            dataHoraFim={event.dataHoraFim}
            onPressButton={() => handleSubscribe(event.id)}
            type="ok"
            btnColor=""
            btnTitle=""
            description={event.descricao}
          />
        ))}
      </Wrapper>
    </Container>
  );
}
