import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL;

export const addExpense = async (formData) => {
    try {
      await axios.post(`${API_URL}/miscellaneous/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error('Error adding expense', error);
      throw error;  
    }
  };

  export const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/miscellaneous`);
      return response.data;
    } catch (error) {
      console.error('Error fetching expenses', error);
      throw error;
    }
  };

export const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/miscellaneous/${id}`);
    } catch (error) {
      console.error('Error deleting expense', error);
      throw error;
    }
  };