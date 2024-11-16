import { useState } from 'react';

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('AllDrivers');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  return (
    <div className="flex space-x-4 border-b">
      {/* Hide "All Drivers" tab on smaller screens */}
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'AllDrivers' ? 'border-b-2 border-blue-500' : ''} hidden md:block`}
        onClick={() => handleTabChange('AllDrivers')}
      >
        All Drivers
      </button>
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'AddDriverForm' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => handleTabChange('AddDriverForm')}
      >
        Create Driver
      </button>
    </div>
  );
};

export default Tabs;
