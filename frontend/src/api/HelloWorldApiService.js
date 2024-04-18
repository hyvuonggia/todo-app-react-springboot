import { apiClient } from './ApiClient';

export const retrieveHelloWorldBean = () => {
    return apiClient.get('/hello-world-bean');
};


