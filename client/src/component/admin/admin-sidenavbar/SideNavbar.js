import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();
  const [path, setPath] = useState(location?.pathname);

  useEffect(() => {
    setPath(location?.pathname?.split("/")[2]);
  }, [location.pathname]);
  return (
    <aside className="bg-gray-800 text-white h-[630px]  flex flex-col">
      <nav className="flex-1">
        <div className="flex h-full w-64">
          <ul className="flex-row justify-center w-full p-2">
            <li
              className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
          
            `}
            >
              <Link to={"./home"} className="uppercase  font-bold">
                <button
                  className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                    path === "home"
                      ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                      : "bg-white"
                  }`}
                >
                  Dashboard
                </button>
              </Link>
            </li>
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
            <li
              className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
          
            `}
            >
              <Link to={"./newProject"} className="uppercase  font-bold">
                <button
                  className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                    path === "newProject"
                      ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                      : "bg-white"
                  }`}
                >
                  New Project
                </button>
              </Link>
            </li>
            <li
              className={`flex items-center text-start text-black mb-2  rounded-lg cursor-pointer hover:bg-white hover:text-green-800
          
            `}
            >
              <Link to={"./allProject"} className="uppercase  font-bold">
                <button
                  className={`w-40 hover:shadow-md hover:bg-orange-600 hover:text-white px-2 pl-5 border-b z-20 py-2 my-1 flex text-left text-lg font-semibold text-black duration-300 ${
                    path === "allProject"
                      ? "text-orange-600 border-r-4 border-r-orange-600 bg-orange-50 "
                      : "bg-white"
                  }`}
                >
                  All Project
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="p-4">
        <button className="bg-white text-gray-800 px-4 py-2 rounded-md w-full">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideNavbar;
