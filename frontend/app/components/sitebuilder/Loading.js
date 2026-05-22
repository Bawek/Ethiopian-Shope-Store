import React from 'react';
import './Loading.module.css'; // Import CSS for styling (create this file)

const LoadingIndicator = () => {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
    </div>
  );
};

export default LoadingIndicator;
