import { useState, useEffect, useRef } from 'react';
import { FaBell, FaSun, FaMoon } from 'react-icons/fa';
import { auth } from '../assets/firebase-config';
import { useNavigate } from 'react-router-dom';

const avatarMapping = {
  'tracking@sarencoinc.com': '/assets/TrackingAvatar.jpg',
  'accounting@sarencoinc.com': '/assets/FinanceAvatar.jpg',
  'dispatch@sarencoinc.com': '/assets/DispatchAvatar.jpg',
  'admin@sarencoinc.com': '/assets/DefaultAvatar.jpg',
  'munaa@sarencoinc.com': '/assets/MunaaAvatar.jpg'
};

const TopBar = () => { 
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('/assets/DefaultAvatar.jpg');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      let message = '👋 Welcome back!';

      switch (email) {
        case 'tracking@sarencoinc.com':
          message = '👋 Welcome back Tracking team';
          break;
        case 'accounting@sarencoinc.com':
          message = '👋 Welcome back Finance team';
          break;
        case 'dispatch@sarencoinc.com':
          message = '👋 Welcome back dispatcher';
          break;
        case 'admin@sarencoinc.com':
          message = '👋 Welcome back Admin';
          break;
        case 'munaa@sarencoinc.com':
          message = '👋 Welcome back Munaa';
          break;
        default:
          message = '👋 Welcome back!';
      }

      setWelcomeMessage(message);

      const timer = setTimeout(() => {
        setWelcomeMessage('');
      }, 300000);

      return () => clearTimeout(timer);
    }
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const email = user.email ? user.email.toLowerCase() : 'guest';
      setAvatarUrl(avatarMapping[email] || '/assets/DefaultAvatar.jpg');
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
    const newTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(htmlElement.classList.contains('dark'));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  return (
    <header ref={dropdownRef} className="flex justify-between items-center p-4 mt-2 mr-8 ml-8 bg-[#FEFCFB]/40 dark:bg-[#0A1128] backdrop-blur-lg rounded-xl shadow-lg">
      {/* Left side (Welcome Message) */}
      <div className="flex items-center justify-start space-x-4 flex-grow">
        <h1 className="text-xl font-bold text-dark-accentt dark:text-light-accent">{welcomeMessage}</h1>
      </div>

      {/* Right side (Icons and Profile) */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('notifications')}
            className="p-2 rounded-full text-[#001F54] hover:bg-gray-700 dark:text-[#FF9900] hover:text-[#001F54]/40  focus:outline-none"
            aria-label="Notifications"
          >
            <FaBell size={16} />
          </button>
          {activeDropdown === 'notifications' && (
            <div className="absolute right-0 mt-2 w-72 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-md shadow-lg overflow-hidden">
              <div className="p-3 border-b border-[#001F54] text-sm font-semibold">
                Notifications & Alerts
              </div>
              <ul className="p-3 space-y-2 text-sm">
                <li className="p-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">Driver completed a delivery</li>
                <li className="p-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">Payment processed successfully</li>
                <li className="p-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">Payment failed for dispatcher</li>
                <li className="p-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">Unexpected load delay</li>
              </ul>
            </div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <FaSun size={18} className="text-[#FF9900]" />
            ) : (
              <FaMoon size={18} className="text-blue-500" />
            )}
          </button>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown('profile')}
            className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-[#FEFCFB] focus:outline-none"
            aria-label="User Profile"
          >
            <img
              src={avatarUrl}
              alt="User Profile"
              className="object-cover w-full h-full"
            />
          </button>
          {activeDropdown === 'profile' && (
            <div className="absolute right-0 mt-2 w-52 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text rounded-md shadow-lg overflow-hidden">
              <ul className="p-3 space-y-2 text-sm">
                <li onClick={handleLogout} className="p-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
