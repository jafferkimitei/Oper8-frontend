import React, { useState } from 'react';
import axios from 'axios';

const Calculator = ({ closeCalculator }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [miles, setMiles] = useState(null);
  const [ratePerMile, setRatePerMile] = useState('');
  const [totalRate, setTotalRate] = useState('');
  const [error, setError] = useState('');

  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // Function to fetch miles between two locations
  const getMiles = async () => {
    if (!fromLocation || !toLocation) {
      setError('Please enter both locations.');
      return;
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${fromLocation}&destinations=${toLocation}&key=${GOOGLE_MAPS_API_KEY}`
      );
      console.log(response.data);
      const distance = response.data.rows[0].elements[0].distance.text;
      setMiles(distance);
      setError('');
    } catch (err) {
      setError('Error fetching distance. Please try again.');
      console.error(err);
    }
  };

  const handleRatePerMileChange = (e) => {
    setRatePerMile(e.target.value);
    if (e.target.value && miles) {
      setTotalRate((parseFloat(e.target.value) * parseFloat(miles)).toFixed(2));
    }
  };

  const handleMilesChange = (e) => {
    setMiles(e.target.value);
    if (e.target.value && ratePerMile) {
      setTotalRate((parseFloat(e.target.value) * parseFloat(ratePerMile)).toFixed(2));
    }
  };

  const handleTotalRateChange = (e) => {
    setTotalRate(e.target.value);
    if (e.target.value && miles) {
      setRatePerMile((parseFloat(e.target.value) / parseFloat(miles)).toFixed(2));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 sm:p-6 bg-[#FEFCFB] dark:bg-[#17275c] rounded-lg shadow-lg relative">
      {/* Close Button */}
      <button
        onClick={closeCalculator}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-all duration-300"
      >
        <span>Close</span>
      </button>

      <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white text-center mb-4 sm:mb-6">
        Load Calculator
      </h2>

      {/* Location Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-[#FF9900]">
            From Location
          </label>
          <input
            type="text"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Enter from location"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-[#FF9900]">
            To Location
          </label>
          <input
            type="text"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="Enter to location"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={getMiles}
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-6"
      >
        Get Distance
      </button>

      {/* Display Distance */}
      {miles && (
        <div className="mb-4 sm:mb-6 p-4 bg-gray-200 dark:bg-gray-700 text-lg text-gray-800 dark:text-[#FEFCFB] rounded-md shadow-md">
          <p>Distance: {miles}</p>
        </div>
      )}

      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* Rate and Miles Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-[#FF9900]">
            Rate Per Mile
          </label>
          <input
            type="number"
            value={ratePerMile}
            onChange={handleRatePerMileChange}
            placeholder="Enter rate per mile"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-[#FF9900]">
            Miles
          </label>
          <input
            type="number"
            value={miles}
            onChange={handleMilesChange}
            placeholder="Enter miles"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Total Rate Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-[#FF9900]">
            Total Rate
          </label>
          <input
            type="number"
            value={totalRate}
            onChange={handleTotalRateChange}
            placeholder="Enter total rate"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {totalRate && (
          <div className="mt-4 text-lg text-gray-800 dark:text-[#FEFCFB]">
            <p>Total Rate: ${totalRate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
