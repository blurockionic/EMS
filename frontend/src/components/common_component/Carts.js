import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { SlNote } from "react-icons/sl";
import { TbFileReport } from "react-icons/tb";

const Carts = () => {
  return (
    <div>
      <div className="flex flex-row justify-evenly">
        {/* Single div for a cart 1st   */}
        <div className="flex flex-col mt-4 ml- bg-slate-700  h-36 w-52">
          {/* {Menus.map((menu, index) => ( ))} */}
          <div className="flex justify-center text-lg mt-4"> Emplooyees</div>

          <div className="flex justify-center text-3xl mt-3">
            <IoPeopleSharp />
          </div>
          <div className="flex justify-center text-lg mt-2">4654</div>
        </div>
        {/* 2nd cart  */}
        <div className="flex flex-col mt-4 ml-4 bg-[#9f1239] h-36 w-52">
          {/* {Menus.map((menu, index) => ( ))} */}
          <div className="flex justify-center text-lg mt-4"> Projects</div>

          <div className="flex justify-center text-3xl mt-3">
            <GoProjectRoadmap />
          </div>
          <div className="flex justify-center text-lg mt-2">462</div>
        </div>
        {/* 3rd card div */}
        <div className="flex flex-col mt-4 ml-4 bg-[#0ea5e9]  h-36 w-52">
          {/* {Menus.map((menu, index) => ( ))} */}
          <div className="flex justify-center text-lg mt-4">
            Ongoing Projects
          </div>

          <div className="flex justify-center text-3xl mt-3">
            <SlNote />
          </div>
          <div className="flex justify-center text-lg mt-2">6254</div>
        </div>
        {/* 4th card div  */}
        <div className="flex flex-col mt-4 ml-4 bg-[#e11d48]  h-36 w-52">
          <div className="flex justify-center text-lg mt-4">
            Compeleted Project
          </div>

          <div className="flex justify-center text-3xl mt-3">
            <TbFileReport />
          </div>
          <div className="flex justify-center text-lg mt-2">750</div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
