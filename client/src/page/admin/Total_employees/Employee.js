import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  filterEmployeeData,
  setActiveTeamTab,
} from "../../../Redux/slices/employeeSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import EmployeeTable from "../../../component/utilities-components/EmployeeTable";
import NewEmployee from "../../HR/new/NewEmployee";
import Loader from "../../../component/utilities-components/Loader";

const Employee = () => {
  const dispatch = useDispatch();
  const activeTeamTab = useSelector((state) => state.employee.activeTeamTab);
  const employeeData = useSelector((state) => state.employee.data);
  const employeeStatus = useSelector((state) => state.employee.status);
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(filterEmployeeData(e.target.value));
  };

  const handleTabClick = (tab) => {
    dispatch(setActiveTeamTab(tab));
  };

  // Show loader if data is loading
  if (employeeStatus === "loading" || profileStatus === "loading") {
    return <Loader />;
  }

  return (
    <>
      {profile.role === "admin" ? (
        <div>
          {/* Employees Tabs */}
          <div className="flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTeamTab === "Employee Details"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "dark:bg-gray-700"
              }`}
              onClick={() => handleTabClick("Employee Details")}
            >
              All Employees
            </div>
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTeamTab === "Create New Employee"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "dark:bg-gray-700"
              }`}
              onClick={() => handleTabClick("Create New Employee")}
            >
              Create new Employee
            </div>
          </div>
          {/* All Employees Details Table */}
          {activeTeamTab === "Employee Details" && (
            <div className="mt-4">
              <div className="mt-5">
                <div className="mb-2">
                  {/* handle search */}
                  <div className="w-96 flex items-center border border-slate-300 rounded-md p-1 mx-1">
                    <span className="text-xl mx-1">&#128269;</span>
                    <input
                      type="text"
                      onChange={handleSearch}
                      placeholder="Search employee name..."
                      className="w-96 p-1 rounded-lg outline-none"
                    />
                  </div>
                </div>
                <EmployeeTable employeeData={employeeData} />
              </div>
            </div>
          )}
          {/* Create new Employees Details */}
          {activeTeamTab === "Create New Employee" && (
            <div className="mt-4">
              <div className="mt-5"></div>
              <div>
                <NewEmployee />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTeamTab === "Employee Details"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("Employee Details")}
            >
              All Employees
            </div>
          </div>

          {activeTeamTab === "Employee Details" && (
            <div className="mt-4">
              <div className="mt-5">
                <div className="mb-2">
                  {/* handle search */}
                  <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
                    <span className="text-xl mx-1">&#128269;</span>
                    <input
                      type="text"
                      onChange={handleSearch}
                      placeholder="Search employee name..."
                      className="w-96 p-2 rounded-lg outline-none"
                    />
                  </div>
                </div>
                <EmployeeTable employeeData={employeeData} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Employee;
