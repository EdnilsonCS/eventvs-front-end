import api from './api';
import { IEvent } from './EventService';

interface IParticipante {
  id: number;
  pessoa: {
    nome: string;
  };
}

export interface ISubscribe {
  id: number;
  dataHora: Date;
  isCancelada: boolean;
  participante: IParticipante;
  evento: IEvent;
}

class SubscribeService {
  static async getSubscribeList(): Promise<ISubscribe[]> {
    const { data } = await api.get<ISubscribe[]>('/inscricoes');

    return data;
  }

  static async getSubscribeDetail(id: number): Promise<ISubscribe> {
    const { data } = await api.get<ISubscribe>(`/inscricoes/${id}`);

    return data;
  }

  static async cancelSubscription(id: number): Promise<void> {
    await api.get<ISubscribe>(`/inscricoes/${id}/cancelar`);
  }
}

export default SubscribeService;
