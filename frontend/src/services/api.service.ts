import axios from 'axios';
import type { Scheme, Medicine, BillAnalysis, ExpensePlan } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aarogya-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const schemeService = {
  getSchemes: async () => {
    const { data } = await api.get<Scheme[]>('/schemes');
    return data;
  },
  matchSchemes: async (profile: any) => {
    const { data } = await api.post<{ matchedSchemes: Scheme[], aiReasoning: string, score: number }>('/schemes/match', profile);
    return data;
  },
};

export const medicineService = {
  search: async (query: string) => {
    const { data } = await api.get<Medicine[]>(`/medicines/search?query=${query}`);
    return data;
  },
  getTopSavings: async () => {
    const { data } = await api.get<Medicine[]>('/medicines/top-savings');
    return data;
  },
};

export const billService = {
  analyze: async (file: File) => {
    const formData = new FormData();
    formData.append('bill', file);
    const { data } = await api.post<BillAnalysis>('/bills/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },
  getHistory: async () => {
    const { data } = await api.get<BillAnalysis[]>('/bills');
    return data;
  },
};

export const expenseService = {
  plan: async (profile: any, history: any) => {
    const { data } = await api.post<ExpensePlan>('/expenses/plan', { profile, history });
    return data;
  },
};

export default api;
