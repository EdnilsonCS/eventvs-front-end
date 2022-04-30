import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
`;

export const ButtonContainer = styled.View`
  margin-top: 16px;
`;

export const Header = styled.View`
  margin: 16px;
`;

export const NumberWrapper = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export const Wrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 16,
    margin: 16,
  },
}))``;
