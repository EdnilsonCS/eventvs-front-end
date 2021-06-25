import React from 'react';
import { Menu, Button } from 'react-native-paper';
import Card from '@components/Card';
import SearchInput from '@components/SearchInput';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { PrivateRoutesConstants } from '@routes/constants.routes';
import { Container, Header, Wrapper, ContainerMenu } from './styles';

const DATA = [
  {
    title: 'Coachela',
  },
  {
    title: 'Calourada 2025',
  },
  {
    title: 'Rock in Rio',
  },
  {
    title: 'ComicCon',
  },
  {
    title: 'Oscar 2022',
  },
  {
    title: 'Joao Rock',
  },
  {
    title: 'Villa Mix',
  },
  {
    title: 'SEMAC',
  },
  {
    title: 'NLW',
  },
  {
    title: 'Ibiza',
  },
  {
    title: 'Carnaval Salvador',
  },
  {
    title: 'Aplaudir o Sol',
  },
  {
    title: 'Reverenciar a Lua',
  },
  {
    title: 'OktoberFest Blumenau',
  },
  {
    title: 'Cassino em Macau',
  },
];

export default function Event(): JSX.Element {
  const [visible, setVisible] = useState(false);
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
        {DATA.map(({ title }) => (
          <Card
            key={Math.random().toString()}
            title={title}
            btnColor=""
            btnTitle=""
          />
        ))}
      </Wrapper>
    </Container>
  );
}
