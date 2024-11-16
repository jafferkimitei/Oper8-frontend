
import { useState } from 'react';

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('ViewExpense');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    onTabChange(tabName);
  };

  return (
    <div className="flex space-x-4 border-b">
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'ViewExpense' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => handleTabChange('ViewExpense')}
      >
        View Expense
      </button>
      <button
        className={`py-2 px-4 text-lg ${activeTab === 'AddExpense' ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => handleTabChange('AddExpense')}
      >
        Add Expense
      </button>
    </div>
  );
};

export default Tabs;
