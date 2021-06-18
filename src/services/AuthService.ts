import api from './api';

interface ILoginDTO {
  email: string;
  password: string;
}

class AuthService {
  static signIn(data: ILoginDTO): Promise<any> {
    // adicionar logica de integração com a api aqui
    return api.post('/api/core/auth/login-mobile', data);
  }
}

export default AuthService;
