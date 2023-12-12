import React from "react";
import { Link } from "react-router-dom";

import { MdOutlineDashboard } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { SlNote } from "react-icons/sl";
import { TbFileReport } from "react-icons/tb";
import LoginPage from "../login/LoginPage";
import Admin_Dashboard from "../admindashboard/Admin_Dashboard";
import Admin_Employees from "../admindashboard/Admin_Employees";

export const Nav_Sidebar = (props) => {
  // data comes from app.js and we use it using props
  let isloggedIn = props.isloggedIn;
  let setLoggedIn = props.setLoggedIn;

  //   list of items that is use in the sidebar with thair logos
  const Menus = [
    { title: "Dashboard" },
    { title: "Employees", icon: <IoPeopleSharp /> },
    { title: "New Projects", icon: <GoProjectRoadmap /> },
    { title: "Projects", icon: <SlNote /> },
    { title: "Reports", icon: <TbFileReport /> },
  ];

  return (
    <div className="flex ">
      <div className=" flex flex-col w-[20rem] h-[100vh] bg-slate-900">
        <Link to="/" className="w-[160] h-[32] loading = lazy">
          Logo
        </Link>
        <div className="mx-auto w-[8rem] h-[8rem] rounded-full mt-[2.5rem] bg-white"></div>
        <div className="w-[70%]  mt-10 mx-auto h-1 bg-white"></div>
        <nav className="w-full mt-8 text-center">
          <ul className="gap-y-8">
            <li className=" flex flex-row mt-3 cursor-pointer hover:bg-slate-500">
              <div className=" flex flex-row relative">
                <MdOutlineDashboard className="ml-[2rem] absolute  mt-1 text-3xl text-white" />

                <span className="w-[20rem] h-[2.5rem]  text-white pt-1 text-bold text-xl">
                  <Link to="./Home">
                    <button path="Home_page">Dashboard</button>
                  </Link>
                </span>
              </div>
            </li>

            <li className=" flex flex-row mt-3 ">
              <div className="flex flex-row  relative  ">
                <IoPeopleSharp className="ml-[2rem] absolute text-3xl mt-1 text-white" />

                <span className="w-[20rem] h-[2.5rem]  text-white pt-1 text-bold text-xl">
                  <Link to="./Employees">
                    <button path="Employee">Employees</button>
                  </Link>
                </span>
              </div>
            </li>

            <li className=" flex flex-rwo mt-3 ">
              <div className="flex flex-row  relative  ">
                <GoProjectRoadmap className="ml-[2rem] absolute text-3xl mt-1 text-white" />

                <span className="w-[20rem] h-[2.5rem]  text-white pt-1 text-bold text-xl">
                  <Link to="./New_projects">
                    <button path="New_project">New Project</button>
                  </Link>
                </span>
              </div>
            </li>

            <li className=" flex flex-row mt-3  ">
              <div className="flex relative  ">
                <SlNote className=" ml-[2rem] absolute text-3xl mt-1 text-white" />

                <span className="w-[20rem] h-[2.5rem]  text-white pt-1 text-bold text-xl">
                  <Link to="./Projects">
                    <button path="Projects">Projects </button>
                  </Link>
                </span>
              </div>
            </li>

            <li className=" flex flex-row mt-3 ">
              <div className="flex flex-row relative  ">
                <TbFileReport className=" ml-[2rem] absolute text-3xl mt-1 text-white" />

                <span className="w-[20rem] h-[2.5rem]  text-white pt-1 text-bold text-xl">
                  <Link to="./Reports">
                    <button path="Employee">Reports</button>
                  </Link>
                </span>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* <div className="flex h-16 flex-col w-full">
        <div className="h-20 bg-slate-300">
          {isloggedIn && (
            <button
              onClick={() => {
                //   setloggedIn(false);
              }}
            >
              <Link to="/">logout</Link>
            </button>
          )}
        </div>
        {/* DASHBOARD DESIGN  
        <div>
          <Admin_Employees />
        </div>
      </div> */}
    </div>
  );
};
