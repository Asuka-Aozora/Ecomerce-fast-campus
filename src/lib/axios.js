import axios from "axios";

const baseURL = "https://ecomerce-be-production.up.railway.app/";

export const axiosInstance = axios.create({
    baseURL: baseURL
})