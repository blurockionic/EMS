// ErrorPage.jsx

import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg text-gray-600">Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
