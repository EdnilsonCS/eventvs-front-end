import React from 'react';
import { BaseInput, Container, Error } from './styles';

export default function Input({ errorText, ...props }: any): JSX.Element {
  return (
    <Container>
      <BaseInput
        mode="outlined"
        returnKeyType="next"
        underlineColor="transparent"
        selectionColor="#AAA"
        right={<BaseInput.Icon {...props} />}
        {...props}
      />
      {errorText ? <Error>{errorText}</Error> : null}
    </Container>
  );
}
