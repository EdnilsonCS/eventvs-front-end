import React from 'react';
import { Button as BaseComp } from 'react-native-paper';
import { FC } from 'react';
import { PrimaryButton, SecondaryButton } from './styles';

enum ButtonVariants {
  'primary',
  'secondary',
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
  }[variant];

  return <Component {...buttonProps}>{children}</Component>;
};

export default Button;
