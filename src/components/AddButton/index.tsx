import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from './styles';

function AddButton({ onPress, focused }: any): JSX.Element {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Button
        colors={focused ? ['#828', '#737'] : ['#6a2aba', '#6d43a1']}
        start={[1, 0.2]}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={30}
          color={focused ? '#fff' : '#A7f'}
        />
      </Button>
    </TouchableWithoutFeedback>
  );
}

export default AddButton;
