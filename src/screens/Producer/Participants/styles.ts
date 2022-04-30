import { Colors } from '@styles/theme';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 16px;
`;
export const Card = styled.View`
  border-width: 1px;
  border-color: ${Colors.purple};
  border-radius: 10px;
  height: 300px;
  justify-content: space-between;
  margin-bottom: 32px;
  padding: 0px 18px;
`;

export const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 8px 0;
`;

export const WrapperParticipante = styled.View`
  justify-content: flex-start;
  height: 100%;
`;

export const TitleCard = styled.Text`
  color: ${Colors.purple};
  font-size: 20px;
`;

export const NumberOfParticipantsText = styled.Text`
  color: ${Colors.black};
  font-size: 20px;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const Header = styled.Text`
  align-self: center;
  font-size: 42px;
  font-weight: bold;
  font-family: 'Lato';
  margin: 20px 0 20px;
`;
export const ButtonContainer = styled.View`
  margin: 20px 0px;
`;

export const NameParticipante = styled.Text``;
