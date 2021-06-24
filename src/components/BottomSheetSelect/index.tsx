import React from 'react';
import {
  Container,
  Content,
  Title,
  Header,
  ButtonCancel,
  List,
  ListItem,
  ListItemName,
  ListContainer,
  IconCircle,
  IconSelectedContainer,
  IconDeselectedContainer,
  IconSelect,
  IconCheckboxContainer,
  IconGoBack,
} from './styles';

import CheckBoxButton from '../CheckboxButton';

export interface Option {
  id: string;
  name: string;
}

interface BottomSheetSelectProps {
  title: string;
  onClose: () => void;
  onSelectItem: (value: Option) => void;
  options: Option[];
  value: string;
  multiple: boolean;
  goBackTitle?: boolean;
}

const BottomSheetSelect: React.FC<BottomSheetSelectProps> = ({
  title,
  onClose,
  onSelectItem,
  options,
  value,
  multiple,
  goBackTitle,
}) => {
  const renderItem = (item: Option) => {
    const IconChecked = () => {
      if (multiple) return null;
      if (item.id === value) {
        return (
          <IconSelectedContainer testID={String(item.id)}>
            <IconSelect />
          </IconSelectedContainer>
        );
      }
      return (
        <IconDeselectedContainer testID={String(item.id)}>
          <IconCircle />
        </IconDeselectedContainer>
      );
    };

    return (
      <ListItem
        testID={`list-item ${item.id}`}
        multiple={multiple}
        onPress={() => {
          onSelectItem(item);
        }}
      >
        <IconChecked />
        {multiple && (
          <IconCheckboxContainer testID={String(item.id)}>
            <CheckBoxButton checked={value.includes(item.id)} />
          </IconCheckboxContainer>
        )}
        <ListItemName multiple={multiple}>
          {item.name.length <= 30
            ? item.name
            : `${item.name.substring(0, 30)}...`}
        </ListItemName>
      </ListItem>
    );
  };

  return (
    <Container>
      <Content>
        <Header multiple={multiple}>
          {goBackTitle && (
            <ButtonCancel onPress={onClose}>
              <IconGoBack />
            </ButtonCancel>
          )}
          <Title>{title}</Title>
        </Header>
        <ListContainer>
          <List
            keyExtractor={item => item.id.toString()}
            data={options}
            renderItem={({ item }) => renderItem(item)}
          />
        </ListContainer>
      </Content>
    </Container>
  );
};

export default BottomSheetSelect;
