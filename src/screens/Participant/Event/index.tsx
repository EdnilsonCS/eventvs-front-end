import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

import Card from '@components/Card';
import SearchInput from '@components/SearchInput';
import EventService, { IEvent } from '@services/EventService';
import SubscribeService from '@services/SubscribeService';
import dayjs from '@helpers/datas';
import FilterModal, { DataFilter } from '@components/FilterModal';
import { Container, ContainerModal, Header, Wrapper } from './styles';

export default function Event(): JSX.Element {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [events, setEvents] = useState<IEvent[]>([]);
  const filterRefModal = useRef<any>(null);

  const getEventsList = async (): Promise<void> => {
    const data = await EventService.getEvents();

    const eventsList = [...data];

    setEvents(eventsList);
  };

  const onHandleSearchFilter = async (filterString: string): Promise<void> => {
    const filterDate = events.filter(evento => {
      const nameEvento = evento.nome.toLowerCase();
      const stringToComparation = String(filterString).toLowerCase();

      return nameEvento.includes(stringToComparation);
    });
    setEvents(filterDate);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      filterRefModal?.current?.clean();
      getEventsList();
    });
    return unsubscribe;
  }, [navigation]);

  const onHandleFilter = async (data: DataFilter): Promise<void> => {
    let filterEvents: IEvent[] = [];

    let dataFilter: IEvent[] = [];

    dataFilter = await EventService.getEvents();

    filterEvents = [...dataFilter];

    if (data.categoriaId) {
      dataFilter = await EventService.getEventsPublicadoByCategoria(
        data.categoriaId,
      );
    }

    filterEvents = [...dataFilter];

    if (data.dataInicial && data.dataFinal) {
      dataFilter = await EventService.getEventsPublicadoByDate({
        StartDate: dayjs(data.dataInicial).utc().startOf('day').toDate(),
        EndDate: dayjs(data.dataFinal).utc().endOf('day').toDate(),
      });
    }
    filterEvents = [...filterEvents, ...dataFilter];

    filterEvents.forEach((itemF, i) => {
      const findItem = filterEvents.find((item, j) => {
        return itemF.id === item.id && i !== j;
      });
      if (findItem) {
        filterEvents = filterEvents.filter(item => {
          return item.id !== findItem.id;
        });

        filterEvents = [findItem, ...filterEvents];
      }
    });

    filterEvents = filterEvents.filter(evento => {
      let isToRemove = false;

      if (
        data.categoriaId &&
        String(evento.categoria.id) !== String(data.categoriaId)
      ) {
        isToRemove = true;
      }

      if (
        data.dataInicial &&
        !(
          dayjs(dayjs(evento.dataHoraInicio)).isAfter(data.dataInicial) &&
          dayjs(dayjs(data.dataFinal)).isBefore(evento.dataHoraFim)
        )
      ) {
        isToRemove = true;
      }

      return !isToRemove;
    });

    setEvents(filterEvents);
  };

  const handleSubscribe = async (id: number): Promise<void> => {
    await SubscribeService.submitSubscribe({
      evento_id: Number(id),
      participante_id: Number(user.id),
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
      <SearchInput
        onChangeText={e => onHandleSearchFilter(e)}
        placeholder="Pesquisar..."
        placeholderTextColor="white"
      />
      <ContainerModal>
        <FilterModal
          ref={filterRefModal}
          onHandleFilter={onHandleFilter}
          isNotState
        />
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
