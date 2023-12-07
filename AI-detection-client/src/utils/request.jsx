import axios from 'axios';

// This request file is hardcoded, not a good practice for developing applications.
// It's just for learning purposes. This file is not used in production.
// It is recommended to use file httpRequest.js instead.
const request = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export default request;
