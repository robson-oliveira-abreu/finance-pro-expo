import axios from "axios";

const backendUrl = process.env.EXPO_PUBLIC__BACKEND_URL;
console.log({ backendUrl, process });
export const httpService = axios.create({ baseURL: backendUrl });
