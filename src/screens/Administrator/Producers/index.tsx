import React, { useCallback, useEffect, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Card, Paragraph, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AdministratorService, {
  IApplicants,
} from '@services/AdministratorService';

import { Colors } from '@styles/theme';
import {
  Bold,
  Container,
  Header,
  SwipeText,
  LeftSwipeIcon,
  LeftSwipeView,
  RightSwipeView,
  ListaChata,
  RightSwipeIcon,
  EmptyView,
} from './styles';

interface Teste extends IApplicants {
  recuso(id: number): void;
  aceito(id: number): void;
}

interface Props {
  re: never;
}

const Items = (props: Teste): JSX.Element => {
  const { situacao, nome, email, cpf } = props;

  const getLeftContent = (): JSX.Element => {
    return (
      <LeftSwipeView onPress={() => props.recuso && props.recuso(props.id)}>
        <LeftSwipeIcon />
        <SwipeText>Negar</SwipeText>
      </LeftSwipeView>
    );
  };

  const getRightContent = (): JSX.Element => {
    return (
      <RightSwipeView onPress={() => props.aceito && props.aceito(props.id)}>
        <RightSwipeIcon />
        <SwipeText>Aceitar</SwipeText>
      </RightSwipeView>
    );
  };

  return (
    <Swipeable
      renderLeftActions={getLeftContent}
      renderRightActions={getRightContent}
    >
      <Card>
        <Card.Title
          title={nome}
          titleStyle={{ color: Colors.purple }}
          subtitle={`CPF: ${cpf}`}
        />
        <Card.Content>
          <Paragraph>Situação: {situacao}</Paragraph>
          <Paragraph>
            Email: <Bold>{email}</Bold>
          </Paragraph>
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

const Producers: React.FC<Props> = () => {
  const navigation = useNavigation();
  const [producers, setProducers] = useState<IApplicants[]>([]);
  const getApplicants = async (): Promise<void> => {
    const data = await AdministratorService.getApplicants();
    setProducers(data);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getApplicants();
    });
    return unsubscribe;
  }, [navigation]);

  const acceptProducer = useCallback(async (id: number): Promise<void> => {
    await AdministratorService.getAccept(id);
    setProducers(producerState => producerState.filter(data => data.id !== id));
  }, []);

  const denyProducer = useCallback(async (id: number): Promise<void> => {
    await AdministratorService.getDeny(id);
    setProducers(producerState => producerState.filter(data => data.id !== id));
  }, []);

  const renderItem: ListRenderItem<IApplicants> = useCallback(
    ({ item }) => (
      <Items
        id={item.id}
        nome={item.nome}
        cpf={item.cpf}
        email={item.email}
        situacao={item.situacao}
        aceito={acceptProducer}
        recuso={denyProducer}
      />
    ),
    [acceptProducer, denyProducer],
  );

  return (
    <Container>
      <Header>Solicitantes</Header>
      <ListaChata
        data={producers}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={
          <EmptyView>
            <Bold>Nenhum produtor solicitado pendente :)</Bold>
          </EmptyView>
        }
        ItemSeparatorComponent={() => <Divider />}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Producers;
