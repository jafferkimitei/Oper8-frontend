import axios from 'axios';

// Set up the base URL for your API
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

// Function to fetch payroll data
export const fetchPayrollData = async (selectedUserId, selectedRole, startDate, endDate) => {
    try {
      const roleId = selectedRole === "driver" ? "driverId" : "dispatcherId";
      const params = {
        [`${roleId}`]: selectedUserId,
        startDate: startDate,
        endDate: endDate,
      };
  
      const response = await axios.get(`${API_BASE_URL}/payrolls/payroll`, { params });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching payroll data');
    }
  };

  // Function to send payroll
export const sendPayroll = async (selectedUserId, payrollData, startDate) => {
    try {
      const week = getWeekNumber(new Date(startDate));
      await axios.post(`${API_BASE_URL}/payrolls/send`, {
        userId: selectedUserId,
        payrollData: {
          ...payrollData,
          week,
        },
        email: 'accounting@sarencoinc.com',
      });
    } catch (error) {
      throw new Error('Failed to send payroll');
    }
  };

  // Utility function to get the week number
const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.ceil(diff / oneDay / 7);
  };

  // Function to download payroll data as CSV
export const generateCSV = (payrollData) => {
    const header = ['From Location', 'To Location', 'Pickup Date', 'Rate', 'Driver Earnings', 'Dispatcher Earnings'];
    const rows = payrollData.loads.map((load) => [
      load.from_location,
      load.to_location,
      load.pickup_date,
      load.rate,
      load.driverEarnings,
      load.dispatcherEarnings,
    ]);
  
    let csvContent = "data:text/csv;charset=utf-8," + header.join(",") + "\n";
    rows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });
  
    return encodeURI(csvContent);
  };