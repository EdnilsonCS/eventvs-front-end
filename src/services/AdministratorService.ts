import api from './api';

export interface IApplicants {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  situacao: string;
}

class AdministratorService {
  static async getApplicants(): Promise<IApplicants[]> {
    const { data } = await api.get('/produtores/solicitados');

    return data;
  }
}

export default AdministratorService;
