import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SiGotomeeting } from "react-icons/si";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineSaveAs } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import { GoInbox, GoVersions } from "react-icons/go";
import { LuListTodo } from "react-icons/lu";
const SideNavbar = ({ sidebarClass, setActive }) => {
  const linkClasses = `flex items-center mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg dark:hover:bg-gray-700`;

  return (
    <div className={sidebarClass}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center w-full cursor-pointer">
          <div className="w-full flex justify-between px-3 items-center py-2">
            <span className="text-lg font-sans font-extrabold">
              BluRock Ionic
            </span>
            <button
              className="self-end p-2 m-2 hover:text-red-600"
              onClick={() => setActive(false)}
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="w-full cursor-pointer">
            <ul className="w-full">
              <li className="mb-2 w-full">
                <Link to={"./commingSoon"} className={linkClasses}>
                  <GrHomeRounded className="text-lg mr-3" />
                  <span className="font-semibold">Home</span>
                </Link>
              </li>
              <li className="mb-2 w-full">
                <Link to={"./commingSoon"} className={linkClasses}>
                  <GoInbox className="text-lg mr-3" />
                  <span className="font-semibold">Inbox</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full cursor-pointer">
            <ul className="w-full mt-2">
              <div className="flex flex-row justify-between mx-2 px-4 py-1">
                <span className="font-semibold">Tools</span>
                <span className="font-semibold">
                  <BsThreeDots />
                </span>
              </div>
              <li className="mb-2 w-full">
                <Link to={"./commingSoon"} className={linkClasses}>
                  <HiOutlineSaveAs className="text-lg mr-3" />
                  <span className="font-semibold">Notes</span>
                </Link>
              </li>
              <li className="mb-2 w-full">
                <Link to={"./myTodo"} className={linkClasses}>
                  <LuListTodo className="text-lg mr-3" />
                  <span className="font-semibold">To do</span>
                </Link>
              </li>
              <li className="mb-2 w-full">
                <Link to={"./commingSoon"} className={linkClasses}>
                  <IoCalendarNumberOutline className="mr-3" />
                  <span className="font-semibold">Calendar</span>
                </Link>
              </li>
              <li className="mb-2 w-full">
                <Link to={"./meeting"} className={linkClasses}>
                  <SiGotomeeting className="mr-3" />
                  <span className="font-semibold">Meetings</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="w-full">
              <li className="mb-2 w-full">
                <Link to="./commingSoon" className={linkClasses}>
                  <FaRegQuestionCircle className="mr-3" />
                  <span className="font-semibold">Help & support</span>
                </Link>
              </li>
              <li className="mb-2 w-full">
                <Link to="./AppVersion" className={linkClasses}>
                  <GoVersions className="mr-3" />
                  <span className="font-semibold">Latest version V1.01.08</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
