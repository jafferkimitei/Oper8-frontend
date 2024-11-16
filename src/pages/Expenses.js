
import Layout from "../components/Layout";
import { useState } from 'react';
import Tabs from '../components/ExpenseTabs';
import ViewExpense from '../components/ViewExpense';
import AddExpense from '../components/AddExpense';

const Expenses = () => {
  const [activeTab, setActiveTab] = useState('ViewExpense');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddSuccess = () => {
    setActiveTab('ViewExpense');
  };
  return (
    <Layout>
    <div className="p-4">
      <Tabs onTabChange={handleTabChange} />
      <div className="mt-6">
        {activeTab === 'ViewExpense' && <ViewExpense />}
        {activeTab === 'AddExpense' && <AddExpense onAddSuccess={handleAddSuccess} />}
      </div>
    </div>
    </Layout>
  );
};

export default Expenses;
