import React from 'react';
import { Button as BaseComp } from 'react-native-paper';
import { FC } from 'react';
import { PrimaryButton, SecondaryButton, TertiaryButton } from './styles';

enum ButtonVariants {
  'primary',
  'secondary',
  'tertiary',
}
export type ButtonProps = React.ComponentProps<typeof BaseComp> & {
  variant?: keyof typeof ButtonVariants;
  isLoading?: boolean;
  mode?: 'contained' | undefined;
};

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...buttonProps
}) => {
  const Component = {
    primary: PrimaryButton,
    secondary: SecondaryButton,
    tertiary: TertiaryButton,
  }[variant];

  return <Component {...buttonProps}>{children}</Component>;
};

export default Button;
