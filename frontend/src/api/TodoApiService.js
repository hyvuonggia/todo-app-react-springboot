import { apiClient } from './ApiClient';

export const retrieveAllTodosForUsername = (username) => {
    return apiClient.get(`/users/${username}/todos`);
};

export const deleteTodo = (username, id) => {
    return apiClient.delete(`/users/${username}/todos/${id}`);
};

export const retrieveTodo = (username, id) => {
    return apiClient.get(`/users/${username}/todos/${id}`);
};

export const updateTodo = (username, id, todo) => {
    return apiClient.put(`/users/${username}/todos/${id}`, todo);
};

export const createTodo = (username, todo) => {
    return apiClient.post(`/users/${username}/todos`, todo);
};
