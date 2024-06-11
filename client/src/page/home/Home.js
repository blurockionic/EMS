import React, { useState } from "react";

import Header from "../../component/utilities-components/Header";
import SideNavbar from "../../component/admin/admin-sidenavbar/SideNavbar";
import { Outlet } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Home = () => {
  const [active, setActive] = useState(false);

  

  return (
    <>
      {/* outlet  */}
      <div className="flex flex-col h-full w-full fixed">
      <nav className="w-full p-3 flex flex-row justify-between bg-gray-100 border py-3">
                <GiHamburgerMenu onClick={() => setActive(true)} />

            </nav>
            {active && (
                <div className="absolute top-0 left-0 h-full w-full bg-gray-200">
                    <div className="absolute top-0 left-0 w-64 h-full bg-white">
                        <SideNavbar setActive={setActive} />
                    </div>
                </div>
            )}
        <div className="flex-grow relative overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
