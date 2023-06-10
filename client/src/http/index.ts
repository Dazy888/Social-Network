import axios from "axios"

// export const API_URL = 'https://social-network-api-alpha.vercel.app/api/'
export const API_URL = 'http://localhost:5000/api/'

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    }
})

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
