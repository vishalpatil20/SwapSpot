import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="animate-spin w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full"></div>
    </div>
  );
};

export default Loader;
