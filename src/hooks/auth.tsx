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
      const [user, refreshToken] = await AsyncStorage.multiGet([
        '@Events:user',
        '@Events:refresh_token',
      ]);

      if (refreshToken[1]) {
        const response = await AuthService.getNewToken(refreshToken[1]);
        const { access_token: token, refresh_token } = response.data;
        await AsyncStorage.multiSet([
          ['@Events:refresh_token', refresh_token],
          ['@Events:token', token],
        ]);
        if (token && user[1]) {
          Api.defaults.headers.authorization = `Bearer ${token}`;
          setData({ token, user: JSON.parse(user[1]) });
        }
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
      console.log(err);
      throw new Error(err);
    }
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Events:token', '@Events:user']);
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
