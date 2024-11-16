import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import LoadingTruck from './LoadingTruck';

const Layout = ({ children, loading }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for large screens, collapsible for smaller screens */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-60' : 'ml-0'
        } md:ml-60`}
      >
        {/* Topbar, which is always visible */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Conditional rendering for loading state */}
        {loading ? (
          <div className="flex justify-center items-center flex-1">
            <LoadingTruck isLoading={loading} />
          </div>
        ) : (
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        )}
      </div>
    </div>
  );
};

export default Layout;
