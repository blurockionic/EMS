import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-900 dark:border-white "></div>
    </div>
  );
};

export default Loader;
