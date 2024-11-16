import React, { useEffect, useState } from 'react';
import { 
  FaTachometerAlt, FaUserCheck, FaHeadset, FaTruck, FaFileInvoiceDollar, 
  FaDollarSign, FaClipboardList, FaChartLine, FaBars, FaTimes 
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom'; 
import Footer from './Footer';
import { auth } from '../assets/firebase-config'

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const authorizedUsers = ['admin@sarencoinc.com', 'munaa@sarencoinc.com', 'accounting@sarencoinc.com'];
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Get the current user's role
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      // Check if the user is in the authorized users array
      if (authorizedUsers.includes(email)) {
        setUserRole('authorized');
      } else {
        setUserRole('user');
      }
    }
  }, []);

  return (
    <>
      {/* Toggle button for mobile */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-2 fixed top-2 left-2 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text z-50 rounded-md"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text p-4 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-60 w-60 z-40`}
      >
        <div className="flex items-center mb-8">
          <div className="ml-6 text-xl font-semibold">OPER8</div>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
        <NavLink
            to="/"
            className={({ isActive }) => 
              isActive 
                ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
            }
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <div className="text-xs uppercase text-gray-500 mt-4">User Management</div>
          <NavLink
            to="/dispatchers"
            className={({ isActive }) => 
              isActive 
                ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
            }
          >
            <FaHeadset /> Dispatchers
          </NavLink>

          <NavLink
            to="/drivers"
            className={({ isActive }) => 
              isActive 
                ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
            }
          >
            <FaUserCheck /> Drivers
          </NavLink>

          <div className="text-xs uppercase text-gray-500 mt-4">Loads</div>
          <NavLink
            to="/loads"
            className={({ isActive }) => 
              isActive 
                ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
            }
          >
            <FaTruck /> Loads
          </NavLink>

          <div className="text-xs uppercase text-gray-500 mt-4">Financial Reports</div>
          <NavLink
            to="/expenses"
            className={({ isActive }) => 
              isActive 
                ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
            }
          >
            <FaClipboardList /> Expenses
          </NavLink>

          {userRole === 'authorized' && (
            <>
              <NavLink
                to="/payroll"
                className={({ isActive }) => 
                  isActive 
                    ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                    : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
                }
              >
                <FaDollarSign /> Payroll
              </NavLink>

              <NavLink
                to="/balances"
                className={({ isActive }) => 
                  isActive 
                    ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary' 
                    : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
                }
              >
                <FaFileInvoiceDollar /> Balances
              </NavLink>
            </>
          )}

          <div className="text-xs uppercase text-gray-500 mt-4">Tracking</div>
          <NavLink
            to="/tracking"
            className={({ isActive }) => 
              isActive
                ? 'flex items-center gap-2 text-sm p-2 rounded-md bg-gray-700 text-dark-primary'
                : 'flex items-center gap-2 text-sm p-2 rounded-md hover:bg-gray-700 hover:text-[#F5F1ED]'
            }
            style={{
              pointerEvents: /* Replace `true` with your disabling condition */ true ? 'none' : 'auto',
              opacity: /* Optional: make the link look disabled */ true ? 0.5 : 1,
            }}
          >
            <FaChartLine /> Tracking
          </NavLink>
        </nav>

        <Footer />
      </aside>

      {/* Background overlay when sidebar is open */}
      {isOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
        ></div>
      )}
    </>
  );
};

export default SideBar;
