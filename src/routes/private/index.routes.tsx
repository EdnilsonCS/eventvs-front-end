import { useAuth } from '@hooks/auth';
import React from 'react';
import ParticipantNavigation from './participant.routes';
import ProducerNavigation from './producer.routes';

const IndexRouter: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user?.role === 'PRODUTOR' ? (
        <ProducerNavigation />
      ) : (
        <ParticipantNavigation />
      )}
    </>
  );
};

export default IndexRouter;
