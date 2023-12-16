import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { server } from "../../../App";

const SideNavbar = () => {
  const navigate = useNavigate()
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

  const handleOnLogout =async()=>{
    const response = await axios.get(`${server}/users/logout`, {
      withCredentials: true,
    });

    const {success, message} = response.data

    if(success){
      alert(message)
      navigate("../login")
    }
  }
  return (
    <aside className="bg-gray-800 text-white h-[630px]  flex flex-col">
      <nav className="flex-1">
        <div className="flex h-full w-64 mt-3 ">
          <ul className="flex-row justify-center w-full ">
            {/* admin dashboard  */}
            {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer 
            
              `}
              >
                {/* Dashboard button  */}
                <Link to={"./home"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "home"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
              </li>
            )}

            <li
              className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
          
            `}
            >
              <Link to={"./employee"} className="uppercase  font-bold">
                <button
                  className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                    path === "employee"
                      ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                      : "bg-white"
                  }`}
                >
                  Employee
                </button>
              </Link>
            </li>

            {/* // it visible when user type is admin  */}
            {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2 cursor-pointer
                
                  `}
              >
                {/* New Project  */}
                <Link to={"./newProject"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5 z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "newProject"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    New Project
                  </button>
                </Link>
              </li>
            )}

            {/* // it visible when user type is admin  */}
            {profile.designationType === "admin" && (
              <li
                className={`flex items-center text-start text-black mb-2 cursor-pointer
              
                `}
              >
                {/* All Project */}
                <Link to={"./allProject"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5 z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "allProject"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    All Project
                  </button>
                </Link>
              </li>
            )}

            {/* //new employee for humanresources */}
            {profile.designationType === "human resources"  && (
              <li
                className={`flex items-center text-start text-black mb-2   cursor-pointer
              
                `}
              >
                {/* New Employees */}
                <Link to={"./newEmployee"} className="uppercase  font-bold">
                  <button
                    className={`w-60 rounded-md hover:shadow-md hover:bg-slate-500 hover:text-white px-2 pl-5  z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                      path === "newEmployee"
                        ? "text-sky-500 border-r-4 border-r-sky-500 bg-orange-50 "
                        : "bg-white"
                    }`}
                  >
                    New Employee
                  </button>
                </Link>
              </li>
            )}



            {/* employee  */}
            {
              profile.designationType === "employee" && (
                <li
                className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
              
                `}
              >
                <Link to={"./employeedashboard"} className="uppercase  font-bold">
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
              )
            }
          </ul>
        </div>
      </nav>
      <div className="p-4">
        <button className="bg-white text-gray-800 px-4 py-2 rounded-md w-full" onClick={handleOnLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
