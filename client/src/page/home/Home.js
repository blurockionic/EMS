import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../../component/utilities-components/Header";
import { Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import ProfileSidebarModel from "../../component/sidebar-components/ProfileSidebarModel";
import ThemeToggle from "../../component/theme-components/ThemeToggle";
import SideNavbar from "../../component/sidebar-components/ToolsSideNavbar";

const Home = () => {
  const [active, setActive] = useState(false);
  const [profileSideBar, setProfileSidebar] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 transition-transform duration-500 ${
    active ? "translate-x-0 w-[16rem]" : "-translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 top-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "w-full h-full fixed" : "hidden"
  }`;

  return (
    <div className="flex flex-col h-screen w-full relative overflow-hidden">
      <nav className="w-full p-3 flex flex-row justify-between border border-slate-900 py-3">
        <div className="flex font-bold mx-2 space-x-4">
          <GiHamburgerMenu
          
            className="text-3xl cursor-pointer"
            onClick={() => setActive(true)}
          />
          <span className="text-lg">
            <span className="capitalize">{profile?.firstName} </span>
            <span className="capitalize">{profile?.lastName}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <button onClick={() => setProfileSidebar(true)}>
            {profile?.profilePicture ? (
              <div className="flex justify-center">
                <img
                  src={profile?.profilePicture}
                  alt={`${profile?.firstName}'s profile`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            ) : (
              <CgProfile className="text-2xl" />
            )}
          </button>
        </div>
      </nav>
      <Header />
      <div className="flex-grow relative overflow-auto">
        <Outlet />
      </div>
      <SideNavbar sidebarClass={sidebarClass} setActive={setActive} />

      <div className={blurEffectClass} onClick={() => setActive(false)}></div>

      <ProfileSidebarModel
        active={profileSideBar}
        setActive={setProfileSidebar}
      />
    </div>
  );
};

export default Home;
