import axios from 'axios';

const API_URL = 'https://oper8-backend.onrender.com/stats';

export const fetchStats = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
