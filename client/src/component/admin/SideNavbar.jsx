import React from "react";
import { GiCrossMark } from "react-icons/gi"; // Import a close icon
import logo from "./../../assets/logo.svg";

const SideNavbar = ({ setActive }) => {
  return (
    <div className="absolute inset-0 top-0 w-[20rem] h-screen z-30 bg-white  p-4">
      <div className="flex justify-between items-center mb-4">
        <img src={logo} alt="logo" className="w-40" />
        <GiCrossMark
          className="cursor-pointer"
          onClick={() => setActive(false)}
        />
      </div>
      <nav>
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
      </nav>
    </div>
  );
};

export default SideNavbar;
