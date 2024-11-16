import Layout from "../components/Layout";
import { useState, useEffect } from 'react';
import Tabs from '../components/DriverTabs';
import AllDrivers from '../components/AllDrivers';
import AddDriverForm from '../components/AddDriverForm';

const Drivers = () => {
  const [activeTab, setActiveTab] = useState('AllDrivers');
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
    // If on mobile devices, set the default tab to 'AddDriverForm'
    if (isMobile) {
      setActiveTab('AddDriverForm');
    }
  }, [isMobile]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddSuccess = () => {
    setActiveTab('AllDrivers');
  };

  return (
    <Layout>
      <div className="p-4">
        <Tabs onTabChange={handleTabChange} />
        <div className="mt-6">
          {activeTab === 'AllDrivers' && <AllDrivers />}
          {activeTab === 'AddDriverForm' && <AddDriverForm onAddSuccess={handleAddSuccess} />}
        </div>
      </div>
    </Layout>
  );
};

export default Drivers;
