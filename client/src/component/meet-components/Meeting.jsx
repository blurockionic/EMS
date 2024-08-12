// File: src/components/Meeting.js
import React, { useEffect, useState } from "react";
import { IoSearchSharp, IoCalendar } from "react-icons/io5";
import { SiGotomeeting } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";
import { FaBorderAll, FaTable } from "react-icons/fa";
import { MdOutlineViewTimeline } from "react-icons/md";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import BigCalendarComponent from "../utilities-components/calendar/BigCalendar";
import TimelineComponent from "../TimelineComponent";
import { BsThreeDots } from "react-icons/bs";
import NewMeeting from "./NewMeeting";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeetings } from "../../Redux/slices/meetingSlice";
import TimeAgo from "../utilities-components/TimeAgo";
import { GoDotFill } from "react-icons/go";
import MeetingViewMode from "./MeetingViewMode.jsx";
import { MdMoreTime } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import CompleteMeeting from "./CompleteMeeting.jsx";

const Meeting = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Meetings");
  const [tabs, setTabs] = useState(["Meetings", "Calendar", "All"]);
  const [showMoreTabs, setShowMoreTabs] = useState(false);
  const [searchInputBox, setSearchInputBox] = useState(false);
  const [active, setActive] = useState(false);
  const meetings = useSelector((state) => state.meetings.data);
  const [singleMeetingData, setSingleMeetingData] = useState({});
  const createNewMessageResponse = useSelector(
    (state) => state.meetings.newMeetingRes
  );

  if (createNewMessageResponse.success === true) {
    // checking if the success of api is true or false
    toast.success(createNewMessageResponse.message); // show message coming form backend after creating new meeting
    dispatch(fetchMeetings());
  } else {
    toast.error(createNewMessageResponse.message); // toast for the show the error of creating new meeting
  }

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

  useEffect(() => {
    dispatch(fetchMeetings);
  }, [dispatch]);

  const [currentMeeting, setCurrentMeeting] = useState(null);
  const handleNewClick = () => {
    setCurrentMeeting(null); // Reset meeting data for new meeting
    setActive(true); // Open the NewMeeting component
  };

  const handleMeetingRowClick = (meetingId) => {
    // Fetch or find the meeting data by meetingId
    const meeting = meetings.find((meet) => meet._id === meetingId);

    if (meeting) {
      setCurrentMeeting(meeting); // Set meeting data for update
      setActive(true); // Open the NewMeeting component
    } else {
      console.error("Meeting not found");
    }
  };

  return (
    <div className="w-[90%] mx-auto mt-2">
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

          <div className="flex items-center" onClick={handleNewClick}>
            <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
              <IoMdAdd className="text-lg mr-1" />
              <span>New</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-4">
        {activeTab === "Meetings" && (
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 dark:bg-gray-800 w-full flex justify-between">
                  <th className="px-4 py-2 ">
                    <div className="flex items-center justify-start hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 group">
                      <span className="font-semibold">Meeting Title</span>
                    </div>
                  </th>
                  <th className="px-4 py-2 text-end">
                    <div className="flex items-center justify-start hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 group">
                      <MdMoreTime className="text-xl mr-2" />
                      <span className="font-semibold">Event Time</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {meetings && meetings.length > 0 ? (
                  meetings.map((meeting, index) => (
                    <tr
                      key={index}
                      className="border-b dark:border-gray-600 w-full flex justify-between hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <td className="px-4 py-4">
                        <div className="flex flex-col">
                          <span
                            className="font-bold text-xl hover:text-blue-700 dark:hover:text-blue-500 capitalize"
                            onClick={() => handleMeetingRowClick(meeting._id)}
                          >
                            {meeting.title}
                          </span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {meeting.description}
                          </p>
                          <div className="mt-2 md:mt-0 flex flex-col md:flex-row">
                            <span className="text-gray-500 dark:text-gray-400">
                              Created by
                            </span>
                            <span className="font-semibold mx-2">
                              {meeting.createdBy.firstName}{" "}
                              {meeting.createdBy.lastName}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 ">
                        <span className="font-semibold inline-block bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 px-2 py-1 rounded-md">
                          {new Date(meeting.eventTime).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="w-full">
                    <td
                      colSpan="2"
                      className="px-4 py-4 text-center text-gray-600 dark:text-gray-400"
                    >
                      No meetings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "Calendar" && (
          <div>
            <BigCalendarComponent meetings={meetings} />
          </div>
        )}
        {activeTab === "All" && <div>All content goes here...</div>}
        {activeTab === "Table View" && (
          <div>
            {" "}
            <MeetingViewMode meetings={meetings} viewMode={activeTab} />{" "}
          </div>
        )}
        {activeTab === "Timeline" && <TimelineComponent />}
        {activeTab === "Gallery" && (
          <div>
            {" "}
            <MeetingViewMode meetings={meetings} viewMode={activeTab} />{" "}
          </div>
        )}
      </div>
      <div>
        <NewMeeting
          active={active}
          setActive={setActive}
          currentMeeting={currentMeeting}
          mode={currentMeeting ? "update" : "create"}
        />
      </div>
      <div>
        <CompleteMeeting
          active={active}
          setActive={setActive}
          meetingData={currentMeeting}
        />
      </div>
    </div>
  );
};

export default Meeting;
