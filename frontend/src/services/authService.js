import api from './api';

export const register = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (emailOrStudentId, password) => {
  const response = await api.post('/auth/login', { emailOrStudentId, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};