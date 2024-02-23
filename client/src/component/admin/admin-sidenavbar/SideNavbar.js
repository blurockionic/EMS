import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { server } from "../../../App";
import { RxDashboard } from "react-icons/rx";
import { FaProjectDiagram, FaUsers } from "react-icons/fa";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { TbReportAnalytics } from "react-icons/tb";
import { CiSquareInfo } from "react-icons/ci";
import logo from "../../../assets/employee.png";
import { LuChevronFirst } from "react-icons/lu";
import { TbFileReport } from "react-icons/tb";
import { RiFolderHistoryLine } from "react-icons/ri";
import { RiNotificationBadgeLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

const SideNavbar = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);
  const [sureLogoutModel, setSureLogoutModel] = useState(false);

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

  const handleCloseModal = () => {
    setSureLogoutModel(false);
  };

  // handle for logout

  const handleOnLogout = async () => {
    const response = await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });

    const { success, message } = response.data;

    if (success) {
      alert(message);
      navigate("../login");
    }
  };
  return (
    <aside className="bg-gray-200 text-white h-screen  flex flex-col ">
      <nav className="flex h-full flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center ">
          {/* brand  */}
          <img src={logo} alt="logo" className="w-40" />
          {/* collapsable button  */}
          <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700">
            <LuChevronFirst />
          </button>
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
                  <span className="my-1 mr-1">
                    <RxDashboard />
                  </span>
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
              <Link to={"./managerdashboard"}>
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "home"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <RxDashboard />
                  </span>
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
                  <span className="my-1 mr-1">
                    <RxDashboard />
                  </span>
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
              <Link to={"./employee"}>
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "employee"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <FaUsers />
                  </span>
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
                  <span className="my-1 mr-1">
                    <AiOutlineFundProjectionScreen />
                  </span>
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
                  <span className="my-1 mr-1">
                    <BiLogoMicrosoftTeams />
                  </span>
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
                  <span className="my-1 mr-1">
                    <TbReportAnalytics />
                  </span>
                  Report
                </button>
              </Link>
            </li>
          )}
          {/* Admin App version info tab  */}
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
                  <span className="my-1 mr-1">
                    <CiSquareInfo />
                  </span>
                  Info
                </button>
              </Link>
            </li>
          )}

          {/* manager  */}
          {profile.designationType === "manager" && (
            <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
            >
              {/* New Employees */}
              <Link to={"./managerproject"} className="uppercase  font-bold">
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "managerproject"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <FaProjectDiagram />
                  </span>
                  Project
                </button>
              </Link>
            </li>
          )}

          {profile.designationType === "manager" && (
            <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
            >
              {/* New Employees */}
              <Link to={"./managerreport"} className="uppercase  font-bold">
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "managerreport"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <TbFileReport />
                  </span>
                  Project Report
                </button>
              </Link>
            </li>
          )}

         

          {/* manager Leave Details */}
          {profile.designationType === "manager" && (
            <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
            >
              {/* New Employees */}
              <Link to={"./empleave"} className="uppercase  font-bold">
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "empleave"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <spna className="my-1 mr-1">
                    <RiNotificationBadgeLine />
                  </spna>
                  Leave
                </button>
              </Link>
            </li>
          )}


           {/* App version info for manager */}
           {profile.designationType === "manager" && (
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
                  <span className="my-1 mr-1">
                    <CiSquareInfo />
                  </span>
                  Info
                </button>
              </Link>
            </li>
          )}

          {/* manager end  */}

          {/* employee dashboard   */}
          {profile.designationType === "employee" && (
            <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
            >
              <Link to={"./employeedashboard"} className="uppercase  font-bold">
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "employeedashboard"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <RxDashboard />
                  </span>
                  Dashboard
                </button>
              </Link>
            </li>
          )}
          {/* employee report history  */}
          {profile.designationType === "employee" && (
            <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
            >
              <Link to={"./reporthistory"} className="uppercase  font-bold">
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "reporthistory"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <RiFolderHistoryLine />
                  </span>
                  Report History
                </button>
              </Link>
            </li>
          )}

          {/* Employee Team related details */}
          {profile.designationType === "employee" ? (
            <li
              className={`relative flex items-center px-3 my-1 font-medium rounded-md cursor-pointer transition-colors`}
            >
              {/* New Employees */}
              <Link to={"./empteam"} className="uppercase  font-bold">
                <button
                  className={`w-56 px-2 pl-4 py-2 my-1 flex text-left text-lg font-semibold duration-300 rounded-md hover:shadow-md ${
                    path === "empteam"
                      ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-900 "
                      : "hover:bg-indigo-50 text-gray-600"
                  }`}
                >
                  <span className="my-1 mr-1">
                    <BiLogoMicrosoftTeams />
                  </span>
                  Team
                </button>
              </Link>
            </li>
          ) : null}

          {/* App version info for employee */}
          {profile.designationType === "employee" && (
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
                  <span className="my-1 mr-1">
                    <CiSquareInfo />
                  </span>
                  Info
                </button>
              </Link>
            </li>
          )}



          
        </ul>
        {/* profile section  */}
        <div className="border-t flex p-3 ">
          <img
            src={`https://ui-avatars.com/api/?name=${profile.name}`}
            alt="profile"
            className="w-10 h-10 rounded-md"
          />
          <div className="flex justify-between items-center w-52 ml-3">
            <div className="leading-4">
              <h4 className="font-semibold text-gray-700 capitalize">
                {profile.name}
              </h4>
              <span className="text-sm text-gray-600">{profile.email}</span>
            </div>
            <IoIosLogOut
              className="text-gray-900"
              size={20}
              onClick={(e) => setSureLogoutModel(true)}
            />
          </div>
        </div>
      </nav>
      {/* Showing Sure  team Model  */}
      {sureLogoutModel && (
        <div className="z-10 inset-0 fixed   overflow-y-auto">
          <div className="flex items-center justify-center  min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-80"></div>
            </div>
            <div className="relative bg-white rounded-lg px-6 py-6  mx-auto">
              <div className="flex flex-col p-  text-center justify-between">
                <div className="font-serif mt-1 text-black text-2xl font-extrabold">
                  You are about to log out.
                </div>
                <span className="text-black text-xl font-serif">
                  Are you sure you want to proceed?
                </span>
                <div className=" mt-4  flex flex-row mx-auto  gap-12 justify-between">
                  <button
                    className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleOnLogout}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCloseModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default SideNavbar;
