import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi"; // Import the hamburger icon
import Header from "../../component/utilities-components/Header";
import { Outlet } from "react-router-dom";
import SideNavbar from "../../component/admin/SideNavbar";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  const [active, setActive] = useState(false);
  const sidebarClass = `bg-white z-50 h-full fixed top-0 transition-transform duration-500 ${
    active ? "translate-x-0 w-[18rem]" : "-translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 top-0 bg-gray-800 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "w-full h-full fixed" : "hidden"
  }`;
  return (

    <div className="flex flex-col h-screen w-full relative">
      <nav className="w-full p-3 flex flex-row justify-between bg-gray-100 border py-3">
        <GiHamburgerMenu onClick={() => setActive(true)} />
      </nav>
      {/* <div
        className={`relative z-30 h-full  transform transition-transform duration-300 ease-in-out ${
          active ? "translate-x-0 " : "-translate-x-full"
          }`}
      >
        <SideNavbar setActive={setActive} />
      </div> */}
        <Header />
      

      {/* {active && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setActive(false)}
        ></div>
      )} */}

      <div className="flex-grow relative overflow-auto">
        <Outlet />
      </div>

      <div className={sidebarClass}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <div className="w-full flex justify-between px-3 items-center py-5">
              <span className="text-lg uppercase">DG Caterers</span>
              <button
                className="self-end p-2 m-2 text-gray-600 hover:text-red-600"
                onClick={()=> setActive(false)}
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <ul>
          <li className="mb-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Profile
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Settings
            </a>
          </li>
        </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
           
          </div>
        </div>
      </div>
      <div className={blurEffectClass}
      //  onClick={toggleSidebar}
       >

      </div>
    </div>
  );
};

export default Home;
