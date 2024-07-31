import React from "react";

const ComingSoon = ({ featureName }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 m-4 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {featureName} - Coming Soon!
      </h2>
      <p className="text-gray-600 mb-6">
        We are working hard to bring you this feature. Stay tuned!
      </p>
    </div>
  );
};

export default ComingSoon;
