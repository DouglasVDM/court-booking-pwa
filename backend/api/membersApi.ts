import axios from 'axios';
import { Member } from '../../types';

const API_BASE = 'http://localhost:5000';

export const fetchMembers = async (): Promise<Member[]> => {
    const response = await axios.get(`${API_BASE}/members`);
    return response.data;
};

export const addMember = async (data: Omit<Member, 'member_id'>): Promise<Member> => {
    const response = await axios.post(`${API_BASE}/members`, data);
    return response.data;
};

export const updateMember = async (id: number, data: Partial<Member>): Promise<Member> => {
    const response = await axios.put(`${API_BASE}/members/${id}`, data);
    return response.data;
};

export const deleteMember = async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/members/${id}`);
};
