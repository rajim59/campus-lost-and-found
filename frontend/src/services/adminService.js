import api from './api';

export const getPendingUsers = async () => {
  const response = await api.get('/admin/pending-users');
  return response.data;
};

export const verifyUser = async (id, status) => {
  const response = await api.put(`/admin/verify-user/${id}`, { status });
  return response.data;
};

export const getAllPosts = async () => {
  const response = await api.get('/admin/posts');
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/admin/posts/${id}`);
  return response.data;
};

export const getAllClaims = async () => {
  const response = await api.get('/admin/claims');
  return response.data;
};

export const setClaimDeadline = async (id, deadline) => {
  const response = await api.put(`/admin/claims/${id}/deadline`, { deadline });
  return response.data;
};

export const acceptClaim = async (id) => {
  const response = await api.put(`/admin/claims/${id}/accept`);
  return response.data;
};

export const rejectClaim = async (id) => {
  const response = await api.put(`/admin/claims/${id}/reject`);
  return response.data;
};