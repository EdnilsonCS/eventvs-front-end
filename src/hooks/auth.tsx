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
  name: string;
  email: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({ token: '', user: null });
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
    const response = await AuthService.signIn({ email, password });

    const { access_token: token, nome: user } = response.data;

    await AsyncStorage.multiSet([
      ['@Events:token', token],
      ['@Events:user', JSON.stringify(user)],
    ]);
    Api.defaults.headers.authorization = `Bearer ${token}`;
    setData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Events:token', '@Events:user']);
    setData({ token: '', user: null });
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
