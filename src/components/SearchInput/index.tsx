import React from 'react';

import { Container, Input } from './styles';

function SearchInput({ ...props }: any): JSX.Element {
  return (
    <Container>
      <Input {...props} />
    </Container>
  );
}

export default SearchInput;
