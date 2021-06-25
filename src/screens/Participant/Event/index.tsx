import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import Card from '@components/Card';
import SearchInput from '@components/SearchInput';
import FilterModal from '@components/FilterModal';
import FilterButton from '@components/FilterButton';
import EventService, { IEvent } from '@services/EventService';
import { Container, Header, Wrapper, ContainerMenu } from './styles';

export default function Event(): JSX.Element {
  const [events, setEvents] = useState<IEvent[]>([]);
  const getEventsList = async (): Promise<void> => {
    const data = await EventService.getEventList();

    setEvents(data);
  };
  useEffect(() => {
    getEventsList();
  }, []);
  const navigation = useNavigation();
  return (
    <Container>
      <Header>Eventvs</Header>
      <SearchInput placeholder="Pesquisar..." placeholderTextColor="white" />
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
            btnColor=""
            btnTitle=""
            description={event.descricao}
          />
        ))}
      </Wrapper>
    </Container>
  );
}
