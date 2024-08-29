import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedIn } from "../../Redux/slices/authSlice";

const ProtectedRoute = ({ children }) => {
  const loggedIn = useSelector(selectLoggedIn);

   // Check localStorage or cookies for authentication token
   const authToken = localStorage.getItem('authToken'); // or check cookies
   if (!loggedIn && !authToken) {
     return <Navigate to="/login" />;
   }
 
  // if (!loggedIn) {
  //   // Redirect to login if not logged in
  //   return <Navigate to="/login" />;
  // }

  return children;
};

export default ProtectedRoute;
