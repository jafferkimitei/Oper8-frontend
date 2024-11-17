import axios from 'axios';
const API_URL = 'https://oper8-backend.onrender.com/stats';

export const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  };
  