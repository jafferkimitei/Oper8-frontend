import axios from 'axios';

const API_URL = 'https://oper8-backend.onrender.com/loads';


export const getAllLoads = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  };



  export const addLoad = async (loadData) => {
    try {
      const response = await axios.post(`${API_URL}/add`, loadData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response;
    } catch (error) {
      console.error('Error response data:', error.response?.data);
      console.error('Error details:', error.message);
      throw error;
    }
  };

  export const updateLoad = async (loadId, loadData) => {
    try {
      const response = await axios.put(`${API_URL}/${loadId}`, loadData);
      return response.data;
    } catch (error) {
      console.error('Error updating load:', error);
      throw error;
    }
  };

  export const deleteLoadById = async (loadId) => {
    await axios.delete(`${API_URL}/${loadId}`);
  };
