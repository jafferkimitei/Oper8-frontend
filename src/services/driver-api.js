import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;


export const fetchDrivers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/drivers/email-exists`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching drivers');
    }
  };


export const checkEmailById = async (email) => {
    try {
      const response = await fetch(`${BASE_URL}/drivers/email-exists/${email}`);
      const result = await response.json();
      return result.exists;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };
  

// Add a new driver
export const addDriver = async (driverData) => {
    try {
        const response = await axios.post(`${BASE_URL}/drivers/add`, driverData);
        return response.data;
    } catch (error) {
        console.error('Error adding driver:', error);
        throw error;
    }
};

// Update an existing driver
export const updateDriver = async (driverId, driverData) => {
    try {
        const response = await axios.put(`${BASE_URL}/drivers/${driverId}`, driverData);
        return response.data;
    } catch (error) {
        console.error('Error updating driver:', error);
        throw error;
    }
};

// Function to delete a driver by ID
export const deleteDriver = async (driverId) => {
    try {
        await axios.delete(`${BASE_URL}/drivers/${driverId}`);
    } catch (error) {
        throw new Error('Error deleting driver');
    }
};


export const fetchDriverById = async (driverId) => {
    try {
    const response = await axios.get(`${BASE_URL}/drivers/${driverId}`);
    return response.data;
} catch (error) {
    console.error('Error fetching driver:', error);
    throw error;
  }
  };


  
 