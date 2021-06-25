import api from './api';

export interface IEvent {
  id: string;
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

  static async getEventList(): Promise<IEvent[]> {
    const { data } = await api.get<IEvent[]>('/eventos/publicados');

    return data;
  }
}

export default EventService;
