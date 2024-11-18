
import axiosInstance from './axiosInstance';

export async function fetchDataWithRetry(url, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 429 && i < retries - 1) {
                console.log('Rate limit hit. Retrying in', delay, 'ms');
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
}
