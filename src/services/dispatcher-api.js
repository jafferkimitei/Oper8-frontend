
import axios from 'axios';

const API_URL = 'http://localhost:5000/dispatchers';

export const fetchDispatchers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching dispatchers');
    }
};

export const updateDispatcher = async (id, dispatcherData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, dispatcherData);
        return response;
    } catch (error) {
        throw new Error('An error occurred while updating the dispatcher.');
    }
};

export const deleteDispatcher = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        throw new Error('An error occurred while deleting the dispatcher.');
    }
};


export const checkEmailById = async (email) => {
    try {
      const response = await fetch(`${API_URL}/email-exists/${email}`);
      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };


export const createDispatcher = async (name, email, phone, commissionRate, password, role) => {
    try {
        const response = await axios.post(`${API_URL}/add`, {
            name,
            email,
            phone,
            commission_rate: commissionRate,
            password,
            role
        });
        return response.data;
    } catch (error) {
        console.log('Error creating dispatcher:', error);
        throw error;
    }
};



 export const fetchDispatcherById = async (dispatcherId) => {
    try {
    const response = await axios.get(`${API_URL}/${dispatcherId}`);
    return response.data;
} catch (error) {
    console.log('Error fetching dispatcher:', error);
    throw error;
  }
  };
