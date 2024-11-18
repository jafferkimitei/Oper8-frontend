
import axios from 'axios';
import { fetchDataWithRetry } from './retryHelper';

const axiosInstance = axios.create({
  baseURL: 'https://oper8-backend.onrender.com',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const url = config.url;
    const retries = config.retries || 3;
    const delay = config.delay || 1000;

    try {
      const data = await fetchDataWithRetry(url, retries, delay);
      config.data = data;
    } catch (error) {
      console.error('Error in retrying request', error);
      throw error;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;
