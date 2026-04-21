import Axios from "axios";


export const client = Axios.create({baseURL: 'http://localhost:8080'})

export const authenticatedClient = Axios.create({baseURL: 'http://localhost:8080'})

authenticatedClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})