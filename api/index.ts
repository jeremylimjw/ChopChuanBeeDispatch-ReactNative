import axios from 'axios';

export const axiosWrapper = axios.create({
    baseURL: "http://192.168.1.187:3000/api",
    withCredentials: true,
});
