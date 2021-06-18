import api from './api';

interface ILoginDTO {
  email: string;
  password: string;
}

class AuthService {
  static signIn(data: ILoginDTO): Promise<any> {
    return api.post('/api/core/auth/login-mobile', data);
  }
}

export default AuthService;
