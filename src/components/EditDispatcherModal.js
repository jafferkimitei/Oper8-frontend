import React, { useState } from 'react';
import { updateDispatcher } from '../services/dispatcher-api'; // Import the API function

const EditDispatcherModal = ({ dispatcher, onClose, onSave }) => {
    const [name, setName] = useState(dispatcher.name);
    const [email, setEmail] = useState(dispatcher.email);
    const [phone, setPhone] = useState(dispatcher.phone);
    const [commissionRate, setCommissionRate] = useState(dispatcher.commission_rate);
    const [isLoading, setIsLoading] = useState(false);  
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null);
            setSuccessMessage(null);
            
            const response = await updateDispatcher(dispatcher._id, {
                name,
                email,
                phone,
                commission_rate: commissionRate,
            });
            
            if (response.status === 200) {
                setSuccessMessage('Dispatcher successfully updated!');
                onSave(); 
                onClose(); 
                setTimeout(() => {
                    setSuccessMessage(null);
                    onClose();
                }, 3000);
            } else {
                setErrorMessage('Failed to update dispatcher data.');
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while updating the dispatcher.');
            console.error('Error updating dispatcher:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-[#0A1128] bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Dispatcher</h2>

                 {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                <div className="mb-4">
                    <label className="block text-[#034078] dark:text-[#FF9900] mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-600 bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        placeholder="Enter name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[#034078] dark:text-[#FF9900] mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-600 bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        placeholder="Enter email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[#034078] dark:text-[#FF9900] mb-1">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-600 bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        placeholder="Enter phone"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-[#034078] dark:text-[#FF9900] mb-1">Commission Rate (%)</label>
                    <input
                        type="number"
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(Number(e.target.value))}
                        className="w-full p-2 border border-gray-600 bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        placeholder="Enter commission rate"
                    />
                </div>

                <div className="flex flex-wrap justify-end space-x-4 mt-4">
                    <button
                        onClick={handleSave}
                        className="bg-[#0A1128] dark:bg-[#FEFCFB] text-white dark:text-[#0A1128] px-4 py-2 rounded-md hover:bg-[#0A1128]/80 focus:outline-none focus:ring-2 focus:ring-[#0A1128] mb-2 md:mb-0"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-transparent hover:bg-[#0A1128]/80 dark:hover:bg-[#FEFCFB]/80 text-[#0A1128] dark:text-[#FEFCFB] font-semibold hover:text-white dark:hover:text[#0A1128] py-2 px-4 border border-[#0A1128] dark:border-[#fefcfb] hover:border-transparent rounded mb-2 md:mb-0"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditDispatcherModal;
