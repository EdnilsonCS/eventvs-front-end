import React from 'react';
import {
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { LinearGradientView } from './styles';

interface AddButtonProps extends TouchableWithoutFeedbackProps {
  focused: boolean;
}

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
  focused,
  ...props
}) => {
  return (
    <TouchableWithoutFeedback {...props} onPress={onPress}>
      <LinearGradientView
        colors={focused ? ['#828', '#737'] : ['#6a2aba', '#6d43a1']}
        start={{ x: 1, y: 0.2 }}
      >
        <MaterialCommunityIcons
          name="plus-circle-outline"
          size={30}
          color={focused ? '#fff' : '#A7f'}
        />
      </LinearGradientView>
    </TouchableWithoutFeedback>
  );
};

export default AddButton;
