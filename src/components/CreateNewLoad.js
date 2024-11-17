import { useState, useEffect } from 'react';
import { addLoad } from '../services/load-api';
import { fetchDispatchers } from '../services/dispatcher-api';
import { fetchDrivers } from '../services/driver-api';

const CreateNewLoad = ({ onSave }) => {
  const [from_location, setFromLocation] = useState('');
  const [to_location, setToLocation] = useState('');
  const [pickup_date, setPickupDate] = useState('');
  const [rate, setRate] = useState(0);
  const [driverId, setDriverId] = useState('');
  const [dispatcherId, setDispatcherId] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDriversAndDispatchers = async () => {
      try {
        const driversData = await fetchDrivers();
        const dispatchersData = await fetchDispatchers();
        setDrivers(driversData);
        setDispatchers(dispatchersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getDriversAndDispatchers();
  }, []);

  // Validate the form fields
  const validateForm = () => {
    const formErrors = {};
    if (!from_location) formErrors.fromLocation = 'From location is required';
    if (!to_location) formErrors.toLocation = 'To location is required';
    if (!pickup_date) formErrors.pickup_date = 'Pick up date is required';
    if (rate <= 0) formErrors.rate = 'Rate must be greater than 0';
    if (!driverId) formErrors.driverId = 'Driver is required';
    if (!dispatcherId) formErrors.dispatcherId = 'Dispatcher is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    
    const loadData = {
      from_location,
      to_location,
      pickup_date,
      rate,
      driverId,
      dispatcherId,
    };
    
    console.log('Form data before submit:', {
      from_location,
      to_location,
      pickup_date,
      rate,
      driverId,
      dispatcherId,
    });
  
    setLoading(true);
    setMessage(''); 

    try {
      const response = await addLoad(loadData); // sending JSON object instead of FormData
      if (response.status === 200) {
        setMessage('Load successfully added');
        setMessageType('success');
        // Reset the form fields after successful submission
        setFromLocation('');
        setToLocation('');
        setPickupDate('');
        setRate(0);
        setDriverId('');
        setDispatcherId('');
        setErrors({});
        onSave(); 
      } else {
        setMessage('Proceed to view your loads');
        setMessageType('success');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error occurred while processing');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-8 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-textbg-[#F5F1ED] shadow-lg rounded-lg">
      {message && (
        <div
          className={`text-center mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}
        >
          <p>{message}</p>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">From Location</label>
            <input
              type="text"
              value={from_location}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="From Location"
              required
              className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border ${errors.fromLocation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
            />
            {errors.fromLocation && <p className="text-red-500 text-sm">{errors.fromLocation}</p>}
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">To Location</label>
            <input
              type="text"
              value={to_location}
              onChange={(e) => setToLocation(e.target.value)}
              placeholder="To Location"
              required
              className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border ${errors.toLocation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
            />
            {errors.toLocation && <p className="text-red-500 text-sm">{errors.toLocation}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Pickup Date</label>
            <input
              type="date"
              value={pickup_date}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border ${errors.pickup_date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
            />
            {errors.pickup_date && <p className="text-red-500 text-sm">{errors.pickup_date}</p>}
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Rate</label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              placeholder="Rate"
              required
              className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border ${errors.rate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
            />
            {errors.rate && <p className="text-red-500 text-sm">{errors.rate}</p>}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Driver</label>
            <select
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
              className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border ${errors.driverId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
            >
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>{driver.name}</option>
              ))}
            </select>
            {errors.driverId && <p className="text-red-500 text-sm">{errors.driverId}</p>}
          </div>
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Dispatcher</label>
            <select
              value={dispatcherId}
              onChange={(e) => setDispatcherId(e.target.value)}
              required
              className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border ${errors.dispatcherId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
            >
              <option value="">Select Dispatcher</option>
              {dispatchers.map((dispatcher) => (
                <option key={dispatcher._id} value={dispatcher._id}>{dispatcher.name}</option>
              ))}
            </select>
            {errors.dispatcherId && <p className="text-red-500 text-sm">{errors.dispatcherId}</p>}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-[#0A1128] text-white rounded-md hover:bg-[#0A1128]/90 dark:bg-[#FF9900] dark:hover:bg-[#FF9900]/80 focus:outline-none focus:ring-2 focus:ring-[#0A1128] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Creating Load...' : 'Create Load'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateNewLoad;
