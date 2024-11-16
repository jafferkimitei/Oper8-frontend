import React from 'react';
import './LoadingTruck.css';

const LoadingTruck = ({ isLoading }) => {
  return (
    <div className={`loading-container ${isLoading ? 'visible' : 'fade-out'}`}>
      <div className="truck-animation">
        <div className="truck-body">
          <div className="truck-cab"></div>
          <div className="truck-trailer"></div>
        </div>
        <div className="truck-wheels">
          <div className="wheel front-wheel"></div>
          <div className="wheel back-wheel"></div>
        </div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingTruck;
