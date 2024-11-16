
import React, { useEffect, useState } from 'react'; 
import { fetchDrivers } from '../services/driver-api';  
import EditDriverModal from "./EditDriverModal";
import DeleteDriverModal from "./DeleteDriverModal";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { auth } from '../assets/firebase-config';

const AllDrivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
    
        const user = auth.currentUser;
        if (user) {
            const email = user.email;
            if (email === 'admin@sarencoinc.com') {
                setUserRole('admin');
            } else {
                setUserRole('user');
            }
        }
        const loadDrivers = async () => {
            try {
                setLoading(true);
                const driversData = await fetchDrivers();  
                setDrivers(driversData);
                setLoading(false);
            } catch (error) {
                setError('Error fetching drivers');
                setLoading(false);
            }
        };
        loadDrivers();
    }, []);

    
    const handleEdit = (driver) => {
        setSelectedDriver(driver);
        setEditModalOpen(true);
    };

   
    const handleDelete = (driver) => {
        setSelectedDriver(driver);
        setDeleteModalOpen(true);
    };

    return (
        <div className="overflow-x-auto mt-6">
            {loading && <div>Loading drivers...</div>}
            {error && <div className="text-red-500">{error}</div>} 

            {!loading && !error && (
                <table className="min-w-full bg-light-background border dark:bg-dark-background border-border dark:border-dark-border shadow-lg text-sm">
                    <thead>
                        <tr className="bg-light-accent dark:bg-dark-accent border-b border-border dark:border-dark-border">
                            <th className="p-2 text-left text-light-text dark:text-dark-text">#</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Name</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Email</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Phone</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Pay Rate</th>
                            {/* <th className="p-2 text-left text-light-text dark:text-dark-text">License Number</th> */}
                             {/* Conditionally render Actions column header based on user role */}
                             {userRole === 'admin' && (
                                <th className="p-2 text-left text-light-text dark:text-dark-text">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver, index) => (
                            <tr key={driver.driver_id} className="border-b border-gray-200">
                                <td className="p-2 text-light-text dark:text-dark-text">{index + 1}</td>
                                <td className="p-2 text-light-text dark:text-dark-text">{driver.name}</td>
                                <td className="p-2 text-light-text dark:text-dark-text">{driver.email}</td>
                                <td className="p-2 text-light-text dark:text-dark-text">{driver.phone}</td>
                                <td className="p-2 text-light-text dark:text-dark-text">${driver.pay_rate}</td>
                                {/* <td className="p-2 text-light-text dark:text-dark-text">{driver.license_number}</td> */}
                                    {userRole === 'admin' && (
                                        <>
                                        <td className="p-2">
                                            <button
                                                className="text-light-text dark:text-dark-text hover:underline mr-2"
                                                onClick={() => handleEdit(driver)}
                                                aria-label="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-500 hover:underline dark:text-red-400"
                                                onClick={() => handleDelete(driver)}
                                                aria-label="Delete"
                                            >
                                                <FaTrash />
                                            </button>
                                            </td>
                                        </>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            {isEditModalOpen && selectedDriver && (
                <EditDriverModal
                    driver={selectedDriver}
                    onClose={() => setEditModalOpen(false)}
                    onSave={() => {
                        setEditModalOpen(false);
                    }}
                />
            )}
            {isDeleteModalOpen && selectedDriver && (
                <DeleteDriverModal
                    driver={selectedDriver}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => {
                        setDrivers(prev => prev.filter(d => d.driver_id !== selectedDriver.driver_id));
                        setDeleteModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default AllDrivers;
