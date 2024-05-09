import axios from "axios";
import HttpAuthErrorObservable from "../../observables/HttpErrorObservable/HttpErrorObservable";

const backendUrl = process.env.EXPO_PUBLIC__BACKEND_URL;
export const httpService = axios.create({ baseURL: backendUrl });

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    HttpAuthErrorObservable.notify({ status: error.response.status });

    return Promise.reject(error);
  }
);
