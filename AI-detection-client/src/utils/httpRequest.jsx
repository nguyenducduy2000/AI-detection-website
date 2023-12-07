/* eslint-disable no-undef */
import axios from 'axios';

console.log(import.meta.env.VITE_BASE_URL);

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data;
};

export default httpRequest;
