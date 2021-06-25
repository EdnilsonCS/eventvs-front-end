import dayjs from '@helpers/datas';
import React from 'react';
import { Text } from 'react-native';

import { Bold, Button, ButtonText, Container, Title, Wrapper } from './styles';

interface ICard {
  title: string;
  description: string;
  btnTitle: string;
  btnColor: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
}

export default function Card({
  title,
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
  btnTitle,
  btnColor,
  description,
}: ICard): JSX.Element {
  const formatedDateTime = dayjs(new Date())
    .locale('pt-br')
    .format('hh:m DD/MM/YYYY');
  const formattedAndres = `${logradouro}, ${numero}, ${bairro}, ${cidade},${estado}`;
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
      <Text>{description}</Text>
      <Wrapper>
        <Bold>{formattedAndres}</Bold>
      </Wrapper>
      <Wrapper>
        <Bold>{formatedDateTime}</Bold>
        <Text>até</Text>
        <Bold>{formatedDateTime}</Bold>
      </Wrapper>
    </Container>
  );
}
