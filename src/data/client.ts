import Axios from "axios";


export const client = Axios.create({baseURL: 'http://localhost:8080'})

export const authenticatedClient = Axios.create({baseURL: 'http://localhost:8080',
    headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
