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
  NameParticipante,
} from './styles';

interface RouteParams {
  id: number;
}
const Published: React.FC = () => {
  const [dados, setDados] = useState<IEvent | null>(null);
  const [participantes, setParticipantes] = useState([]);
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
        </View>
        <View>
          {participantes.map(item => (
            <NameParticipante>{item.name}</NameParticipante>
          ))}
        </View>
      </Card>
      <ButtonContainer>
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
