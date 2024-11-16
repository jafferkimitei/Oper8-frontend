import { useState, useEffect } from 'react';
import { updateLoad } from '../services/load-api';
import { fetchDispatchers } from '../services/dispatcher-api';
import { fetchDrivers } from '../services/driver-api';

const EditLoadModal = ({ loadData, onSave, onClose }) => {
  const [from_location, setFromLocation] = useState(loadData?.from_location || '');
  const [to_location, setToLocation] = useState(loadData?.to_location || '');
  const [pickup_date, setPickupDate] = useState(loadData?.pickup_date || '');
  const [rate, setRate] = useState(loadData?.rate || 0);
  const [driverId, setDriverId] = useState(loadData?.driverId || '');
  const [dispatcherId, setDispatcherId] = useState(loadData?.dispatcherId || '');
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);
  const [files, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDriversAndDispatchers = async () => {
      try {
        const driversData = await fetchDrivers();
        setDrivers(driversData);
      } catch (error) {
        console.error('Error fetching drivers:', error);
        setMessage('Failed to load drivers');
        setMessageType('error');
      }

      try {
        const dispatchersData = await fetchDispatchers();
        setDispatchers(dispatchersData);
      } catch (error) {
        console.error('Error fetching dispatchers:', error);
        setMessage('Failed to load dispatchers');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };

    getDriversAndDispatchers();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

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

    const updatedFormData = new FormData();
    updatedFormData.append('from_location', from_location);
    updatedFormData.append('to_location', to_location);
    updatedFormData.append('pickup_date', pickup_date);
    updatedFormData.append('rate', rate);
    updatedFormData.append('driverId', driverId);
    updatedFormData.append('dispatcherId', dispatcherId);

    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        updatedFormData.append('images', file);
      });
    }

    try {
      const response = await updateLoad(loadData._id, updatedFormData);

      if (response.ok) {
        setMessage('Load successfully updated');
        setMessageType('success');
        onSave();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Update failed or an error occurred while updating');
      setMessageType('error');
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-8 bg-[#F5F1ED] shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-6 text-[#181C14]">Edit Load Details</h2>

        {message && (
          <div className={`text-center mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            <p>{message}</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-[#034078] mb-2">From Location</label>
              <input
                type="text"
                value={from_location}
                onChange={(e) => setFromLocation(e.target.value)}
                placeholder="From Location"
                required
                className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] border ${errors.fromLocation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
              />
              {errors.fromLocation && <p className="text-red-500 text-sm">{errors.fromLocation}</p>}
            </div>
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-[#034078] mb-2">To Location</label>
              <input
                type="text"
                value={to_location}
                onChange={(e) => setToLocation(e.target.value)}
                placeholder="To Location"
                required
                className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] border ${errors.toLocation ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
              />
              {errors.toLocation && <p className="text-red-500 text-sm">{errors.toLocation}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-[#034078] mb-2">Pickup Date</label>
              <input
                type="date"
                value={pickup_date}
                onChange={(e) => setPickupDate(e.target.value)}
                required
                className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] border ${errors.pickup_date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
              />
              {errors.pickup_date && <p className="text-red-500 text-sm">{errors.pickup_date}</p>}
            </div>
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-[#034078] mb-2">Rate</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                placeholder="Rate"
                required
                className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] border ${errors.rate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
              />
              {errors.rate && <p className="text-red-500 text-sm">{errors.rate}</p>}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-[#034078] mb-2">Driver</label>
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                required
                className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] border ${errors.driverId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver._id}>{driver.name}</option>
                ))}
              </select>
              {errors.driverId && <p className="text-red-500 text-sm">{errors.driverId}</p>}
            </div>
            <div className="flex-1 min-w-[250px]">
              <label className="block text-sm font-medium text-[#034078] mb-2">Dispatcher</label>
              <select
                value={dispatcherId}
                onChange={(e) => setDispatcherId(e.target.value)}
                required
                className={`w-full p-3 bg-[#FEFCFB] text-[#181C14] border ${errors.dispatcherId ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]`}
              >
                <option value="">Select Dispatcher</option>
                {dispatchers.map((dispatcher) => (
                  <option key={dispatcher._id} value={dispatcher._id}>{dispatcher.name}</option>
                ))}
              </select>
              {errors.dispatcherId && <p className="text-red-500 text-sm">{errors.dispatcherId}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#034078] mb-2">Upload Images</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              multiple
              className="w-full p-2"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#034078] text-white rounded-md hover:bg-[#022d59]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLoadModal;
