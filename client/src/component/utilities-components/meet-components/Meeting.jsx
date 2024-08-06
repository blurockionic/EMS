// File: src/components/Meeting.js
import React, { useState } from "react";
import { IoSearchSharp, IoCalendar } from "react-icons/io5";
import { SiGotomeeting } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";
import { FaBorderAll, FaTable } from "react-icons/fa";
import { MdOutlineViewTimeline } from "react-icons/md";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import BigCalendarComponent from "../calendar/BigCalendar";
import TimelineComponent from "../../TimelineComponent";
import { BsThreeDots } from "react-icons/bs";
import NewMeeting from "./NewMeeting";

const Meeting = () => {
  const [activeTab, setActiveTab] = useState("Meetings");
  const [tabs, setTabs] = useState(["Meetings", "Calendar", "All"]);
  const [showMoreTabs, setShowMoreTabs] = useState(false);
  const [searchInputBox, setSearchInputBox] = useState(false);
  const [active, setActive] = useState(false);
  const addTab = (tab) => {
    if (!tabs.includes(tab)) {
      setTabs([...tabs, tab]);
    }
    setActiveTab(tab);
    setShowMoreTabs(false);
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "Meetings":
        return <SiGotomeeting className="mr-2" />;
      case "Calendar":
        return <IoCalendar className="mr-2" />;
      case "All":
        return <FaBorderAll className="mr-2" />;
      case "Table View":
        return <FaTable className="mr-2" />;
      case "Timeline":
        return <MdOutlineViewTimeline className="mr-2" />;
      case "Gallery":
        return <LuGalleryHorizontalEnd className="mr-2" />;
      default:
        return null;
    }
  };

  const handleSearchButton = () => {
    setSearchInputBox(true);
  };
  return (
    <div className="w-[80%] mx-auto mt-2">
      <h1 className="text-4xl font-bold p-2">Meeting</h1>

      <nav className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="flex w-full sm:w-auto h-full items-end space-x-3 overflow-x-auto sm:overflow-x-hidden">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`flex items-center cursor-pointer px-2 py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-green-500 font-bold"
                    : "font-semibold bg-transparent"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {getTabIcon(tab)}
                {tab}
              </div>
            ))}
          </div>
          <div className="relative flex items-center">
            <div
              className="cursor-pointer"
              onClick={() => setShowMoreTabs(!showMoreTabs)}
            >
              <IoMdAdd className="text-xl mx-2" />
            </div>
            {showMoreTabs && (
              <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 p-1">
                <ul>
                  <li
                    className=" flex flex-row cursor-pointer mx-2  px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                    onClick={() => addTab("Table View")}
                  >
                    <FaTable className="mt-1 mr-2" />
                    Table View
                  </li>
                  <li
                    className=" flex flex-row cursor-pointer mx-2  px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                    onClick={() => addTab("Timeline")}
                  >
                    <MdOutlineViewTimeline className="mr-2 mt-1" />
                    Timeline
                  </li>
                  <li
                    className=" flex flex-row cursor-pointer mx-2  px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                    onClick={() => addTab("Gallery")}
                  >
                    <LuGalleryHorizontalEnd className="mr-2 mt-1" />
                    Gallery
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 space-x-2">
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors ${
              searchInputBox
                ? "bg-gray-200 dark:bg-slate-400"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            } cursor-pointer`}
          >
            <span className={`p-0.5`}>
              <BsThreeDots className="text-xl" />
            </span>
          </div>
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors ${
              searchInputBox
                ? "hover:bg-gray-300 dark:hover:bg-gray-700"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            } cursor-pointer`}
            onClick={handleSearchButton}
          >
            <span className={`p-0.5`}>
              <IoSearchSharp className="text-xl " />
            </span>
          </div>
          <div>
            {searchInputBox && (
              <div>
                <input
                  type="search"
                  placeholder="Type to search......"
                  className="bg-transparent p-1 outline-none"
                />
              </div>
            )}
          </div>

          <div className="flex items-center" onClick={() => setActive(true)}>
            <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
              <IoMdAdd className="text-xl mr-1" />
              <span>New Task</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-4">
        {activeTab === "Meetings" && <div>Meetings content goes here...
          {/* <NewMeeting active={active} setActive={setActive} meetingData={existingMeeting} /> */}

          </div>}
        {activeTab === "Calendar" && (
          <div>
            <BigCalendarComponent />
          </div>
        )}
        {activeTab === "All" && <div>All content goes here...</div>}
        {activeTab === "Table View" && (
          <div>Table View content goes here...</div>
        )}
        {activeTab === "Timeline" && <TimelineComponent />}
        {activeTab === "Gallery" && <div>Gallery content goes here...</div>}
      </div>
      <div>
        <NewMeeting active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default Meeting;
