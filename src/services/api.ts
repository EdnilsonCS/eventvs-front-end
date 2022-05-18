/* eslint-disable no-underscore-dangle */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import AuthService from './AuthService';

const api = axios.create({
  baseURL: 'http://10.0.2.2:8080',
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    const [refreshToken] = await AsyncStorage.multiGet([
      '@Events:refresh_token',
    ]);

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken[1]
    ) {
      originalRequest._retry = true;
      const response = await AuthService.getNewToken(refreshToken[1]);
      const { access_token: token, refresh_token } = response.data;
      await AsyncStorage.multiSet([
        ['@Events:refresh_token', refresh_token],
        ['@Events:token', token],
      ]);
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
