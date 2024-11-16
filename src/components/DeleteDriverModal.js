import React from 'react';
import { deleteDriver } from '../services/driver-api'; 

const DeleteDriverModal = ({ driver, onClose, onConfirm }) => {
    const handleDelete = async () => {
        try {
            await deleteDriver(driver._id); 
            onConfirm();
        } catch (error) {
            console.log('Error deleting driver:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-900 text-white rounded-lg p-6 w-96 max-w-full">
                <h2 className="text-xl font-semibold mb-4">Delete Driver</h2>
                <p className="mb-6">
                    Are you sure you want to delete <span className="font-bold">{driver.name}</span>? This action
                    cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Yes, delete
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDriverModal;
