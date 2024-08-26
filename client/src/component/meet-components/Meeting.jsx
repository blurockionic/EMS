// Import necessary libraries and components
import React, { useState, useCallback, useMemo } from "react";
import { IoSearchSharp, IoCalendar } from "react-icons/io5";
import { SiGotomeeting } from "react-icons/si";
import { IoMdAdd } from "react-icons/io";
import { FaBorderAll, FaTable } from "react-icons/fa";
import { MdOutlineViewTimeline, MdOutlineAttractions, MdMoreTime } from "react-icons/md";
import { LuGalleryHorizontalEnd } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { PiDotsThreeBold } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { MdFileDownloadDone } from "react-icons/md";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

// Import utility and component modules
import BigCalendarComponent from "../utilities-components/calendar/BigCalendar";
import TimelineComponent from "../TimelineComponent";
import NewMeeting from "./NewMeeting";
import UpdateExistingMeeting from "./UpdateExistingMeeting.jsx";
import CompleteMeeting from "./CompleteMeeting.jsx";
import MeetingViewMode from "./MeetingViewMode.jsx";

// Main component definition
const Meeting = () => {
  // Consolidate related state variables into a single state object for better manageability
  const [uiState, setUiState] = useState({
    activeTab: "Meetings", // Initial tab displayed
    tabs: ["Meetings", "Calendar", "All"], // Default tabs
    showMoreTabs: false, // Boolean to control visibility of more tabs
    searchInputBox: false, // Boolean to toggle search input visibility
    action: null, // Tracks the current action type (e.g., edit or complete)
    currentMeeting: null, // Holds the currently selected meeting object
    activeRowId: null, // ID of the currently active row
    editableMeetingId: null, // ID of the meeting being edited
  });

  // Separate state for modals to control visibility of different modals
  const [modals, setModals] = useState({
    activeNewMeeting: false, // Boolean to control New Meeting modal visibility
    activeUpdateMeeting: false, // Boolean to control Update Meeting modal visibility
    activeCompleteMeeting: false, // Boolean to control Complete Meeting modal visibility
  });

  // Use Redux selector to fetch meetings from the state
  const meetings = useSelector((state) => state.meetings.data);

  // Memoized function to add a new tab and update state accordingly
  const addTab = useCallback(
    (tab) => {
      // Only add the tab if it's not already present
      if (!uiState.tabs.includes(tab)) {
        setUiState((prevState) => ({
          ...prevState,
          tabs: [...prevState.tabs, tab], // Add new tab
          activeTab: tab, // Set the new tab as active
          showMoreTabs: false, // Hide the 'more' tabs indicator
        }));
      }
    },
    [uiState.tabs] // Dependency array: update if tabs change
  );

  // Memoized function to get the icon associated with each tab
  const getTabIcon = useCallback((tab) => {
    const icons = {
      Meetings: <SiGotomeeting className="mr-2" />,
      Calendar: <IoCalendar className="mr-2" />,
      All: <FaBorderAll className="mr-2" />,
      "Table View": <FaTable className="mr-2" />,
      Timeline: <MdOutlineViewTimeline className="mr-2" />,
      Gallery: <LuGalleryHorizontalEnd className="mr-2" />,
    };
    return icons[tab] || null; // Return the corresponding icon or null if not found
  }, []);

  // Toggle the visibility of the search input box
  const handleSearchButton = () => {
    setUiState((prevState) => ({
      ...prevState,
      searchInputBox: !prevState.searchInputBox, // Toggle state
    }));
  };

  // Show the modal for creating a new meeting
  const handleNewClick = () => {
    setModals({ ...modals, activeNewMeeting: true });
  };

  // Handle the click event on a meeting row to set current meeting details
  const handleMeetingRowClick = (meetingId) => {
    const meeting = meetings.find((meet) => meet._id === meetingId); // Find the meeting by ID
    if (meeting) {
      setUiState((prevState) => ({
        ...prevState,
        currentMeeting: meeting, // Set current meeting details
        activeRowId: meetingId, // Set active row ID
      }));
    } else {
      console.error("Meeting not found"); // Error handling if meeting not found
    }
  };

  // Handle actions for updating or completing a meeting
  const meetingActionButtonHandler = (actionType, meetId) => {
    setUiState((prevState) => ({
      ...prevState,
      action: actionType, // Set action type
      activeRowId: null, // Clear active row ID
      editableMeetingId: meetId, // Set editable meeting ID
    }));

    setModals((prevModals) => ({
      ...prevModals,
      activeUpdateMeeting: actionType === "edit", // Show update modal if action is edit
      activeCompleteMeeting: actionType === "complete", // Show complete modal if action is complete
    }));
  };

  // Memoized list of tabs to optimize rendering
  const tabsList = useMemo(
    () =>
      uiState.tabs.map((tab) => (
        <div
          key={tab}
          className={`flex items-center cursor-pointer px-2 py-2 ${
            uiState.activeTab === tab
              ? "border-b-2 border-green-500 font-bold" // Style for active tab
              : "font-semibold bg-transparent" // Style for inactive tab
          }`}
          onClick={() =>
            setUiState((prevState) => ({ ...prevState, activeTab: tab })) // Update active tab on click
          }
        >
          {getTabIcon(tab)} {tab}
        </div>
      )),
    [uiState.tabs, uiState.activeTab, getTabIcon] // Dependencies: tabs, activeTab, getTabIcon
  );

  return (
    <div className="w-[90%] mx-auto mt-2">
      <h1 className="text-4xl font-bold p-2">Meeting</h1>

      <nav className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="flex w-full sm:w-auto h-full items-end space-x-3 overflow-x-auto sm:overflow-x-hidden">
            {tabsList}
          </div>
          <div className="relative flex items-center">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUiState((prevState) => ({
                  ...prevState,
                  showMoreTabs: !prevState.showMoreTabs,
                }))
              }
            >
              <IoMdAdd className="text-xl mx-2" />
            </div>
            {uiState.showMoreTabs && (
              <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 p-1">
                <ul>
                  {["Table View", "Timeline", "Gallery"].map((tab) => (
                    <li
                      key={tab}
                      className="flex flex-row cursor-pointer mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                      onClick={() => addTab(tab)}
                    >
                      {getTabIcon(tab)}
                      {tab}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 space-x-2">
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
              uiState.searchInputBox
                ? "bg-gray-200 dark:bg-slate-400"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span className="p-0.5">
              <BsThreeDots className="text-xl" />
            </span>
          </div>
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
              uiState.searchInputBox
                ? "hover:bg-gray-300 dark:hover:bg-gray-700"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={handleSearchButton}
          >
            <span className="p-0.5">
              <IoSearchSharp className="text-xl" />
            </span>
          </div>
          {uiState.searchInputBox && (
            <input
              type="search"
              placeholder="Type to search......"
              className="bg-transparent p-1 outline-none"
            />
          )}
          <div className="flex items-center" onClick={handleNewClick}>
            <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
              <IoMdAdd className="text-lg mr-1" />
              <span>New</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="mt-4">
        {uiState.activeTab === "Meetings" && (
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 dark:bg-gray-800 w-full flex justify-between">
                  <th className="px-4 py-2 w-[50%]">
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
                  <th className="px-4 py-2 text-end">
                    <div className="flex items-center justify-start hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md px-2 py-1 group">
                      <MdOutlineAttractions className="text-xl mr-2" />
                      <span className="font-semibold">Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {meetings && meetings.length > 0 ? (
                  meetings.map((meeting) => (
                    <tr
                      key={meeting._id}
                      className="border-b dark:border-gray-600 w-full flex justify-between hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <td className="px-4 py-4 w-[50%]">
                        <div className="flex flex-col">
                          <span className="font-bold text-xl hover:text-blue-700 dark:hover:text-blue-500 capitalize cursor-pointer">
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
                      <td className="px-4 py-4">
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
                      <td className="px-4 py-4 relative">
                        <span
                          onClick={() => handleMeetingRowClick(meeting._id)}
                        >
                          <PiDotsThreeBold className="text-3xl" />
                        </span>
                        {uiState.activeRowId === meeting._id && (
                          <ul className="absolute top-0 z-20 right-0 w-[10rem] h-auto bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 context-menu space-y-2">
                            <li className="flex justify-end mb-2">
                              <button
                                onClick={() =>
                                  setUiState((prevState) => ({
                                    ...prevState,
                                    activeRowId: null,
                                  }))
                                }
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                              >
                                <RiCloseLine className="text-xl" />
                              </button>
                            </li>
                            <li
                              className="block px-4 py-2 text-left w-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                              onClick={() =>
                                meetingActionButtonHandler("edit", meeting._id)
                              }
                            >
                              <div className="flex space-x-2">
                                <FiEdit className="mt-1 text-gray-800 dark:text-gray-200" />
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                  Edit
                                </span>
                              </div>
                            </li>
                            <li
                              className="block px-4 py-2 text-left w-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                              onClick={() =>
                                meetingActionButtonHandler("complete",meeting._id )
                              }
                            >
                              <div className="flex space-x-2">
                                <MdFileDownloadDone className="mt-1 text-gray-800 dark:text-gray-200" />
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                  Complete
                                </span>
                              </div>
                            </li>
                            <li className="block px-4 py-2 text-left w-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                              <div className="flex space-x-2">
                                <RiDeleteBin6Line className="mt-1 text-gray-800 dark:text-gray-200" />
                                <span className="font-semibold text-gray-800 dark:text-gray-200">
                                  Delete
                                </span>
                              </div>
                            </li>
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="w-full">
                    <td
                      colSpan="3"
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
        {uiState.activeTab === "Calendar" && (
          <BigCalendarComponent meetings={meetings} />
        )}
        {uiState.activeTab === "All" && <div>All content goes here...</div>}
        {uiState.activeTab === "Table View" && (
          <MeetingViewMode meetings={meetings} viewMode={uiState.activeTab} />
        )}
        {uiState.activeTab === "Timeline" && <TimelineComponent />}
        {uiState.activeTab === "Gallery" && (
          <MeetingViewMode meetings={meetings} viewMode={uiState.activeTab} />
        )}
      </div>

      <NewMeeting
        active={modals.activeNewMeeting}
        setActive={(isActive) =>
          setModals((prevState) => ({
            ...prevState,
            activeNewMeeting: isActive,
          }))
        }
      />

      {uiState.action === "edit" && (
        <UpdateExistingMeeting
          active={modals.activeUpdateMeeting}
          setActive={(isActive) =>
            setModals((prevState) => ({
              ...prevState,
              activeUpdateMeeting: isActive,
            }))
          }
          meetingId={uiState.editableMeetingId}
        />
      )}
      {uiState.action === "complete" && (
        <CompleteMeeting
          active={modals.activeCompleteMeeting}
          setActive={(isActive) =>
            setModals((prevState) => ({
              ...prevState,
              activeCompleteMeeting: isActive,
            }))
          }
          meetingData={uiState.currentMeeting}
        />
      )}
    </div>
  );
};

export default Meeting;
