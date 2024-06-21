import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../../component/utilities-components/Header";
import { Outlet } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import Loader from "../../component/utilities-components/Loader";
import ProfileSidebarModel from "../../component/utilities-components/ProfileSidebarModel";
import ThemeToggle from "../../component/utilities-components/ThemeToggle";

const Home = () => {
  const [active, setActive] = useState(false);
  const [profileSideBar, setProfileSidebar] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);
  const employeeStatus = useSelector((state) => state.employee.status);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 transition-transform duration-500 ${
    active ? "translate-x-0 w-[18rem]" : "-translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 top-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "w-full h-full fixed" : "hidden"
  }`;

  return (
    <div className={`flex flex-col h-screen w-full relative`}>
      <nav
        className={`w-full p-3 flex flex-row justify-between  border border-slate-900 py-3  `}
      >
        <div className="flex font-bold mx-2 space-x-4">
          <GiHamburgerMenu
            className="text-3xl"
            onClick={() => setActive(true)}
          />
          <span className="text-lg">
            <span className="capitalize">{profile?.firstName} </span>
            <span className="capitalize">{profile?.lastName}</span>
          </span>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <button className="" onClick={() => setProfileSidebar(true)}>
            <CgProfile className="text-2xl" />
          </button>
        </div>
      </nav>
      <Header />

      <div className="flex-grow relative overflow-auto">
        <Outlet />
      </div>

      <div className={sidebarClass}>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-center w-full cursor-pointer">
            <div className="w-full flex justify-between px-3 items-center py-5">
              <span className="text-lg uppercase">DG Caterers</span>
              <button
                className="self-end p-2 m-2  hover:text-red-600"
                onClick={() => setActive(false)}
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>
            <ul>
              <li className="mb-4">
                <a href="#" className="hover:bg-gray-200 dark:hover:bg-gray-700">
                  Dashboard
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className=" hover:bg-gray-200 dark:hover:bg-gray-700">
                  Profile
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className=" hover:bg-gray-200 dark:hover:bg-gray-700">
                  Settings
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center"></div>
        </div>
      </div>

      <div className={blurEffectClass}></div>

      <ProfileSidebarModel
        active={profileSideBar}
        setActive={setProfileSidebar}
      />
    </div>
  );
};

export default Home;
