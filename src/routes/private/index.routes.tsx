import { useAuth } from '@hooks/auth';
import React from 'react';
import AdministratorNavigation from './administrator.routes';
import ParticipantNavigation from './participant.routes';
import ProducerNavigation from './producer.routes';

const IndexRouter: React.FC = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case 'PRODUTOR':
      return (
        <>
          <ProducerNavigation />
        </>
      );
    case 'PARTICIPANTE':
      return (
        <>
          <ParticipantNavigation />
        </>
      );
    case 'ADMINISTRADOR':
      return (
        <>
          <AdministratorNavigation />
        </>
      );
    default:
      return (
        <>
          <ParticipantNavigation />
        </>
      );
  }
};

export default IndexRouter;
