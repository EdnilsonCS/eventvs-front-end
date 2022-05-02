import React from 'react';
import { Menu } from 'react-native-paper';
import Card from '@components/Card';
import SearchInput from '@components/SearchInput';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import EventService, { IEvent } from '@services/EventService';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import FilterModal, { DataFilter } from '@components/FilterModal';
import dayjs from '@helpers/datas';
import { useRef } from 'react';

import { Colors } from '@styles/theme';
import LoaderIndicator from '@components/LoaderIndicator';
import {
  Container,
  Header,
  Wrapper,
  ContainerModal,
  ContainerMenu,
} from './styles';

export default function Event(): JSX.Element {
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  const filterRefModal = useRef<any>(null);
  const [oldArray, setOldArray] = useState<IEvent[]>([]);

  const getEventsList = async (): Promise<void> => {
    setLoading(true);
    const data = await EventService.getEvents();
    const eventsNotPublic = await EventService.getEventsNaoPublicado();

    const eventsList = [...data, ...eventsNotPublic];

    setEvents(eventsList);
    setLoading(false);
  };

  const onHandleSearchFilter = async (filterString: string): Promise<void> => {
    let eventsDate = [];
    if (oldArray.length >= events.length) {
      setEvents(oldArray);
      eventsDate = oldArray;
    } else {
      eventsDate = events;
      setOldArray(events);
    }

    const filterDate = eventsDate.filter(evento => {
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
    setLoading(true);
    let filterEvents: IEvent[] = [];
    if (data.statusEvento === 'PUBLICADO') {
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
    } else {
      let dataFilter: IEvent[] = [];

      dataFilter = await EventService.getEventsNaoPublicado();

      filterEvents = [...dataFilter];

      if (data.categoriaId) {
        dataFilter = await EventService.getEventsNaoPublicadoByCategoria(
          data.categoriaId,
        );
      }

      filterEvents = [...dataFilter];

      if (data.dataInicial && data.dataFinal) {
        dataFilter = await EventService.getEventsNaoPublicadoByDate({
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
    }

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
    setLoading(false);
  };

  return (
    <Container>
      <ContainerMenu>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Icon size={30} name="dots-vertical" />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() =>
              navigation.navigate(PrivateRoutesConstants.AddCategory)
            }
            title="Adicionar categoria"
          />
          <Menu.Item
            onPress={() => navigation.navigate(PrivateRoutesConstants.Add)}
            title="Adicionar Evento"
          />
        </Menu>
      </ContainerMenu>
      <Header>Eventvs</Header>
      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <SearchInput
            onChangeText={e => onHandleSearchFilter(e)}
            placeholder="Pesquisar..."
            placeholderTextColor={Colors.white}
          />
          <ContainerModal>
            <FilterModal
              ref={filterRefModal}
              onHandleFilter={onHandleFilter}
              onClean={() => getEventsList()}
            />
          </ContainerModal>
          <Wrapper>
            {events.map(event => (
              <Card
                onPress={() =>
                  navigation.navigate(PrivateRoutesConstants.EventDetail, {
                    id: event.id,
                  })
                }
                key={event.id}
                title={event.nome}
                logradouro={event.endereco.logradouro}
                numero={event.endereco.numero}
                bairro={event.endereco.bairro}
                cidade={event.endereco.cidade}
                estado={event.endereco.estado}
                dataHoraInicio={event.dataHoraInicio}
                dataHoraFim={event.dataHoraFim}
                description={event.descricao}
              />
            ))}
          </Wrapper>
        </>
      )}
    </Container>
  );
}
