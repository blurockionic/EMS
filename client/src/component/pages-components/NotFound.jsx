// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center">
      {/* <!-- Illustration --> */}

      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
        Oops! 404 Error
      </h1>

      {/* Message */}
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-semibold">
        We can't seem to find the page you're looking for.
      </p>
      <p className="mt-2 text-gray-500 dark:text-gray-400 font-semibold">
        It might have been removed, or you may have mistyped the address. Try
        checking the URL or head back to the homepage.
      </p>

     
      <Link
        to={"/"}
        className="mt-6 inline-block px-4 py-2 bg-slate-950 text-white rounded-md shadow hover:bg-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
