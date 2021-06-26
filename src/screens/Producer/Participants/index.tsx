import { useRoute } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ParticipantsService, {
  IParticipantes,
} from '@services/ParticipantsService';
import {
  Bold,
  Button,
  Container,
  Card,
  Header,
  Title,
  NumberOfParticipantsText,
  Wrapper,
  ButtonContainer,
  NameParticipante,
  WrapperParticipante,
} from './styles';

interface RouteParams {
  id: number;
}
const Published: React.FC = () => {
  const [participantes, setParticipantes] = useState<IParticipantes[]>([]);
  const { params } = useRoute();
  const routeParams = params as RouteParams;
  const navigation = useNavigation();
  useEffect(() => {
    const getEventDetail = async (): Promise<void> => {
      const data = await ParticipantsService.getParticipantsByEventId(
        routeParams.id,
      );
      setParticipantes(data);
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
              <Bold>Participantes</Bold>
            </Title>

            <NumberOfParticipantsText>
              <Bold>{participantes.length}</Bold>
            </NumberOfParticipantsText>
          </Wrapper>
        </View>
        <WrapperParticipante>
          {participantes.map(item => (
            <NameParticipante>{item.participante.pessoa.nome}</NameParticipante>
          ))}
        </WrapperParticipante>
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
