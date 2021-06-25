/* eslint-disable @typescript-eslint/ban-types */
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { TextInputProps } from 'react-native';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
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
  inputMask?: boolean;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  disabled?: boolean;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    errors,
    name,
    control,
    leftIcon,
    label,
    rightIcon,
    color,
    styleContainer,
    disabled,
    inputMask,
    type,
    options,
    ...props
  },
  ref,
) => {
  const inputElementRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    focus() {
      if (inputMask) {
        inputElementRef.current.getElement().focus();
      } else {
        inputElementRef.current.focus();
      }
    },
  }));
  const [rawValue, setRawValue] = useState<string | undefined>('');
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <Container style={styleContainer}>
          {inputMask && type ? (
            <TextInputMask
              ref={inputElementRef}
              type={type}
              disabled={disabled}
              options={options}
              includeRawValueInChangeText
              onBlur={onBlur}
              value={value}
              testID="test-mask-input-id"
              onChangeText={(maskedValue, unmaskedValue) => {
                setRawValue(unmaskedValue);
                onChange(maskedValue);
              }}
              customTextInput={BaseInput}
              customTextInputProps={{
                rawValue,
                error: errors[name],
                label,
                ...props,
              }}
            />
          ) : (
            <BaseInput
              disabled={disabled}
              error={errors[name]}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="next"
              selectionColor="#AAA"
              label={label}
              value={value}
              right={rightIcon && <BaseInput.Icon name={rightIcon} />}
              left={leftIcon && <BaseInput.Icon name={leftIcon} />}
              {...props}
            />
          )}
          {errors[name] ? <Error>{errors[name].message}</Error> : null}
        </Container>
      )}
      name={name}
      rules={{ required: true }}
      defaultValue=""
    />
  );
};

export default forwardRef(Input);
