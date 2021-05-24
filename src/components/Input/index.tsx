import React from 'react';
import { BaseInput, Container, Error } from './styles';

export default function Input({ errorText, ...props }: any) {
  return (
    <Container>
      <BaseInput
        mode="outlined"
        returnKeyType="next"
        underlineColor="transparent"
        selectionColor="#AAA"
        left={<BaseInput.Icon {...props} />}
        {...props}
      />
      {errorText ? <Error>{errorText}</Error> : null}
    </Container>
  );
}
