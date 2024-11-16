import React, { useState } from 'react';
import { updateDriver } from '../services/driver-api'; 

const EditDriverModal = ({ driver, onClose, onSave }) => {
    const [name, setName] = useState(driver.name);
    const [email, setEmail] = useState(driver.email);
    const [phone, setPhone] = useState(driver.phone);
    const [payRate, setPayRate] = useState(driver.pay_rate);
    const [licenseNumber, setLicenseNumber] = useState(driver.license_number);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            setErrorMessage(null); 
            setSuccessMessage(null);

            
            const updatedData = {
                name,
                email,
                phone,
                pay_rate: payRate,
                license_number: licenseNumber,
            };

            
            const response = await updateDriver(driver._id, updatedData);

            if (response.status === 200) {
                setSuccessMessage('Driver updated successfully!');
                onSave();

                
                setTimeout(() => {
                    setSuccessMessage(null);
                    onClose();
                }, 3000);
            } else {
                setSuccessMessage('Driver has been updated successfully.');
            }
        } catch (error) {
            setErrorMessage('An error occurred while updating the driver.');
            console.error('Error updating driver:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[#0A1128] bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-[#F5F1ED] text-[#0A1128] rounded-lg p-6 w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Driver</h2>

            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

            <div className="mb-4">
                <label className="block text-[#034078] mb-1">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-[#FEFCFB] text-[#181C14] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                    placeholder="Enter name"
                />
            </div>

            <div className="mb-4">
                <label className="block text-[#034078] mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-[#FEFCFB] text-[#181C14] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                    placeholder="Enter email"
                />
            </div>

            <div className="mb-4">
                <label className="block text-[#034078] mb-1">Phone</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-[#FEFCFB] text-[#181C14] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                    placeholder="Enter phone"
                />
            </div>

            <div className="mb-4">
                <label className="block text-[#034078] mb-1">Pay Rate (%)</label>
                <input
                    type="number"
                    value={payRate}
                    onChange={(e) => setPayRate(Number(e.target.value))}
                    className="w-full p-2 border border-gray-600 bg-[#FEFCFB] text-[#181C14] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                    placeholder="Enter pay rate"
                />
            </div>

            <div className="mb-4">
                <label className="block text-[#034078] mb-1">License Number</label>
                <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full p-2 border border-gray-600 bg-[#FEFCFB] text-[#181C14] rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                    placeholder="Enter license number"
                />
            </div>

            <div className="flex flex-wrap justify-end space-x-4 mt-4">
                <button
                    onClick={handleSave}
                    className="bg-[#0A1128] text-white px-4 py-2 rounded-md hover:bg-[#0A1128]/80 focus:outline-none focus:ring-2 focus:ring-[#0A1128] mb-2 md:mb-0"
                    disabled={isLoading}
                >
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={onClose}
                    className="bg-transparent hover:bg-[#0A1128]/80 text-[#0A1128] font-semibold hover:text-white py-2 px-4 border border-[#0A1128] hover:border-transparent rounded mb-2 md:mb-0"
                >
                    Cancel
                </button>
                
            </div>
        </div>
    </div>
);
};

export default EditDriverModal;
