import { useAuth } from '@hooks/auth';
import React from 'react';
import ParticipanteNavigation from './participant.routes';
import ProducerNavigation from './producer.routes';

const IndexRouter: React.FC = () => {
  const { user } = useAuth();

  return <>{true ? <ProducerNavigation /> : <ParticipanteNavigation />}</>;
};

export default IndexRouter;
