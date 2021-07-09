import { IApplicants } from '@services/AdministratorService';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 16px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;
export const Header = styled.Text`
  align-self: center;
  font-size: 30px;
  padding: 15px;
  font-weight: bold;
  font-family: Lato;
`;

export const ListaChata = styled.FlatList`` as unknown as FlatList<IApplicants>;
