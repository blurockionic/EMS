import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { server } from "../../../App";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { CiSquareInfo } from "react-icons/ci";
import logo from "../../../assets/logo.svg"
import { LuChevronFirst } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";

const SideNavbar = () => {
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);

  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location.pathname]);

  //get profile
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setProfile(response.data.user);
    };

    //invoke
    myProfile();
  }, []);

  // handle for logout

  // const handleOnLogout = async () => {
  //   const response = await axios.get(`${server}/users/logout`, {
  //     withCredentials: true,
  //   });

  //   const { success, message } = response.data;

  //   if (success) {
  //     alert(message);
  //     navigate("../login");
  //   }
  // };
  return (
    <aside className="bg-gray-200 text-white h-screen  flex flex-col ">
      <nav className="flex h-full flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center ">
          {/* brand  */}
          <img src={logo} alt="logo" className="w-32"/>
          {/* collapsable button  */}
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700"><LuChevronFirst/></button>
        </div>
        {/* navbar list  */}
        <ul className="flex-1 px-3 justify-center w-full mt-5">
            {/* admin dashboard  */}
            {profile.designationType === "admin" && (
              <li
                className={`relative flex items-center  px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* Dashboard button  */}
                <Link to={"./home"}>
                  <button
                    className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "home"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                  <span className="my-1 mr-1"><RxDashboard/></span>
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {/* manager dashboard */}
            {profile.designationType === "manager" && (
              <li
              className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* New Employees */}
                <Link
                  to={"./managerdashboard"}
                >
                  <button
                     className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "home"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                    <span className="my-1 mr-1"><RxDashboard/></span>
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {/* HR dashboard */}
            {profile.designationType === "human resources" && (
              <li
              className={`relative flex items-center px-3  font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* New Employees */}
                <Link to={"./hrdashboard"} className="uppercase  font-bold">
                  <button
                     className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "home"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                    <span className="my-1 mr-1"><RxDashboard/></span>
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {/* // employee section visible for admin and human resources and manager  */}
            {profile.designationType === "admin" ||
            profile.designationType === "human resources" ||
            profile.designationType === "manager" ? (
              <li
              className={`relative flex items-center px-3 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* New Employees */}
                <Link to={"./employee"} >
                  <button
                    className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "employee"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                    <span className="my-1 mr-1"><FaUsers/></span>
                    Employees 
                  </button>
                </Link>
              </li>
            ) : null}

         

            {/* // it visible when user type is admin  allProject */}
            {profile.designationType === "admin" ? (
              <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* All Project */}
                <Link to={"./allProject"} className="uppercase  font-bold">
                  <button
                   className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "allProject"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                  >
                    <span className="my-1 mr-1"><AiOutlineFundProjectionScreen/></span>
                  Project 
                  </button>
                </Link>
              </li>
            ) : null}

           

            {/* teams for admin       profile.designationType === "manager" || */}

            {profile.designationType === "admin" ? (
              <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* New Employees */}
                <Link to={"./newTeam"} className="uppercase  font-bold">
                  <button
                     className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "newTeam"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                    <span className="my-1 mr-1"><BiLogoMicrosoftTeams/></span>
                    Team
                  </button>
                </Link>
              </li>
            ) : null}

            {/* Admin Report */}
            {profile.designationType === "admin" && (
              <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* New Employees */}
                <Link to={"./adminreport"} className="uppercase  font-bold">
                  <button
                    className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "adminreport"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                    <span className="my-1 mr-1"><TbReportAnalytics/></span>
                    Report
                  </button>
                </Link>
              </li>
            )}
            {/* Admin Report */}
            {profile.designationType === "admin" && (
              <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
              >
                {/* New Employees */}
                <Link to={"./AppVersion"} className="uppercase  font-bold">
                  <button
                    className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                      path === "AppVersion"
                        ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                        : "hover:bg-indigo-50 text-gray-600"
                    }`}
                  >
                    <span className="my-1 mr-1"><CiSquareInfo/></span>
                   Info
                  </button>
                </Link>
              </li>
            )}

            {/* manager  */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./managerproject"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "managerproject"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Project
                  </button>
                </Link>
              </li>
            )}

            {/* {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees 
                <Link to={"./task"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "task"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    New Task
                  </button>
                </Link>
              </li>
            {/* )} */}

            {/* {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees 
                <Link to={"./alltask"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "alltask"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                     Task 
                  </button>
                </Link>
              </li>
            )} */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./managerreport"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "managerreport"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Project Report
                  </button>
                </Link>
              </li>
            )}

            {/* manager end  */}

            {/* employee  */}
            {profile.designationType === "employee" && (
              <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
              
                `}
              >
                <Link
                  to={"./employeedashboard"}
                  className="uppercase  font-bold"
                >
                  <button
                    className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "employeedashboard"
                        ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            {profile.designationType === "employee" && (
              <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
              
                `}
              >
                <Link to={"./reporthistory"} className="uppercase  font-bold">
                  <button
                    className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "reporthistory"
                        ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Report History
                  </button>
                </Link>
              </li>
            )}

            {/* Employees Leave Details */}
            {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./empleave"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "empleave"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Leave
                  </button>
                </Link>
              </li>
            )}

            {/* Team Details */}
            {/* {profile.designationType === "manager" && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
             
                <Link
                  to={"./empleave"}
                  className="uppercase  font-bold"
                >
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "empleave"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Team
                  </button>
                </Link>
              </li>
            )} */}
          </ul>
          {/* profile section  */}
          <div className="border-t flex p-3 ">
            <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff" alt="profile" className="w-10 h-10 rounded-md"/>
            <div className="flex justify-between items-center w-52 ml-3">
              <div className="leading-4">
                <h4 className="font-semibold text-gray-700">John Deo</h4>
                <span className="text-sm text-gray-600">johndeo@gmail.com</span>
              </div>
              <FiMoreVertical className="text-gray-900" size={20}/>
            </div>
          </div>
      </nav>
      
    </aside>
  );
};

export default SideNavbar;
