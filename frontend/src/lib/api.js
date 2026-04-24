import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aarogya-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me')
};

export const schemeAPI = {
  match: (data) => api.post('/schemes/match', data)
};

export const billAPI = {
  analyze: (formData) => api.post('/bills/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

export const medicineAPI = {
  search: (query) => api.get(`/medicines/search?q=${query}`)
};

export const chatAPI = {
  sendMessage: (message) => api.post('/chat', { message })
};

export const abhaAPI = {
  verify: (abhaNumber) => api.post('/abha/verify', { abhaNumber }),
  fetchProfile: (transactionId, otp) => api.post('/abha/fetch', { transactionId, otp })
};

export default api;
