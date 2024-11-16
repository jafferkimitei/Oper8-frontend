import React, { useEffect, useState } from 'react';
import { getAllLoads } from '../services/load-api';
import { fetchBalanceByLoadId, fetchBalanceByDateRange } from '../services/balance-api';

const ViewBalance = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [loadId, setLoadId] = useState('');
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchAllLoads = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllLoads();
        setLoads(data);
      } catch (err) {
        setError('Error fetching loads');
        console.error('Error fetching loads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllLoads();
  }, []);

  
  useEffect(() => {
    const fetchBalanceData = async () => {
      if (loadId) {
        
        setLoading(true);
        setError(null);
        try {
          const data = await fetchBalanceByLoadId(loadId);
          setBalanceData(data);
        } catch (err) {
          setError('Error fetching balance data');
          console.error('Error fetching balance data:', err);
        } finally {
          setLoading(false);
        }
      } else if (startDate && endDate) {
        
        setLoading(true);
        setError(null);
        try {
          const data = await fetchBalanceByDateRange(startDate, endDate);
          setBalanceData(data);
        } catch (err) {
          setError('Error fetching balance data');
          console.error('Error fetching balance data:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBalanceData();
  }, [loadId, startDate, endDate]);

  return (
    <div className="container mx-auto px-4 py-8 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text shadow-lg rounded-lg">
      <div className="mb-6">
        <label htmlFor="loadSelect" className="block text-base font-medium">Select Load</label>
        <select
          id="loadSelect"
          value={loadId}
          onChange={(e) => setLoadId(e.target.value)}
          className="mt-2 block w-full px-4 py-2 bg-[#FEFCFB] dark:bg-[#374151] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select a Load --</option>
          {loads.map((load) => (
            <option key={load._id} value={load._id}>
              {load.from_location} to {load.to_location} - ${load.rate}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="startDate" className="block text-base font-medium">Select Date Range</label>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-2 w-full sm:w-auto px-4 py-2 bg-[#FEFCFB] dark:bg-[#374151] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-2 w-full sm:w-auto px-4 py-2 bg-[#FEFCFB] dark:bg-[#374151] border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {balanceData ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Balance Details</h2>
          <div className="overflow-x-auto bg-[#F5F1ED] dark:bg-[#374151] shadow-md rounded-lg">
            <table className="min-w-full table-auto text-sm sm:text-base">
              <thead className="bg-light-accent dark:bg-dark-accent">
                <tr>
                  <th className="py-3 px-2 sm:px-6 text-left text-light-text dark:text-dark-text font-medium">Description</th>
                  <th className="py-3 px-2 sm:px-6 text-left text-light-text dark:text-dark-text font-medium">Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-600">
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">Load Amount</td>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">{balanceData.loadAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">Dispatcher Earnings</td>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">{balanceData.dispatcherEarnings.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">Driver Earnings</td>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">{balanceData.driverEarnings.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">Total Miscellaneous</td>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">{balanceData.totalMiscellaneous.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">Factoring</td>
                  <td className="py-4 px-2 sm:px-6 text-light-text dark:text-dark-text">{balanceData.factoring.toFixed(2)}</td>
                </tr>
                <tr className="border-t-2 border-gray-500">
                  <td className="py-4 px-2 sm:px-6 text-lg font-semibold">Final Balance</td>
                  <td className="py-4 px-2 sm:px-6 text-lg font-semibold text-indigo-400 dark:text-indigo-200">{balanceData.balance.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        !loading && <p className="text-[#0A1128]">Please select a load or a date range to view balance details.</p>
      )}
    </div>
  );
};


export default ViewBalance;
