import axios from 'axios';
import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../types/task';


const api = axios.create({
    baseURL: 'http://localhost:3000',
})

export const getTasks = async (status?: TaskStatus): Promise<Task[]> => {
    const params = status ? { status } : {};
    const response = await api.get<Task[]>('/tasks', { params });
    return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
}

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await api.post<Task>('/tasks/create', payload);
    return response.data;
}

export const updateTask = async (id: number, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}`, payload);
    return response.data;
}

export const deleteTask = async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
}