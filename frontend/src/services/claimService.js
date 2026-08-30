import api from './api';

export const submitClaim = async (postId, message) => {
  const response = await api.post(`/posts/${postId}/claim`, { message });
  return response.data;
};

export const getClaimsByPost = async (postId) => {
  const response = await api.get(`/posts/${postId}/claims`);
  return response.data;
};