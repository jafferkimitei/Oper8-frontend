import React, { useState, useEffect, useCallback } from 'react';
import { checkEmailById, addDriver } from '../services/driver-api';

const AddDriverForm = ({ onSave }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [payRate, setPayRate] = useState(0);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [password, setPassword] = useState('');
    const [role] = useState('driver');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [duplicateEmailError, setDuplicateEmailError] = useState(null);

    const validateForm = () => {
        if (!name || !email || !phone || !payRate || !licenseNumber || !password) {
            setError('All fields must be filled out correctly.');
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email.');
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) {
            return;
        }
    
        setLoading(true);
        setDuplicateEmailError(null);  
        setSuccessMessage(null);  // Reset success message on each submit
    
        try {
            // Check if the email already exists
            const emailExists = await checkEmailById(email); 
    
            if (emailExists) {  
                setDuplicateEmailError("The email address is already in use.");
                setLoading(false);
                return;  // Stop here if email is already taken
            } 
    
            // If email is available, proceed with adding the driver
            setSuccessMessage("The email is available.");  // Show success for email check
    
            const driverData = {
                name,
                email,
                phone,
                pay_rate: payRate,
                license_number: licenseNumber,
                role,
                password,
            };
    
            const response = await addDriver(driverData);
    
            if (response.status === 201) {
                setSuccessMessage('Driver added successfully!');
                onSave(); // Call onSave after successful addition
                clearForm();
            } else {
                setSuccessMessage('Proceed to view your driver');
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            setError('Error submitting driver form. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [name, email, phone, payRate, licenseNumber, role, password, onSave]);
    

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPayRate(0);
        setLicenseNumber('');
        setPassword('');
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text rounded-lg shadow-lg">
            {successMessage && <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>}
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            {duplicateEmailError && <p className="text-red-500 text-sm mb-4 text-center">{duplicateEmailError}</p>}

            <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900]  mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Phone</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Pay Rate</label>
                        <input
                            type="number"
                            value={payRate}
                            onChange={(e) => setPayRate(Number(e.target.value))}
                            placeholder="Enter pay rate"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">License Number</label>
                        <input
                            value={licenseNumber}
                            onChange={(e) => setLicenseNumber(e.target.value)}
                            placeholder="Enter license number"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] dark:bg-[#374151] text-[#181C14] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-[#0A1128] text-white rounded-md hover:bg-[#0A1128]/90 dark:bg-[#FF9900] dark:hover:bg-[#FF9900]/80 focus:outline-none focus:ring-2 focus:ring-[#0A1128] disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default AddDriverForm;
