import React, { useEffect, useState } from 'react'; 
import { FaTrashAlt, FaPen, FaCalculator } from 'react-icons/fa';
import DeleteLoadModal from './DeleteLoadModal';
import EditLoadModal from './EditLoadModal';
import Calculator from './Calculator';
import { getAllLoads, deleteLoadById } from '../services/load-api';
import { fetchDriverById } from '../services/driver-api';
import { fetchDispatcherById } from '../services/dispatcher-api';
import axiosInstance from '../utils/axiosInstance';
import { toSentenceCase } from '../utils/textUtils';
import { auth } from '../assets/firebase-config';

const AllLoads = () => {
  const [loads, setLoads] = useState([]);
  const [drivers, setDrivers] = useState(new Map());
  const [dispatchers, setDispatchers] = useState(new Map());
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const LOADS_PER_PAGE = 10;
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

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
        const fetchData = async () => {
          try {
            const loadData = await getAllLoads();
            const sortedLoads = loadData.sort((a, b) => new Date(b.pickup_date) - new Date(a.pickup_date)); // Sort by date in descending order
            setLoads(sortedLoads);
            console.log("Fetched loads:", loadData);
        
            const driverIds = new Set(loadData.map((load) => load.driverId && typeof load.driverId === 'object' ? load.driverId._id : load.driverId));
            const dispatcherIds = new Set(loadData.map((load) => load.dispatcherId && typeof load.dispatcherId === 'object' ? load.dispatcherId._id : load.dispatcherId));
        
            const driversMap = new Map();
            const dispatchersMap = new Map();
        
            for (const driverId of driverIds) {
              if (driverId) {
                try {
                  const driver = await fetchDriverById(driverId);
                  if (driver && driver._id) { 
                    driversMap.set(driver._id, driver);
                  } else {
                    console.warn(`Driver with ID ${driverId} not found or invalid`);
                  }
                } catch (error) {
                  console.error(`Error fetching driver with ID ${driverId}`, error);
                }
              }
            }
        
            for (const dispatcherId of dispatcherIds) {
              if (dispatcherId) {
                try {
                  const dispatcher = await fetchDispatcherById(dispatcherId);
                  if (dispatcher && dispatcher._id) { 
                    dispatchersMap.set(dispatcher._id, dispatcher);
                  } else {
                    console.warn(`Dispatcher with ID ${dispatcherId} not found or invalid`);
                  }
                } catch (error) {
                  console.error(`Error fetching dispatcher with ID ${dispatcherId}`, error);
                }
              }
            }
        
            setDrivers(driversMap);
            setDispatchers(dispatchersMap);
          } catch (error) {
            console.error('Error fetching load data:', error);
          }
        };
        

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * LOADS_PER_PAGE;
  const currentLoads = loads.slice(startIndex, startIndex + LOADS_PER_PAGE);
  const totalPages = Math.ceil(loads.length / LOADS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleDelete = async () => {
    try {
      await deleteLoadById(selectedLoad._id);
      setLoads(loads.filter(load => load._id !== selectedLoad._id));
      setIsDeleteModalOpen(false);
      alert('Load deleted successfully!');
    } catch (error) {
      console.error('Failed to delete the load:', error);
      alert('Failed to delete the load. Please try again.');
    }
  };

  const handleDeleteClick = (load) => {
    setSelectedLoad(load);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (load) => {
    setSelectedLoad(load); 
    setIsEditModalOpen(true);
  };

  const toggleCalculator = () => {
    setIsCalculatorOpen(prev => !prev);
  };



  return (
    <div className="mt-6">
      <div className="overflow-x-auto min-w-full">
        <table className="min-w-full bg-light-background border dark:bg-dark-background border-border dark:border-dark-border shadow-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-light-accent dark:bg-dark-accent border-b border-border dark:border-dark-border">
              <th className="p-2 text-left text-light-text dark:text-dark-text">#</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">From</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">To</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">PU Date</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Miles</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Rate/mile</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Rate</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Broker</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Driver</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Dispatcher</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text hidden md:table-cell">Driver Earnings</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text hidden md:table-cell">Dispatcher Earnings</th>
              {userRole === 'admin' && (
                                <th className="p-2 text-left text-light-text dark:text-dark-text">Actions</th>
                            )}
            </tr>
          </thead>
          <tbody>
            {currentLoads.map((load, index) => {
              const rowIndex = (currentPage - 1) * LOADS_PER_PAGE + index + 1;

              const driver = typeof load.driverId === 'string'
                ? drivers.get(load.driverId)
                : load.driverId;

              const dispatcher = typeof load.dispatcherId === 'string'
                ? dispatchers.get(load.dispatcherId)
                : load.dispatcherId;

              return (
                <tr key={load.load_id} className="border-b border-gray-200">
                  <td className="p-2 text-light-text dark:text-dark-text">{rowIndex}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{toSentenceCase(load.from_location)}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{toSentenceCase(load.to_location)}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{load.pickup_date}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{load.miles}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{Number(load.rate_per_mile).toFixed(2)}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{Number(load.rate).toFixed(2)}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{toSentenceCase(load.broker)}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{driver ? toSentenceCase(driver.name) : 'N/A'}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{dispatcher ? toSentenceCase(dispatcher.name) : 'N/A'}</td>
                  <td className="p-2 text-light-text dark:text-dark-text hidden md:table-cell">{Number(load.driverEarnings).toFixed(2)}</td>
                  <td className="p-2 text-light-text dark:text-dark-text hidden md:table-cell">{Number(load.dispatcherEarnings).toFixed(2)}</td>
                  {userRole === 'admin' && (
                                        <>
                  <td className="p-2 flex space-x-1 md:space-x-2">
                    <button
                      className="text-yellow-500 hover:underline dark:text-yellow-400"
                      onClick={() => handleEditClick(load)}
                      aria-label="Edit"
                    >
                      <FaPen />
                    </button>
                    <button
                      className="text-red-500 hover:underline dark:text-red-400"
                      onClick={() => handleDeleteClick(load)}
                      aria-label="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                  </>
                                    )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

{/* Pagination Controls */}
<div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === index + 1
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      {/* Calculator Modal */}
      {isCalculatorOpen && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-[#0A1128] bg-opacity-50 z-50"
          >
            <Calculator closeCalculator={toggleCalculator} />
          </div>
        )}

        {/* Floating Calculator Button */}
        <button onClick={toggleCalculator} className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg">
          <FaCalculator />
        </button>



      {isEditModalOpen && selectedLoad && (
        <EditLoadModal
          isOpen={isEditModalOpen}
          loadData={selectedLoad}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedLoad) => {
            setLoads(loads.map(load => load._id === updatedLoad._id ? updatedLoad : load));
            setIsEditModalOpen(false);
          }}
        />
      )}

      {isDeleteModalOpen && selectedLoad && (
        <DeleteLoadModal
          isOpen={isDeleteModalOpen}
          loadData={selectedLoad}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AllLoads;
