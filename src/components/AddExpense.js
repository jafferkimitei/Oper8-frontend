import React, { useState, useEffect } from 'react';
import { getAllLoads } from '../services/load-api'; 
import { addExpense } from '../services/expense-api';  

const AddExpense = ({ expense, onSave }) => {
  const [loadId, setLoadId] = useState('');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [files, setImages] = useState([]);
  const [loads, setLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const getAllLoadsData = async () => {
      setLoading(true);
      try {
        const loadsData = await getAllLoads();
        setLoads(loadsData);
      } catch (error) {
        console.error('Error fetching loads', error);
      } finally {
        setLoading(false);
      }
    };
    getAllLoadsData();
  }, []);

  useEffect(() => {
    if (expense) {
      setLoadId(expense.load_id);
      setFromLocation(expense.from_location);
      setToLocation(expense.to_location);
      setType(expense.type);
      setDescription(expense.description);
      setAmount(expense.amount);
    }
  }, [expense]);

  const handleLoadChange = (event) => {
    const selectedLoadId = event.target.value;
    setLoadId(selectedLoadId);

    const selectedLoad = loads.find((load) => load._id === selectedLoadId);
    if (selectedLoad) {
      setFromLocation(selectedLoad.from_location);
      setToLocation(selectedLoad.to_location);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('load_id', loadId);
    formData.append('from_location', fromLocation);
    formData.append('to_location', toLocation);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('amount', amount.toString());

    // images.forEach((image) => formData.append('images', image));
    if (files && files.length > 0) {
      Array.from(files).forEach(file => {
        formData.append('images', file); 
      });
    }

    try {
      await addExpense(formData);
      setLoadId('');
      setFromLocation('');
      setToLocation('');
      setType('');
      setDescription('');
      setAmount(0);
      setImages([]);
      setSuccessMessage('Expense added successfully!');
      onSave();
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding expense', error);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text max-w-5xl mx-auto rounded-lg shadow-lg p-8">
      {loading && <p>Loading loads...</p>}

      {successMessage && (
        <div className="bg-green-500 text-white p-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit} encType="multipart/form-data">

      <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[250px">
          <label htmlFor="loadId" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Load ID</label>
          <select
            id="loadId"
            value={loadId}
            onChange={handleLoadChange}
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            required
          >
            <option value="">Select Load ID</option>
            {loads.map((load) => (
              <option key={load._id} value={load._id}>
                {load.from_location} to {load.to_location}
              </option>
              
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[250px]">
          <label htmlFor="fromLocation" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">From Location</label>
          <input
            type="text"
            id="fromLocation"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Enter location attached to expe..."
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            required
          />
        </div>
        </div>



        <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[250px]">
          <label htmlFor="toLocation" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">To Location</label>
          <input
            type="text"
            id="toLocation"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="Enter location attached to expe..."
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            required
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label htmlFor="type" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="fuel,mechanic fixes,miscell..."
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            required
          />
        </div>
        </div>

        <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[250px]">
          <label htmlFor="description" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the expense used on type..."
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            required
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label htmlFor="amount" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
            required
          />
        </div>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Evidence</label>
          <input
            type="file"
            id="images"
            onChange={handleImageChange}
            multiple
            className="w-full p-3 rounded-md  bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-[#0A1128] text-white rounded-md hover:bg-[#0A1128]/90 dark:bg-[#FF9900] dark:hover:bg-[#FF9900]/80  focus:outline-none focus:ring-2 focus:ring-[#0A1128] disabled:opacity-50"
          >
            Create expense
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
