import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7195/api',
});

// Add token to all requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
