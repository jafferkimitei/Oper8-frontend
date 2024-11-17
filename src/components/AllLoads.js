import React, { useEffect, useState } from 'react'; 
import { FaTrashAlt, FaPen } from 'react-icons/fa';
import DeleteLoadModal from './DeleteLoadModal';
import EditLoadModal from './EditLoadModal';
import { getAllLoads, deleteLoadById } from '../services/load-api';
import { fetchDriverById } from '../services/driver-api';
import { fetchDispatcherById } from '../services/dispatcher-api';
import { fetchDataWithRetry } from '../utils/retryHelper';
import { toSentenceCase } from '../utils/textUtils';
import { auth } from '../assets/firebase-config';

const AllLoads = () => {
  const [loads, setLoads] = useState([]);
  const [drivers, setDrivers] = useState(new Map());
  const [dispatchers, setDispatchers] = useState(new Map());
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
                  if (driver && driver._id) { // Check if driver is valid and has an _id
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
                  if (dispatcher && dispatcher._id) { // Check if dispatcher is valid and has an _id
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

  const handleDeleteClick = (load) => {
    setSelectedLoad(load);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedLoad) {
      try {
        await deleteLoadById(selectedLoad._id);
        setLoads(loads.filter((load) => load._id !== selectedLoad._id));
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('Error deleting load:', error);
      }
    }
  };

  const handleEditClick = (load) => {
    setSelectedLoad(load); 
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage); 
    }
  };

  return (
    <div className="mt-6">
      {/* Wrapper to make the table horizontally scrollable on smaller screens */}
      <div className="overflow-x-auto min-w-full">
        <table className="min-w-full bg-light-background border dark:bg-dark-background border-border dark:border-dark-border shadow-lg text-xs md:text-sm">
          <thead>
            <tr className="bg-light-accent dark:bg-dark-accent border-b border-border dark:border-dark-border">
              <th className="p-2 text-left text-light-text dark:text-dark-text">#</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">From</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">To</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">PU Date</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Rate</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Driver</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text">Dispatcher</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text hidden md:table-cell">Driver Earnings</th>
              <th className="p-2 text-left text-light-text dark:text-dark-text hidden md:table-cell">Dispatcher Earnings</th>
              {/* Conditionally render Actions column header based on user role */}
              {userRole === 'admin' && (
                                <th className="p-2 text-left text-light-text dark:text-dark-text">Actions</th>
                            )}
            </tr>
          </thead>
          <tbody>
            {loads.map((load, index) => {
              const rowIndex = (currentPage - 1) * 10 + index + 1;
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
                  <td className="p-2 text-light-text dark:text-dark-text">{load.rate}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{driver ? toSentenceCase(driver.name) : 'N/A'}</td>
                  <td className="p-2 text-light-text dark:text-dark-text">{dispatcher ? toSentenceCase(dispatcher.name) : 'N/A'}</td>
                  <td className="p-2 text-light-text dark:text-dark-text hidden md:table-cell">{load.driverEarnings}</td>
                  <td className="p-2 text-light-text dark:text-dark-text hidden md:table-cell">{load.dispatcherEarnings}</td>
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
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default AllLoads;
