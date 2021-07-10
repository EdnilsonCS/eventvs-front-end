import api from './api';

export interface IEvent {
  id: number;
  categoriaId: number;
  dataHoraFim: Date;
  dataHoraInicio: Date;
  descricao: string;
  endereco: {
    id: string;
    logradouro: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: number;
  };
  nome: string;
  statusEvento: string;
}

export interface IEventCreateDTO {
  descrição: string;
  categoriaId: number;
  dataHoraFim: Date;
  dataHoraInicio: Date;
  descricao: string;
  endereco: {
    logradouro: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: number;
  };
  nome: string;
  statusEvento: string;
}

class EventService {
  static async createNewEvent(event: IEventCreateDTO): Promise<Event> {
    const { data } = await api.post<IEvent>('/eventos', event);

    return data;
  }

  static async getNotSubscribeEvents(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>('/eventos/publicados_filtro');

    return data;
  }

  static async getEvents(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>('/eventos/publicados');

    return data;
  }

  static async getEventDetail(id: number): Promise<IEvent> {
    const { data } = await api.get<IEvent>(`/eventos/${id}`);

    return data;
  }

  static async publicEvent(id: number): Promise<void> {
    await api.patch<IEvent>(`/eventos/${id}/publicar`);
  }

  static async deleteEvent(id: number): Promise<void> {
    await api.delete<IEvent>(`/eventos/${id}`);
  }

  static async cancelEvent(id: number): Promise<void> {
    await api.patch<IEvent>(`/eventos/${id}/cancelar`);
  }
}

export default EventService;
