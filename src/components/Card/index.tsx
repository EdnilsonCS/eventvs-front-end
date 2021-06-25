import dayjs from '@helpers/datas';
import React, { useMemo } from 'react';
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
  dataHoraInicio: Date;
  dataHoraFim: Date;
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
  dataHoraInicio,
  dataHoraFim,
}: ICard): JSX.Element {
  const formattedAndres = `${logradouro}, ${numero}, ${bairro}, ${cidade},${estado}`;
  const formattedDateInicio = useMemo(() => {
    return dayjs(dataHoraInicio).locale('pt-br').format('hh:m DD/MM/YYYY');
  }, [dataHoraInicio]);
  const formattedDateFim = useMemo(() => {
    return dayjs(dataHoraFim).locale('pt-br').format('hh:m DD/MM/YYYY');
  }, [dataHoraFim]);
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
        <Bold>{formattedDateInicio}</Bold>
        <Text>até</Text>
        <Bold>{formattedDateFim}</Bold>
      </Wrapper>
    </Container>
  );
}
