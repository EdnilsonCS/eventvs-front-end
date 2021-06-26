import axios from 'axios';

const api = axios.create({
  baseURL: 'http://35.172.217.95:8080',
});

export default api;
