import React, { useEffect, useState } from 'react';
import { fetchDispatchers } from '../services/dispatcher-api';
import EditDispatcherModal from './EditDispatcherModal';
import DeleteDispatcherModal from './DeleteDispatcherModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { auth } from '../assets/firebase-config';

const AllDispatchers = () => {
    const [dispatchers, setDispatchers] = useState([]);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDispatcher, setSelectedDispatcher] = useState(null);
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
        const loadDispatchers = async () => {
            try {
                setLoading(true);
                const data = await fetchDispatchers();
                setDispatchers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        loadDispatchers();
    }, []);

    const handleEdit = (dispatcher) => {
        setSelectedDispatcher(dispatcher);
        setEditModalOpen(true);
    };

    const handleDelete = (dispatcher) => {
        setSelectedDispatcher(dispatcher);
        setDeleteModalOpen(true);
    };

    return (
        <div className="overflow-x-auto mt-6">
            {loading && <div>Loading dispatchers...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {!loading && !error && (
                <table className="min-w-full bg-light-background border dark:bg-dark-background border-border dark:border-dark-border shadow-lg text-sm">
                    <thead>
                        <tr className="bg-light-accent dark:bg-dark-accent border-b border-border dark:border-dark-border">
                        <th className="p-2 text-left text-light-text dark:text-dark-text">#</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Name</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Email</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Phone</th>
                            <th className="p-2 text-left text-light-text dark:text-dark-text">Rate</th>
                            {/* Conditionally render Actions column header based on user role */}
                            {userRole === 'admin' && (
                                <th className="p-2 text-left text-light-text dark:text-dark-text">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {dispatchers.map((dispatcher, index) => (
                            <tr key={dispatcher.dispatcher_id} className="border-b border-border dark:border-dark-border">
                                 <td className="p-2 text-light-text dark:text-dark-text">{index + 1}</td>
                                <td className="p-2 text-light-text dark:text-dark-text truncate">{dispatcher.name}</td>
                                <td className="p-2 text-light-text dark:text-dark-text truncate">{dispatcher.email}</td>
                                <td className="p-2 text-light-text dark:text-dark-text">{dispatcher.phone}</td>
                                <td className="p-2 text-light-text dark:text-dark-text">{dispatcher.commission_rate * 100}%</td>
                                {/* Only show actions for admin */}
                                {userRole === 'admin' && (
                                        <>
                                        <td className="p-2">
                                            <button
                                                className="text-light-text dark:text-dark-text hover:underline mr-2"
                                                onClick={() => handleEdit(dispatcher)}
                                                aria-label="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="text-red-500 hover:underline dark:text-red-400"
                                                onClick={() => handleDelete(dispatcher)}
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

            {isEditModalOpen && selectedDispatcher && (
                <EditDispatcherModal
                    dispatcher={selectedDispatcher}
                    onClose={() => setEditModalOpen(false)}
                    onSave={() => setEditModalOpen(false)}
                />
            )}

            {isDeleteModalOpen && selectedDispatcher && (
                <DeleteDispatcherModal
                    dispatcher={selectedDispatcher}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={() => {
                        setDispatchers((prev) => prev.filter((d) => d.dispatcher_id !== selectedDispatcher.dispatcher_id));
                        setDeleteModalOpen(false);
                    }}
                />
            )}
        </div>
    );
};

export default AllDispatchers;
