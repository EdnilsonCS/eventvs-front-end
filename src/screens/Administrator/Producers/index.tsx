import AdministratorService, {
  IApplicants,
} from '@services/AdministratorService';
import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { Card, Paragraph, Divider } from 'react-native-paper';
import { ListRenderItem, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useAuth } from '@hooks/auth';
import { Bold, Container, Header, ListaChata } from './styles';

const getLeftContent = (): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <FontAwesome name="trash" size={30} color="#FFF" />
      <Text>Negar</Text>
    </View>
  );
};

const denyProducer = () => {};

const acceptProducer = () => {};

const Items = ({
  nome,
  cpf,
  email,
  situacao,
}: Partial<IApplicants>): JSX.Element => {
  return (
    <Swipeable
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => {
        console.log('OI');
      }}
    >
      <View style={{ backgroundColor: 'green', height: 50 }}>
        <Text>{nome}</Text>
      </View>
      {/* <Card>
        <Card.Title
          title={nome}
          titleStyle={{ color: '#6a1aba' }}
          subtitle={`CPF: ${cpf}`}
        />
        <Card.Content>
          <Paragraph>Situação: {situacao}</Paragraph>
          <Paragraph>
            Email: <Bold>{email}</Bold>
          </Paragraph>
        </Card.Content>
      </Card> */}
    </Swipeable>
  );
};

const producers1 = [
  {
    nome: 'Ed',
    id: 1,
    email: 'ed@mail.com',
    cpf: '22222222222',
    situacao: 'pendente',
  },
  {
    nome: 'Talarico',
    id: 2,
    email: 'vitao@mail.com',
    cpf: '11111111111',
    situacao: 'pendente',
  },
];
const Producers: React.FC = () => {
  const { token } = useAuth();
  const [producers, setProducers] = React.useState<IApplicants[]>([]);

  const renderItem: ListRenderItem<IApplicants> = ({ item }) => (
    <Items
      nome={item.nome}
      cpf={item.cpf}
      email={item.email}
      situacao={item.situacao}
    />
  );

  const getApplicants = async (): Promise<void> => {
    const data = await AdministratorService.getApplicants();
    setProducers(data);
  };
  React.useEffect(() => {
    getApplicants();
  }, [token]);

  return (
    <Container>
      <Header>Solicitantes</Header>
      <ListaChata
        data={producers1}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Producers;
