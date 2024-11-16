import { useState } from 'react';

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('AllDispatchers');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  const handleSaveSuccess = () => {
    alert('Dispatcher was successfully saved!');
  };

  return (
    <div className="flex space-x-4 border-b">
      {/* Hide this tab on smaller screens */}
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'AllDispatchers' ? 'border-b-2 border-blue-500' : ''} hidden md:block`}
        onClick={() => handleTabChange('AllDispatchers')}
      >
        All Dispatchers
      </button>
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'AddDispatcherForm' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => handleTabChange('AddDispatcherForm')}
      >
        Create Dispatcher
      </button>
    </div>
  );
};

export default Tabs;
