import axios from "axios"

export const API_URL = 'https://social-network-ignagw1tm-dazy888.vercel.app/api/'

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: { "Access-Control-Allow-Origin": "*" }
})

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
