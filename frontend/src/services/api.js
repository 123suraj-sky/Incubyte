import axios from 'axios';
import { API_URL, API_ENDPOINTS } from '../utils/constants';

const api = axios.create({
  baseURL: API_URL
});

// Add token to requests if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (username, password) => {
    const form = new URLSearchParams();
    form.append('username', username);
    form.append('password', password);
    const response = await api.post(API_ENDPOINTS.LOGIN, form);
    return response.data;
  },
  register: async (username, password) => {
    const response = await api.post(API_ENDPOINTS.REGISTER, { username, password });
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.PROFILE);
    return response.data;
  }
};

export const sweetsService = {
  getAll: async () => {
    const response = await api.get(API_ENDPOINTS.SWEETS);
    return response.data;
  },
  search: async (query) => {
    const response = await api.get(`${API_ENDPOINTS.SWEETS}/search?name=${encodeURIComponent(query)}`);
    return response.data;
  },
  add: async (sweet) => {
    const response = await api.post(API_ENDPOINTS.SWEETS, sweet);
    return response.data;
  },
  update: async (id, sweet) => {
    const response = await api.put(`${API_ENDPOINTS.SWEETS}/${id}`, sweet);
    return response.data;
  },
  remove: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.SWEETS}/${id}`);
    return response.data;
  },
  purchase: async (id) => {
    const response = await api.post(`${API_ENDPOINTS.INVENTORY}/${id}/purchase`);
    return response.data;
  }
};

export const inventoryService = {
  getAll: async () => {
    const response = await api.get(API_ENDPOINTS.INVENTORY);
    return response.data;
  }
};

export default api;