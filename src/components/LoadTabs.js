import { useState } from 'react';

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('AllLoads');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  return (
    <div className="flex space-x-4 border-b">
      {/* Hide the 'All Loads' tab on smaller devices */}
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'AllLoads' ? 'border-b-2 border-blue-500' : ''} hidden md:block`}
        onClick={() => handleTabChange('AllLoads')}
      >
        All Loads
      </button>
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'CreateNewLoad' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => handleTabChange('CreateNewLoad')}
      >
        Create new load
      </button>
    </div>
  );
};

export default Tabs;
