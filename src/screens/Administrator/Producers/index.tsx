import React from 'react';
import { ListRenderItem } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Card, Paragraph, Divider } from 'react-native-paper';

import AdministratorService, {
  IApplicants,
} from '@services/AdministratorService';

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
  recuso: (arg0: any) => any;
  aceito: (arg0: any) => any;
}

interface State {
  producers: IApplicants[];
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
          titleStyle={{ color: '#6a2aba' }}
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

class Producers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      producers: [],
    };
  }

  componentDidMount = (): void => {
    this.getApplicants();
  };

  acceptProducer = async (id: number): Promise<void> => {
    const { producers } = this.state;
    await AdministratorService.getAccept(id);
    const rendeData = [...producers];
    this.setState({ producers: rendeData.filter(data => data.id !== id) });
  };

  denyProducer = async (id: number): Promise<void> => {
    const { producers } = this.state;
    await AdministratorService.getDeny(id);
    const rendeData = [...producers];
    this.setState({ producers: rendeData.filter(data => data.id !== id) });
  };

  renderItem: ListRenderItem<IApplicants> = ({ item }) => (
    <Items
      id={item.id}
      nome={item.nome}
      cpf={item.cpf}
      email={item.email}
      situacao={item.situacao}
      aceito={this.acceptProducer}
      recuso={this.denyProducer}
    />
  );

  getApplicants = async (): Promise<void> => {
    const data = await AdministratorService.getApplicants();
    this.setState({ producers: data });
  };

  render(): JSX.Element {
    const { producers } = this.state;
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
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

export default Producers;
