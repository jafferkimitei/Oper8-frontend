import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;


export const getAllLoads = async () => {
    const response = await axios.get(`${API_URL}/loads`);
    return response.data;
  };



  export const addLoad = async (loadData) => {
    try {
      const response = await axios.post(`${API_URL}/loads/add`, loadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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
      const response = await axios.put(`${API_URL}/loads/${loadId}`, loadData);
      return response.data;
    } catch (error) {
      console.error('Error updating load:', error);
      throw error;
    }
  };

  export const deleteLoadById = async (loadId) => {
    await axios.delete(`${API_URL}/loads/${loadId}`);
  };
