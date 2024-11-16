import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = ({ title }) => {
  const location = useLocation();

  
  const pageTitle = title || getPageTitle(location.pathname);

  const getPageTitle = (path) => {
    switch (path) {
      case '/payroll':
        return 'Payroll Management';
      case '/employees':
        return 'Employee Records';
      case '/reports':
        return 'Payroll Reports';
      default:
        return 'Company Dashboard';
    }
  };

  return (
    <header className="bg-blue-600 text-white py-4 px-6">
      <h1 className="text-3xl font-semibold">{pageTitle}</h1>
    </header>
  );
};

export default Header;
