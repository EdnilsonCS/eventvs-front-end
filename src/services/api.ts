/* eslint-disable no-underscore-dangle */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthService from './AuthService';

const api = axios.create({
  baseURL: 'http://3.230.76.100:8080',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const [refreshToken] = await AsyncStorage.multiGet([
          '@Events:refresh_token',
        ]);

        if (!refreshToken[1]) {
          throw new Error('Refresh token not found');
        }

        const response = await AuthService.getNewToken(refreshToken[1]);
        const { access_token: token, refresh_token } = response.data;
        await AsyncStorage.multiSet([
          ['@Events:refresh_token', refresh_token],
          ['@Events:token', token],
        ]);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (err) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
