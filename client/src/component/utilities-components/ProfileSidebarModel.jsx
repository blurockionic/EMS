import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";

const ProfileSidebarModel = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  // const profileStatus = useSelector((state) => state.profile.status);
  // const employeeStatus = useSelector((state) => state.employee.status);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const sidebarClass = ` dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 ${
    active ? "translate-x-0 w-[18rem]" : "translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;

  return (
    <div>
      <div className={sidebarClass}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <div className="w-full flex justify-between px-4 items-center py-5">
              <span className="text-lg font-bold">
                {" "}
                {profile.firstName} {profile.lastName}{" "}
              </span>
              <button
                className="self-end p-2 m-2  hover:text-red-600"
                onClick={() => setActive(false)}
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <ul>
              <li className="mb-4">
                <a href="#" className="hover:bg-gray-200 dark:hover:bg-[#2B3037]">
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                  Profile
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center"></div>
        </div>
      </div>
      <div className={blurEffectClass} onClick={() => setActive(false)}></div>
    </div>
  );
};

export default ProfileSidebarModel;
