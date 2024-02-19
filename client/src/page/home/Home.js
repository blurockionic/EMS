import React from "react";

import Header from "../../component/utilities-components/Header";
import SideNavbar from "../../component/admin/admin-sidenavbar/SideNavbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  // console.log(completedProjects.length)

  return (
    <>
      {/* header  */}
      {/* <div className="fixed w-full">
        <Header />
      </div> */}
      {/* header end  */}

      {/* main content  */}
      <div className="grid grid-cols-12 overflow-x-hidden">
        {/* SideNavbar  */}
        <div className="col-span-2 fixed ">
          <SideNavbar />
        </div>
        {/* SideNavbar end */}

        {/* outlet  */}
        <div className="col-span-10  w-full  px-10 py-4 ml-64  overflow-y-auto h-screen ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
