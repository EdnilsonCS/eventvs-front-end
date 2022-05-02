import { useRoute } from '@react-navigation/native';
import Button from '@components/Button';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ParticipantsService, {
  IParticipantes,
} from '@services/ParticipantsService';
import LoaderIndicator from '@components/LoaderIndicator';
import {
  Bold,
  Container,
  Card,
  Header,
  TitleCard,
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
  const [isLoading, setLoading] = useState(true);
  const [participantes, setParticipantes] = useState<IParticipantes[]>([]);
  const { params } = useRoute();
  const routeParams = params as RouteParams;
  const navigation = useNavigation();
  useEffect(() => {
    const getEventDetail = async (): Promise<void> => {
      setLoading(true);
      const data = await ParticipantsService.getParticipantsByEventId(
        routeParams.id,
      );
      setParticipantes(data);
    };

    getEventDetail();
    setLoading(false);
  }, [routeParams.id]);

  return (
    <Container>
      <Header>Detalhes</Header>
      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <Card>
            <View>
              <Wrapper>
                <TitleCard>
                  <Bold>Participantes</Bold>
                </TitleCard>

                <NumberOfParticipantsText>
                  <Bold>{participantes.length}</Bold>
                </NumberOfParticipantsText>
              </Wrapper>
            </View>
            <WrapperParticipante>
              {participantes.map(item => (
                <NameParticipante key={Math.random().toString()}>
                  {item.participante.pessoa.nome}
                </NameParticipante>
              ))}
            </WrapperParticipante>
          </Card>
          <ButtonContainer>
            <Button
              variant="tertiary"
              style={{ marginBottom: 14 }}
              onPress={() => navigation.goBack()}
            >
              Voltar
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default Published;
