import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { FC } from 'react';
import { Colors } from '@styles/theme';
import { TouchableOpacityProps } from 'react-native';
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  TextButton,
} from './styles';

enum ButtonVariants {
  'primary',
  'secondary',
  'tertiary',
}
export type ButtonProps = TouchableOpacityProps & {
  variant?: keyof typeof ButtonVariants;
  isLoading?: boolean;
  mode?: 'contained' | undefined;
  children: string;
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  isLoading = false,
  ...buttonProps
}) => {
  const Component = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    tertiary: TertiaryButton,
  }[variant];

  return (
    <Component disabled={isLoading} {...buttonProps}>
      {isLoading ? (
        <ActivityIndicator animating color={Colors.white} size={20} />
      ) : (
        <TextButton>{children}</TextButton>
      )}
    </Component>
  );
};

export default Button;
