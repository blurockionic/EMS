// Loader.js

import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 h-12 w-12"></div>
      <p className="text-gray-600 px-4">Please wait...</p>
    </div>
  );
};

export default Loader;
