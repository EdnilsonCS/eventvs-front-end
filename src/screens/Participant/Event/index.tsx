import React from 'react';
import { Menu, Button } from 'react-native-paper';
import Card from '@components/Card';
import SearchInput from '@components/SearchInput';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import { useEffect } from 'react';
import EventService, { IEvent } from '@services/EventService';
import { Container, Header, Wrapper, ContainerMenu } from './styles';

export default function Event(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    const getEventsList = async (): Promise<void> => {
      const data = await EventService.getEventList();

      setEvents(data);
    };

    getEventsList();
  }, []);
  const navigation = useNavigation();
  return (
    <Container>
      <ContainerMenu>
        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={(
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Icon size={30} name="dots-vertical" />
            </TouchableOpacity>
          )}
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
