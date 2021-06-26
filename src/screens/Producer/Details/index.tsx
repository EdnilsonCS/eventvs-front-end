import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import EventService, { IEvent } from '@services/EventService';
import React, { useMemo, useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from '@helpers/datas';
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

  const handleNavigationToParticipantes = (id: number) => {};

  const handlePublicar = () => {};

  const handleRemover = () => {};
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
              onPress={() => handleNavigationToParticipantes(dados.id)}
            >
              Visualizar participantes
            </Button>
            <Button
              style={{ backgroundColor: '#DE0b20', marginBottom: 14 }}
              onPress={() => handleCancelar()}
            >
              cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{ backgroundColor: '#6A2ABA', marginBottom: 14 }}
              onPress={() => handlePublicar()}
            >
              Publicar
            </Button>
            <Button
              style={{ backgroundColor: '#6A2ABA', marginBottom: 14 }}
              onPress={() => handlePublicar()}
            >
              editar
            </Button>
            <Button
              style={{ backgroundColor: '#DE0b20', marginBottom: 14 }}
              onPress={() => handleRemover()}
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
