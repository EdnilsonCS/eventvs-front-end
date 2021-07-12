import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import EventService, { IEvent } from '@services/EventService';
import React, { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from '@helpers/datas';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import {
  Bold,
  Button,
  Container,
  Card,
  Header,
  Title,
  Wrapper,
  ButtonContainer,
} from './styles';

interface RouteParams {
  id: number;
}
const Published: React.FC = () => {
  const [dados, setDados] = useState<IEvent | null>(null);
  const { params } = useRoute();
  const routeParams = params as RouteParams;
  const navigation = useNavigation();
  useEffect(() => {
    const getEventDetail = async (): Promise<void> => {
      const data = await EventService.getEventDetail(routeParams.id);
      setDados(data);
    };

    getEventDetail();
  }, [routeParams.id]);

  const handleNavigationToParticipantes = (id: number): void => {
    navigation.navigate(PrivateRoutesConstants.ProducerParticipantScreen, {
      id,
    });
  };

  const handlePublicar = async (id: number): Promise<void> => {
    await EventService.publicEvent(id);
    navigation.navigate(PrivateRoutesConstants.Event);
  };

  const handleEdit = async (id: number): Promise<void> => {
    navigation.navigate(PrivateRoutesConstants.Edit, {
      id,
    });
  };
  const handleCancelar = async (id: number): Promise<void> => {
    await EventService.cancelEvent(id);
    navigation.navigate(PrivateRoutesConstants.Event);
  };
  const handleRemover = async (id: number): Promise<void> => {
    await EventService.deleteEvent(id);
    navigation.navigate(PrivateRoutesConstants.Event);
  };
  const formattedAndres = `${dados?.endereco.logradouro}, ${dados?.endereco.numero}, ${dados?.endereco.bairro}, ${dados?.endereco.cidade},${dados?.endereco.estado}`;
  const formattedDateInicio = useMemo(() => {
    return dayjs(dados?.dataHoraInicio)
      .locale('pt-br')
      .format('DD/MM/YYYY HH:mm');
  }, [dados]);
  const formattedDateFim = useMemo(() => {
    return dayjs(dados?.dataHoraFim).locale('pt-br').format('DD/MM/YYYY HH:mm');
  }, [dados]);
  return (
    <Container>
      <Header>Detalhes</Header>
      <Card>
        <View>
          <Wrapper>
            <Title>
              <Bold>{dados?.nome}</Bold>
            </Title>
          </Wrapper>
          <Text>{dados?.descricao}</Text>
        </View>
        <View>
          <Wrapper>
            <Bold>{formattedAndres}</Bold>
          </Wrapper>
          <Wrapper>
            <Bold>{formattedDateInicio}</Bold>
            <Text>até</Text>
            <Bold>{formattedDateFim}</Bold>
          </Wrapper>
        </View>
      </Card>
      <ButtonContainer>
        {dados?.statusEvento === 'PUBLICADO' ? (
          <>
            <Button
              style={{ backgroundColor: '#6A2ABA', marginBottom: 14 }}
              onPress={() => handleNavigationToParticipantes(routeParams.id)}
            >
              Visualizar participantes
            </Button>
            <Button
              style={{ backgroundColor: '#DE0b20', marginBottom: 14 }}
              onPress={() => handleCancelar(routeParams.id)}
            >
              cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ backgroundColor: '#6A2ABA', marginBottom: 14 }}
              onPress={() => handlePublicar(routeParams.id)}
            >
              Publicar
            </Button>
            <Button
              style={{ backgroundColor: '#6A2ABA', marginBottom: 14 }}
              onPress={() => handleEdit(routeParams.id)}
            >
              editar
            </Button>
            <Button
              style={{ backgroundColor: '#DE0b20', marginBottom: 14 }}
              onPress={() => handleRemover(routeParams.id)}
            >
              Remover
            </Button>
          </>
        )}

        <Button
          style={{ backgroundColor: '#DE0b20', marginBottom: 14 }}
          onPress={() => navigation.goBack()}
        >
          Voltar
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default Published;
