import React, { useState, useEffect } from 'react';
import { fetchDispatchers } from '../services/dispatcher-api';
import { fetchDrivers } from '../services/driver-api';
import { fetchPayrollData, sendPayroll, generateCSV } from '../services/payroll-api';
import { FaFileCsv, FaPaperPlane } from 'react-icons/fa';

const ViewPayroll = () => {
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("driver");
  const [payrollData, setPayrollData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversData = await fetchDrivers();
        setDrivers(driversData);

        const dispatchersData = await fetchDispatchers();
        setDispatchers(dispatchersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const users = selectedRole === "driver" ? drivers : dispatchers;

  useEffect(() => {
    const fetchPayroll = async () => {
      if (selectedUserId) {
        try {
          setError(null);
          const data = await fetchPayrollData(selectedUserId, selectedRole, startDate, endDate);

          if (!data || !data.loads.length) {
            setError("No loads were found for this person.");
            setPayrollData(null);
          } else {
            setPayrollData(data);
          }
        } catch (error) {
          setError("Failed to fetch payroll data. Please try again later.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPayroll();
  }, [selectedUserId, selectedRole, startDate, endDate]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const downloadPayrollCSV = () => {
    if (!payrollData) return;

    const csvContent = generateCSV(payrollData);

    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `payroll_report_${selectedUserId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sendPayrollHandler = async () => {
    if (!payrollData || !selectedUserId) return;
    setLoading(true);
    try {
      await sendPayroll(selectedUserId, payrollData, startDate);
      setModalMessage('Payroll sent successfully!');
    } catch (error) {
      setModalMessage('Failed to send payroll.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text shadow-lg rounded-lg">
      
      {modalMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            <p>{modalMessage}</p>
            <button
              onClick={() => setModalMessage(null)}
              className="mt-4 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-lg font-semibold mb-2">Select Role</label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-3 border-2 rounded-lg bg-white dark:bg-[#374151] dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="driver">Driver</option>
              <option value="dispatcher">Dispatcher</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">Select Date Range</label>
            <div className="flex flex-wrap space-x-4 sm:space-x-0 sm:flex-col md:flex-row">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="w-full sm:w-auto p-3 border-2 rounded-lg bg-white dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="w-full sm:w-auto p-3 border-2 rounded-lg bg-white dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          {users && users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white dark:bg-[#374151] text-[#181C14] dark:text-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-shadow duration-300"
                  onClick={() => setSelectedUserId(user._id)}
                >
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-500">No users available.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        {error ? (
          <div className="p-4 bg-red-900 text-white rounded-lg shadow-lg">
            <p>{error}</p>
          </div>
        ) : (
          payrollData && (
            <div className="p-6 bg-white dark:bg-[#374151] text-[#181C14] dark:text-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold">{payrollData.title}</h2>
              <p className="text-lg font-semibold">Total Earnings: ${payrollData.totalEarnings}</p>
              <div className="mt-6 flex space-x-6">
                <button
                  onClick={downloadPayrollCSV}
                  className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                >
                  <FaFileCsv className="mr-3" />
                  Download CSV
                </button>
                <button
                  onClick={sendPayrollHandler}
                  className={`flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 transition duration-300'}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <FaPaperPlane className="mr-3 animate-spin" />
                      Sending Payroll...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-3" />
                      Send Payroll
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ViewPayroll;
