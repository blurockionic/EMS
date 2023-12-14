import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./page/auth/Login";
import AdminDashboard from "./page/admin/dashboard/AdminDashboard";
import Home from "./page/admin/home/Home";
import Employee from "./page/admin/employee/Employee";
import NewProject from "./page/admin/project/NewProject";
import AllProject from "./page/admin/project/AllProject";
import MainDashboard from "./page/mainDashboard/MainDashboard";
import NewEmployee from "./page/HR/new/NewEmployee";

export const server = "http://localhost:4000/api/v1"

function App() {
  return (
    // <Login/>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />

        {/* //protected route  */}
        <Route path="/dashboard" element={< MainDashboard/>}>
          <Route path="" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="employee" element={<Employee/>}/>
          <Route path="newProject" element={<NewProject/>}/>
          <Route path="allProject" element={<AllProject/>}/>
          <Route path="newEmployee" element={<NewEmployee/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
