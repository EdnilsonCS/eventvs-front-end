import styled, { css } from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native';
import { Option } from './index';

interface HeaderProps {
  multiple: boolean;
}

interface ListItemNameProps {
  multiple: boolean;
}

interface ListContainerProps {
  multiple: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  padding-bottom: 10px;
  width: 100%;
  padding-bottom: ${getBottomSpace()}px;
  flex: 1;
`;

export const Header = styled.View<HeaderProps>`
  ${props =>
    props.multiple
      ? css`
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border-bottom-width: 1px;

          height: 60px;
          padding-left: 16px;
        `
      : css`
          flex-direction: row;
          align-items: center;
          width: 100%;
          border-bottom-width: 1px;

          height: 60px;
          padding-left: 16px;
        `}
`;

export const ButtonCancel = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const IconGoBack = styled(MaterialIcons).attrs({
  name: 'arrow-back-ios',
  size: 25,
})``;

export const Title = styled.Text`
  margin-left: 8px;

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.15px;
`;

export const ListContainer = styled.View`
  flex: 1;
  margin-top: 20px;
`;

export const List = styled(FlatList as new () => FlatList<Option>)`
  flex: 1;
`;

export const ListItem = styled.TouchableOpacity<ListContainerProps>`
  ${props =>
    props.multiple
      ? css`
          align-self: center;
          align-items: center;
          min-height: 50px;
          flex-direction: row;
        `
      : css`
          align-items: center;
          min-height: 50px;
          flex-direction: row;
        `}
`;

export const ListItemName = styled.Text<ListItemNameProps>`
  ${props =>
    props.multiple
      ? css`
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0.1px;

          margin-left: 34px;
        `
      : css`
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0.1px;

          margin-left: 20px;
        `}
`;

export const IconCheckboxContainer = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const IconDeselectedContainer = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const IconCircle = styled(MaterialIcons).attrs({
  name: 'radio-button-off',
  size: 25,
})``;

export const IconSelectedContainer = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
`;

export const IconSelect = styled(MaterialIcons).attrs({
  name: 'radio-button-checked',
  source: 'MaterialIcons',
  size: 25,
})``;
