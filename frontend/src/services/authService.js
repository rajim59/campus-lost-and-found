import api from './api';

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Student login — sends studentId to backend
export const login = async (studentId, password) => {
  const response = await api.post('/auth/login', { studentId, password });
  return response.data;
};

// Admin login — sends email and password to dedicated endpoint
export const adminLogin = async (email, password) => {
  const response = await api.post('/auth/admin-login', { email, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};