import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Login from "./page/auth/Login";
// import AdminDashboard from "./page/admin/dashboard/AdminDashboard";
import Home from "./page/home/Home";
import Employee from "./page/admin/Total_employees/Employee";
import NewProject from "./page/admin/project/NewProject";
import AllProject from "./page/admin/project/AllProject";
import MainDashboard from "./page/mainDashboard/MainDashboard";
import NewEmployee from "./page/HR/NewEmployee";
import HrDashaboard from "./page/HR/HrDashaboard";
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
import EmpTasksDetails from "./page/employee/EmpTasksDetails";
import SingleTaskDetails from "./component/pages-components/SingleTaskDetails";
import { fetchProfile } from "./Redux/slices/profileSlice";
import { useEffect } from "react";
import YourProfilePage from "./component/pages-components/YourProfilePage";
import YourOrganization from "./component/pages-components/YourOrganization";
import CreateMilestone from "./component/milestone-components/CreateMilestone";
import ProjectDetails from "./component/pages-components/ProjectDetails";
import IssuesComp from "./page/admin/issue/IssuesComp";
import ComingSoon from "./component/utilities-components/ComingSoon";
import Meeting from "./component/meet-components/Meeting";
import ToDo from "./component/Todo_Components/ToDo";

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
          <Route path="allIssue" element={<IssuesComp />} />

          {/* Team for all  */}
          <Route path="newTeam" element={<Team />} />
          <Route path="myprofile" element={<YourProfilePage />} />
          <Route path="myorganization" element={<YourOrganization />} />

          {/* //common  */}
          <Route path="newEmployee" element={<NewEmployee />} />
          <Route path="projectdetails" element={<ProjectDetails />} />
          <Route path="newMilestone/:projectId" element={<CreateMilestone />} />
          <Route path="commingSoon" element={<ComingSoon/>} />
          <Route path="meeting" element={<Meeting/>} />
          <Route path="meeting" element={<Meeting/>} />
          <Route path="myTodo" element={<ToDo/>} />
          {/* <Route path="newMeeting" element={<Meeting/>} /> */}

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
