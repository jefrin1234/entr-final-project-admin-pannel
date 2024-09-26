import React from 'react';

function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Spinner;
