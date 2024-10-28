import axios from 'axios';

const API_BASE = 'http://localhost:5000';

export const fetchBookings = () => axios.get(`${API_BASE}/bookings`);
export const addBooking = (data: object) => axios.post(`${API_BASE}/bookings`, data);
export const updateBooking = (id: number, data: object) => axios.put(`${API_BASE}/bookings/${id}`, data);
export const deleteBooking = (id: number) => axios.delete(`${API_BASE}/bookings/${id}`);
