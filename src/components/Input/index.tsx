import React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import { BaseInput, Container, Error } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  control: any;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  errors,
  name,
  control,
  icon,
  ...props
}) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Container>
          <BaseInput
            onChange={onChange}
            onBlur={onBlur}
            mode="outlined"
            returnKeyType="next"
            underlineColor="transparent"
            selectionColor="#AAA"
            value={value}
            left={<BaseInput.Icon name={icon} />}
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
