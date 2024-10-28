import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchOfferings = () => axios.get(`${API_BASE}/offerings`);
export const addOffering = (data: object) => axios.post(`${API_BASE}/offerings`, data);
export const updateOffering = (id: number, data: object) => axios.put(`${API_BASE}/offerings/${id}`, data);
export const deleteOffering = (id: number) => axios.delete(`${API_BASE}/offerings/${id}`);
