import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

import { fetchProfile } from "../../../Redux/slices/profileSlice";
import EmployeeTable from "../../../component/utilities-components/EmployeeTable";
import NewEmployee from "../../HR/NewEmployee";
import Loader from "../../../component/utilities-components/Loader";
import { IoMdPersonAdd } from "react-icons/io";

import { LuGalleryVerticalEnd, LuLayoutList } from "react-icons/lu";

const Employee = () => {
  const dispatch = useDispatch();
  const [activeTeamTab, setActiveTeamTab] = useState("Employee Details");
  const [viewMode, setViewMode] = useState("gallery");

  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTeamTab(tab);
  };

  // Show loader if data is loading
  if (profileStatus === "loading") {
    return <Loader />;
  }

  return (
    <>
      {profile?.role === "admin" ? (
        <div>
          {/* Employees Tabs */}
          <div className="flex flex-row justify-between shadow-lg space-x-2 ">
            <div className="flex flex-row">
              <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTeamTab === "Employee Details"
                      ? "bg-gray-900 text-white"
                      : ""
                  } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer`}
                  onClick={() => handleTabClick("Employee Details")}
                >
                  All Employees
                </button>
              </div>

              <div className=""></div>
            </div>
            <div className="flex flex-row">
              <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
                <button
                  className={`tooltip-class p-2 rounded ${
                    viewMode === "table"
                      ? "bg-slate-900 dark:bg-gray-800"
                      : "bg-gray-500 dark:bg-gray-700"
                  }`}
                  onClick={() => setViewMode("table")}
                  data-tip="Switch to Table View"
                >
                  <LuLayoutList className="text-white dark:text-gray-300" />
                  <Tooltip anchorSelect=".tooltip-class" place="bottom">
                    Table View
                  </Tooltip>{" "}
                </button>
                <button
                  className={`tooltip-2-class p-2 rounded ${
                    viewMode === "gallery"
                      ? "bg-slate-900 dark:bg-gray-800"
                      : "bg-gray-500 dark:bg-gray-700"
                  }`}
                  onClick={() => setViewMode("gallery")}
                  data-tip="Switch to Gallery View"
                >
                  <LuGalleryVerticalEnd className="text-white dark:text-gray-300" />
                  <Tooltip anchorSelect=".tooltip-2-class" place="bottom">
                    Gallery View
                  </Tooltip>{" "}
                </button>
                <button
                  className={`p-2 rounded ${
                    activeTeamTab === "Create New Employee"
                      ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 text-blue-500"
                      : "bg-gray-500 dark:hover:bg-[#21262C] hover:bg-slate-400  dark:bg-gray-700"
                  }`}
                  onClick={() => handleTabClick("Create New Employee")}
                >
                  <span>
                    <IoMdPersonAdd className="text-xl text-white dark:text-gray-300" />
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* All Employees Details Table */}
          {activeTeamTab === "Employee Details" && (
            <div className="mt-5">
              <EmployeeTable viewMode={viewMode} />
            </div>
          )}
          {/* Create new Employees Details */}
          {activeTeamTab === "Create New Employee" && (
            <div className="mt-5">
              <NewEmployee />
            </div>
          )}
        </div>
      ) : (
        <div>
          {/* Employees Tabs */}
          <div className="flex flex-row justify-between shadow-lg space-x-2 ">
            <div className="flex flex-row">
              <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTeamTab === "Employee Details"
                      ? "bg-gray-900 text-white"
                      : ""
                  } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer`}
                  onClick={() => handleTabClick("Employee Details")}
                >
                  All Employees
                </button>
              </div>

              <div className=""></div>
            </div>
            <div className="flex flex-row">
              <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
                <button
                  className={`tooltip-class p-2 rounded ${
                    viewMode === "table"
                      ? "bg-slate-900 dark:bg-gray-800"
                      : "bg-gray-500 dark:bg-gray-700"
                  }`}
                  onClick={() => setViewMode("table")}
                  data-tip="Switch to Table View"
                >
                  <LuLayoutList className="text-white dark:text-gray-300" />
                  <Tooltip anchorSelect=".tooltip-class" place="bottom">
                    Table View
                  </Tooltip>{" "}
                </button>
                <button
                  className={`tooltip-2-class p-2 rounded ${
                    viewMode === "gallery"
                      ? "bg-slate-900 dark:bg-gray-800"
                      : "bg-gray-500 dark:bg-gray-700"
                  }`}
                  onClick={() => setViewMode("gallery")}
                  data-tip="Switch to Gallery View"
                >
                  <LuGalleryVerticalEnd className="text-white dark:text-gray-300" />
                  <Tooltip anchorSelect=".tooltip-2-class" place="bottom">
                    Gallery View
                  </Tooltip>{" "}
                </button>
               
              </div>
            </div>
          </div>
          {/* All Employees Details Table */}
          {activeTeamTab === "Employee Details" && (
            <div className="mt-5">
              <EmployeeTable viewMode={viewMode} />
            </div>
          )}

        </div>
      )}
    </>
  );
};

export default Employee;
