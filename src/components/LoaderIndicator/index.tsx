import { Colors } from '@styles/theme';
import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { ContainerLoading } from './styles';

const LoaderIndicator = (): JSX.Element => {
  return (
    <ContainerLoading>
      <ActivityIndicator animating color={Colors.purple} size={40} />
    </ContainerLoading>
  );
};

export default LoaderIndicator;
