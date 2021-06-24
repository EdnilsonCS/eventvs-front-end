import api from './api';

interface IEvent {
  id: string;
  descrição: string;
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

interface IEventCreateDTO {
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
    const { data } = await api.post<IEvent>('/criar/participantes', event);

    return data;
  }
}

export default EventService;
