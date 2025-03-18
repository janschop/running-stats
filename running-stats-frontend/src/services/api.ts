// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5231',
});

export const getActivities = async () => {
  return await api.get('/api/activities');
};

export const getActivitiesBySport = async (sport: string) => {
  return await api.get(`/api/activities/bySport?sport=${sport}`);
};

export default api;
