import React, { useEffect, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineProject,
  AiOutlineSetting,
  AiOutlineFile,
  AiOutlineLogout,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { FaRegBuilding } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { logout, resetState } from "../../Redux/slices/authSlice";

const ProfileSidebarModel = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 ${
    active ? "translate-x-0 w-[16rem]" : "translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;

  // handle for logout
  const navigate = useNavigate();

  const handleOnLogout = async () => {
    try {
      await dispatch(logout());
      dispatch(resetState()); // Reset Redux state immediately after logout

      alert("Logout successful!");
      navigate("/login"); // Navigate to login page upon successful logout
    } catch (error) {
      console.error("Error occurred during logout:", error.message);
      // Handle specific error cases if needed
      if (error.response) {
        alert(error.response.data.message); // Handle server response error
      } else if (error.request) {
        console.error("No response received from the server"); // Handle no response error
      } else {
        console.error("Error setting up the request:", error.message); // Handle request setup error
      }
    }
  };

  return (
    <div>
      <div className={sidebarClass}>
        <div className="flex flex-col justify-between h-full">
          <div className="w-full cursor-pointer">
            <div className="w-full flex justify-between px-4 items-center py-5 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  {profile?.firstName} {profile?.lastName}
                </span>
                <span> {profile?.role}</span>
              </div>
              <button
                className="self-end p-2 hover:text-red-600"
                onClick={() => setActive(false)}
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>

            <ul className="w-full mt-4">
              <div>
                <li className="mb-4 w-full">
                  <Link
                    to={"./myprofile"}
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 `}
                  >
                    <AiOutlineUser className="mr-3" /> Your Profile
                  </Link>
                </li>
                <li className="mb-4 w-full">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AiOutlineProject className="mr-3" /> Your Projects
                  </a>
                </li>
                <li className="mb-4 w-full">
                  <Link
                    to={"./myorganization"}
                    className={`flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 `}
                  >
                    <FaRegBuilding className="mr-3" /> Your Organization
                  </Link>
                </li>
              </div>
            </ul>
          </div>
          <div>
            <ul className="w-full">
              <div>
                <li className="mb-4 w-full">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AiOutlineSetting className="mr-3" /> Settings
                  </a>
                </li>
                <li className="mb-4 w-full">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AiOutlineFile className="mr-3" /> Docs
                  </a>
                </li>
                <li className="mb-4 w-full">
                  <span
                    onClick={() => handleOnLogout()}
                    className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <AiOutlineLogout className="mr-3" /> Log Out
                  </span>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className={blurEffectClass} onClick={() => setActive(false)}></div>
    </div>
  );
};

export default ProfileSidebarModel;
