import React from 'react';
import { Text } from 'react-native';
import moment from 'moment';
import 'moment/locale/pt-br';

import { Bold, Button, ButtonText, Container, Title, Wrapper } from './styles';

interface ICard {
  title: string;
  btnTitle: string;
  btnColor: string;
}

export default function Card({
  title,
  btnTitle,
  btnColor,
}: ICard): JSX.Element {
  const formatedDateTime = moment(new Date())
    .locale('pt-br')
    .format('hh:m D/MM/Y');

  return (
    <Container>
      <Wrapper>
        <Title>
          <Bold>{title}</Bold>
        </Title>
        <Button style={{ backgroundColor: btnColor }}>
          <ButtonText>{btnTitle}</ButtonText>
        </Button>
      </Wrapper>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipiscing elit at rhoncus non
        hendrerit ante rutrum iaculis, mi nulla class placerat sociosqu
        facilisis vestibulum sodales tristique massa viverra orci
      </Text>
      <Wrapper>
        <Bold>Rua dos Bobos, 0</Bold>
      </Wrapper>
      <Wrapper>
        <Bold>{formatedDateTime}</Bold>
        <Text>até</Text>
        <Bold>{formatedDateTime}</Bold>
      </Wrapper>
    </Container>
  );
}
