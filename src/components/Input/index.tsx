/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { BaseInput, Container, Error } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  leftIcon?: string;
  rightIcon?: string;
  control: any;
  errors: FieldErrors;
  label: string;
  color: string;
  styleContainer?: object;
}

const Input: React.FC<InputProps> = ({
  errors,
  name,
  control,
  leftIcon,
  label,
  rightIcon,
  color,
  styleContainer,
  ...props
}) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Container style={styleContainer}>
          <BaseInput
            onChange={onChange}
            onBlur={onBlur}
            mode="outlined"
            returnKeyType="next"
            underlineColor="transparent"
            selectionColor="#AAA"
            color={color}
            label={label}
            value={value}
            right={rightIcon && <BaseInput.Icon name={rightIcon} />}
            left={leftIcon && <BaseInput.Icon name={leftIcon} />}
            {...props}
          />
          {errors[name] ? <Error>{errors[name].message}</Error> : null}
        </Container>
      )}
      name={name}
      rules={{ required: true }}
      defaultValue=""
    />
  );
};

export default Input;
