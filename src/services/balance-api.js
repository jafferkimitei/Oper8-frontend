import axios from 'axios';

// Base URL for API requests
const API_URL = 'https://oper8-backend.onrender.com/balance';
// Function to fetch balance data by Load ID
export const fetchBalanceByLoadId = async (loadId) => {
    try {
      const response = await axios.get(`${API_URL}/${loadId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching balance data by Load ID');
    }
  };

  // Function to fetch balance data by Date Range
export const fetchBalanceByDateRange = async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `${API_URL}/loads?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      throw new Error('Error fetching balance data by Date Range');
    }
  };