/* eslint-disable react/require-default-props */
import dayjs from '@helpers/datas';
import React, { useMemo } from 'react';
import { Text } from 'react-native';

import { Bold, Button, ButtonText, Container, Title, Wrapper } from './styles';

interface ICard {
  title: string;
  description: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  dataHoraInicio: Date;
  dataHoraFim: Date;
  type?: 'cancel' | 'ok';
  onPress?: () => void;
  onPressButton?: () => void;
}

export default function Card({
  title,
  logradouro,
  numero,
  bairro,
  cidade,
  estado,

  description,
  dataHoraInicio,
  dataHoraFim,
  onPressButton,
  type,
  onPress,
}: ICard): JSX.Element {
  const formattedAndres = `${logradouro}, ${numero}, ${bairro}, ${cidade},${estado}`;
  const formattedDateInicio = useMemo(() => {
    return dayjs(dataHoraInicio).locale('pt-br').format('DD/MM/YYYY HH:mm');
  }, [dataHoraInicio]);
  const formattedDateFim = useMemo(() => {
    return dayjs(dataHoraFim).locale('pt-br').format('DD/MM/YYYY HH:mm');
  }, [dataHoraFim]);
  return (
    <Container onPress={onPress} disabled={!onPress}>
      <Wrapper>
        <Title numberOfLines={1}>{title}</Title>

        {onPressButton && (
          <Button
            onPress={onPressButton}
            style={{
              backgroundColor: type === 'cancel' ? '#DE0b20' : '#6A2ABA',
            }}
          >
            <ButtonText>
              {type === 'cancel' ? 'Cancelar' : 'Inscrever'}
            </ButtonText>
          </Button>
        )}
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
