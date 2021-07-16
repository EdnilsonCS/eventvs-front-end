/* eslint-disable consistent-return */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '@services/AuthService';
import { showMessage } from 'react-native-flash-message';
import Api from '../services/api';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | Record<string, string>;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({ token: '', user: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Events:token',
        '@Events:user',
      ]);
      if (token[1] && user[1]) {
        Api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await AuthService.signIn({ email, password });

      const { access_token: token, refresh_token } = response.data;
      const user = {
        id: response.data.pessoa_id,
        email: response.data.email,
        name: response.data.nome,
        role: response.data.role,
      };
      await AsyncStorage.multiSet([
        ['@Events:refresh_token', refresh_token],
        ['@Events:token', token],
        ['@Events:user', JSON.stringify(user)],
      ]);
      Api.defaults.headers.authorization = `Bearer ${token}`;
      setData({
        token,
        user,
      });
    } catch (err) {
      if (err.response) {
        showMessage({
          message: err.response.data.error_description,
          type: 'danger',
          icon: 'danger',
          duration: 5000,
        });
      } else {
        showMessage({
          message: 'verifique sua conexão com a internet',
          type: 'danger',
          icon: 'danger',
          duration: 5000,
        });
      }
      throw new Error(err);
    }
    console.log('aqui no login');
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@Events:token',
      '@Events:user',
      '@Events:refresh_token',
    ]);
    setData({ token: '', user: {} });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signIn,
        user: data.user,
        signOut,
        token: data.token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
