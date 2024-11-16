import Layout from "../components/Layout";
import { useState, useEffect } from 'react';
import Tabs from '../components/DispatcherTabs';
import AllDispatchers from '../components/AllDispatchers';
import AddDispatcherForm from '../components/AddDispatcherForm';

const Dispatchers = () => {
  const [activeTab, setActiveTab] = useState('AllDispatchers');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is smaller than the 'md' breakpoint (768px)
      setIsMobile(window.innerWidth < 768);
    };

    // Run once to set the initial value
    handleResize();

    // Add event listener on window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // If on mobile devices, set the default tab to 'AddDispatcherForm'
    if (isMobile) {
      setActiveTab('AddDispatcherForm');
    }
  }, [isMobile]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddSuccess = () => {
    setActiveTab('AllDispatchers');
  };

  return (
    <Layout>
      <div className="p-4">
        <Tabs onTabChange={handleTabChange} />
        <div className="mt-2">
          {activeTab === 'AllDispatchers' && <AllDispatchers />}
          {activeTab === 'AddDispatcherForm' && <AddDispatcherForm onAddSuccess={handleAddSuccess} />}
        </div>
      </div>
    </Layout>
  );
};

export default Dispatchers;
