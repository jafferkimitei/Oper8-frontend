import Layout from "../components/Layout";
import { useState, useEffect } from 'react';
import Tabs from '../components/LoadTabs';
import AllLoads from '../components/AllLoads';
import CreateNewLoad from '../components/CreateNewLoad';

const Loads = () => {
  const [activeTab, setActiveTab] = useState('AllLoads');
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
      setActiveTab('CreateNewLoad');
    }
  }, [isMobile]);


  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddSuccess = () => {
    setActiveTab('AllLoads');
  };

  return (
    <Layout>
      <div className="p-4">
        <Tabs onTabChange={handleTabChange} />
        <div className="mt-6">
          {activeTab === 'AllLoads' && <AllLoads />}
          {activeTab === 'CreateNewLoad' && <CreateNewLoad onAddSuccess={handleAddSuccess} />}
        </div>
      </div>
    </Layout>
  );
};

export default Loads;
