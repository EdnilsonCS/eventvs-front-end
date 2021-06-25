import { Container } from '@screens/Participant/Profile/styles';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { Text } from 'react-native-paper';
import EventService, { IEvent } from '@services/EventService';
import { useState } from 'react';
import { useMemo } from 'react';
import dayjs from '@helpers/datas';
import {
  Bold,
  Button,
  ButtonText,
  Card,
  Header,
  Title,
  Wrapper,
} from './styles';

interface RouteParams {
  id: number;
}
const Published: React.FC = () => {
  const [dados, setDados] = useState<IEvent | null>(null);
  const { params } = useRoute();
  const routeParams = params as RouteParams;

  useEffect(() => {
    const getEventDetail = async (): Promise<void> => {
      const data = await EventService.getEventDetail(routeParams.id);
      setDados(data);
    };

    getEventDetail();
  }, [routeParams.id]);
  const formattedAndres = `${dados?.endereco.logradouro}, ${dados?.endereco.numero}, ${dados?.endereco.bairro}, ${dados?.endereco.cidade},${dados?.endereco.estado}`;
  const formattedDateInicio = useMemo(() => {
    return dayjs(dados?.dataHoraInicio)
      .locale('pt-br')
      .format('hh:m DD/MM/YYYY');
  }, [dados]);
  const formattedDateFim = useMemo(() => {
    return dayjs(dados?.dataHoraFim).locale('pt-br').format('hh:m DD/MM/YYYY');
  }, [dados]);
  return (
    <Container>
      <Header>Eventvs</Header>
      <Card>
        <Wrapper>
          <Title>
            <Bold>{dados?.nome}</Bold>
          </Title>
        </Wrapper>
        <Text>{dados?.descricao}</Text>
        <Wrapper>
          <Bold>{formattedAndres}</Bold>
        </Wrapper>
        <Wrapper>
          <Bold>{formattedDateInicio}</Bold>
          <Text>até</Text>
          <Bold>{formattedDateFim}</Bold>
        </Wrapper>
      </Card>
    </Container>
  );
};

export default Published;
