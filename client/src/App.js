import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./Redux/store"; // Ensure the casing matches your folder name

import Login from "./page/auth/Login";
// import AdminDashboard from "./page/admin/dashboard/AdminDashboard";
import Home from "./page/home/Home";
import Employee from "./page/admin/Total_employees/Employee";
import NewProject from "./page/admin/project/NewProject";
import AllProject from "./page/admin/project/AllProject";
import MainDashboard from "./page/mainDashboard/MainDashboard";
import NewEmployee from "./page/HR/new/NewEmployee";
import HrDashaboard from "./page/HR/new/HrDashaboard";
import ManagerDashboard from "./page/manager/dashboard/ManagerDashboard";
import NewTask from "./page/manager/task/NewTask";
import AllTask from "./page/manager/task/AllTask";
import EmployeeDashboard from "./page/employee/EmployeeDashboard";
import ReportHistory from "./page/employee/ReportHistory";
import ManagerProject from "./page/manager/project/ManagerProject";
import ManagerReport from "./page/manager/report/ManagerReport";
import AdminReport from "./page/admin/report/AdminReport";

import TaskReportFeedback from "./page/employee/TaskReportFeedback";
import EmpLeave from "./page/manager/empleaves/EmpLeave";
import Team from "./page/admin/team/Team";
import EmpTeam from "./page/employee/EmpTeam";
import AppVersion from "./page/admin/AppVersion/AppVersion";
import EmpTasksDetails from "./component/admin/EmpTasksDetails";
import SingleTaskDetails from "./component/admin/SingleTaskDetails";
import { fetchProfile } from "./Redux/slices/profileSlice";
import { useEffect } from "react";
import YourProfilePage from "./component/utilities-components/YourProfilePage";
import YourOrganization from "./component/utilities-components/YourOrganization";
import CreateMilestone from "./component/utilities-components/CreateMilestone";
import ProjectDetails from "./component/project/ProjectDetails";

// export const server = "https://ems-backend-66x8.onrender.com/api/v1"
export const server = "http://localhost:4000/api/v1";

function App() {

  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    document.body.className = theme;
    // console.log("issme kya value h ", document.body.className );
  }, [theme]);


  return (
    // <Login/>
 
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          {/* //protected route  */}
          <Route path="/dashboard" element={<Home />}>
            <Route path="" element={<Navigate to="home" />} />
            <Route path="home" element={<MainDashboard />} />
            <Route path="employee" element={<Employee />} />
            <Route path="newProject" element={<NewProject />} />
            <Route path="allProject" element={<AllProject />} />
            <Route path="adminreport" element={<AdminReport />} />
            <Route path="AppVersion" element={<AppVersion />} />

            {/* Team for all  */}
            <Route path="newTeam" element={<Team />} />
            <Route path="myprofile" element={<YourProfilePage />} />
            <Route path="myorganization" element={<YourOrganization />} />

            {/* //common  */}
            <Route path="newEmployee" element={<NewEmployee />} />
            <Route path="projectdetails" element={<ProjectDetails />} />
            <Route path="newMilestone/:projectId" element={<CreateMilestone />} />

            {/* hr  */}
            <Route path="hrdashboard" element={<HrDashaboard />} />

            {/* manager  */}
            <Route path="managerdashboard" element={<ManagerDashboard />} />
            <Route path="newTask" element={<NewTask />} />
            <Route path="alltask" element={<AllTask />} />
            <Route path="managerproject" element={<ManagerProject />} />
            <Route path="managerreport" element={<ManagerReport />} />
            
            <Route path="empleave" element={<EmpLeave />} />

            {/* employee  */}
            <Route path="employeeOverview" element={<EmployeeDashboard />} />
            <Route path="employeetask" element={<EmpTasksDetails />} />
            <Route
              path="singleTaksDetails/:taskId"
              element={<SingleTaskDetails />}
            />
            <Route path="reporthistory" element={<ReportHistory />} />
            <Route path="empteam" element={<EmpTeam />} />

            <Route path="taskreportfeedback" element={<TaskReportFeedback />} />
          </Route>
        </Routes>
      </Router>
    
  );
}

export default App;
