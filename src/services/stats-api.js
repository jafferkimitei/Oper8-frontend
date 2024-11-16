import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL;

export const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/stats`);
  
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
  