import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Admin_dashboard from "./components/admindashboard/Admin_Dashboard.jsx";

import Admin_Employees from "./components/admindashboard/Admin_Employees.jsx";
import Admin_NewProject from "./components/admindashboard/Admin_NewProject.jsx";
import Admin_Projects from "./components/admindashboard/Admin_Projects.jsx";
import Admin_Reports from "./components/admindashboard/Admin_Reports.jsx";
import { Nav_Sidebar } from "./components/common_component/Nav_Sidebar.js";
import { useState } from "react";
import LoginPage from "./components/login/LoginPage.js";
import Home_page from "./components/admindashboard/Home_page.jsx";
import { useEffect } from "react";
import axios from "axios";

// import LoginPage from "./components/login/LoginPage.js";

export const server = "http://0.0.0.0:0/api/v1"

function App() {
  const [isloggedIn, setloggedIn] = useState(true);

  // useEffect(()=>{
  //   const data =  axios.get("http://192.168.1.9:4000/api/v1/users/me", {
  //     withCredentials: true 
  //   })
  //   console.log(data)
  // },[])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Admin_dashboard />}>
          <Route path="Home" element={<Home_page />} />
          <Route path="Employees" element={<Admin_Employees />} />
          <Route path="New_projects" element={<Admin_NewProject />} />
          <Route path="Projects" element={<Admin_Projects />} />
          <Route path="Reports" element={<Admin_Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
