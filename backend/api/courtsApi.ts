import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchCourts = () => axios.get(`${API_BASE}/courts`);
export const addCourt = (data: object) => axios.post(`${API_BASE}/courts`, data);
export const updateCourt = (id: number, data: object) => axios.put(`${API_BASE}/courts/${id}`, data);
export const deleteCourt = (id: number) => axios.delete(`${API_BASE}/courts/${id}`);
