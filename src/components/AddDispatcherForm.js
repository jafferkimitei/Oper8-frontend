import React, { useState, useEffect, useCallback } from 'react';
import { checkEmailById, createDispatcher } from '../services/dispatcher-api';

const AddDispatcherForm = ({ dispatcher, onSave = () => {} }) => {
    const [name, setName] = useState(dispatcher?.name || '');
    const [email, setEmail] = useState(dispatcher?.email || '');
    const [phone, setPhone] = useState(dispatcher?.phone || '');
    const [commissionRate, setCommissionRate] = useState(dispatcher?.commission_rate || 0.03);
    const [password, setPassword] = useState('');
    const [role] = useState('dispatcher');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [duplicateEmailError, setDuplicateEmailError] = useState(null);

    useEffect(() => {
        if (dispatcher) {
            setName(dispatcher.name);
            setEmail(dispatcher.email);
            setPhone(dispatcher.phone);
            setCommissionRate(dispatcher.commission_rate);
        }
    }, [dispatcher]);

    const validateForm = () => {
        if (!name || !email || !phone || commissionRate <= 0 || (!dispatcher && !password)) {
            setError("All fields must be filled out correctly.");
            return false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email.");
            return false;
        }

        setError(null);
        return true;
    };

    const handleSubmit = useCallback(async () => {
        if (!validateForm()) {
            return;
        }

        setDuplicateEmailError(null);  
        setSuccessMessage(null);  
        try {
            const emailExists = await checkEmailById(email);  
            
            if (emailExists) {  
                setDuplicateEmailError("The email address is already in use.");
                return;  
            } else {
                setSuccessMessage("The email is available.");
            }

            
            setLoading(true);
            const response = await createDispatcher(name, email, phone, commissionRate, password, role);

            if (response.status === 201) {
                setSuccessMessage('Dispatcher added successfully!');
                onSave();  
                clearForm();
            } else {
                setSuccessMessage('Proceed to view your dispatcher');
            }
        } catch (error) {
            setError('Error submitting dispatcher form. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    }, [name, email, phone, commissionRate, password, role, dispatcher, onSave]);

    const clearForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setCommissionRate(0.03);
        setPassword('');
    };

    return (
        <div className="p-8 max-w-5xl mx-auto bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text rounded-lg shadow-lg">
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {duplicateEmailError && <p style={{ color: 'red' }}>{duplicateEmailError}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900]  mb-2">Phone</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter phone number"
                            className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                        />
                    </div>
                    {!dispatcher && (
                        <div className="flex-1 min-w-[250px]">
                            <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#034078] dark:text-[#FF9900] mb-2">Commission Rate</label>
                    <input
                        type="number"
                        value={commissionRate}
                        onChange={(e) => setCommissionRate(Number(e.target.value))}
                        placeholder="Enter commission rate"
                        className="w-full p-3 border border-gray-300 rounded-md bg-[#FEFCFB] text-[#181C14] dark:bg-[#374151] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0A1128]"
                    />
                </div>
            </div>

            <input type="hidden" value={role} />
            <div className="flex justify-center mt-8">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-[#0A1128] text-white rounded-md hover:bg-[#0A1128]/90 dark:bg-[#FF9900] dark:hover:bg-[#FF9900]/80 focus:outline-none focus:ring-2 focus:ring-[#0A1128] disabled:opacity-50"
                >
                    {loading ? 'Submitting...' : dispatcher ? 'Save Changes' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default AddDispatcherForm;
