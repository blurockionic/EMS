// src/components/ToolSideNavbar.js

import React from "react";
import { AiOutlineClose } from "react-icons/ai"; // Icon for closing the sidebar
import { SiGotomeeting } from "react-icons/si"; // Icon for meetings
import { Link } from "react-router-dom"; // React Router for navigation
import { BsThreeDots } from "react-icons/bs"; // Icon for more options
import { FaRegQuestionCircle } from "react-icons/fa"; // Icon for help & support
import { IoCalendarNumberOutline } from "react-icons/io5"; // Icon for calendar
import { HiOutlineSaveAs } from "react-icons/hi"; // Icon for notes
import { GrHomeRounded } from "react-icons/gr"; // Icon for home
import { GoInbox, GoVersions } from "react-icons/go"; // Icons for inbox and version
import { LuListTodo } from "react-icons/lu"; // Icon for to-do list
import { MdOutlineEventSeat } from "react-icons/md"; // Icon for events

const ToolSideNavbar = ({ sidebarClass, setActive }) => {
  // Array to store tab data for easy management and scalability
  const tabData = [
    { to: "./commingSoon", icon: GrHomeRounded, label: "Home" },
    { to: "./commingSoon", icon: GoInbox, label: "Inbox" },
    { to: "./commingSoon", icon: MdOutlineEventSeat, label: "Events" },
    { to: "./commingSoon", icon: HiOutlineSaveAs, label: "Notes" },
    { to: "./myTodo", icon: LuListTodo, label: "To do" },
    { to: "./commingSoon", icon: IoCalendarNumberOutline, label: "Calendar" },
    { to: "./meeting", icon: SiGotomeeting, label: "Meetings" },
    { to: "./commingSoon", icon: FaRegQuestionCircle, label: "Help & support" },
    { to: "./AppVersion", icon: GoVersions, label: "Latest version V1.01.08" },
  ];

  // Common CSS classes for link items
  const linkClasses = `flex items-center mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg dark:hover:bg-gray-700`;

  return (
    <div className={sidebarClass}>
      <div className="flex flex-col justify-between h-full">
        {/* Header section with the app title and close button */}
        <div className="flex flex-col items-center w-full cursor-pointer">
          <div className="w-full flex justify-between px-3 items-center py-2">
            <span className="text-lg font-sans font-extrabold">
              BluRock Ionic
            </span>
            <button
              className="self-end p-2 m-2 hover:text-red-600"
              onClick={() => setActive(false)} // Close the sidebar on button click
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>
        </div>

        {/* Main section with navigation links */}
        <div className="flex flex-col justify-between h-full">
          {/* Dynamic list generation from tabData array */}
          <div className="w-full cursor-pointer">
            <ul className="w-full">
              {tabData.slice(0, 2).map(({ to, icon: Icon, label }, index) => (
                <li className="mb-2 w-full" key={index}>
                  <Link to={to} className={linkClasses}>
                    <Icon className="text-lg mr-3" />
                    <span className="font-semibold">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools section with additional options */}
          <div className="w-full cursor-pointer">
            <ul className="w-full mt-2">
              <div className="flex flex-row justify-between mx-2 px-4 py-1">
                <span className="font-semibold">Tools</span>
                <span className="font-semibold">
                  <BsThreeDots /> {/* Icon for additional options */}
                </span>
              </div>
              {tabData.slice(2, 7).map(({ to, icon: Icon, label }, index) => (
                <li className="mb-2 w-full" key={index}>
                  <Link to={to} className={linkClasses}>
                    <Icon className="text-lg mr-3" />
                    <span className="font-semibold">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer section with help and version information */}
          <div>
            <ul className="w-full">
              {tabData.slice(7).map(({ to, icon: Icon, label }, index) => (
                <li className="mb-2 w-full" key={index}>
                  <Link to={to} className={linkClasses}>
                    <Icon className="text-lg mr-3" />
                    <span className="font-semibold">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolSideNavbar;
