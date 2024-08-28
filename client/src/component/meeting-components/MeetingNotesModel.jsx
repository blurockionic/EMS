import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsThreeDots,
} from "react-icons/bs";
import { GoIssueOpened } from "react-icons/go";
import { IoIosCheckboxOutline } from "react-icons/io";
import TimeAgo from "../utilities-components/TimeAgo";

const MeetingNotesModel = ({ active, setActive, meeting }) => {
  const [modelSize, setModelSize] = useState("small"); // State for modal size (small or large)
  const [activeTab, setActiveTab] = useState("notes"); // State to track active tab

  const toggleModelSize = () => {
    // Toggle modal size between small and large
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 ${
    active
      ? modelSize === "large"
        ? "translate-x-0 w-full"
        : "translate-x-0 w-[40rem]"
      : "translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;
  console.log(meeting);

  return (
    <div>
      <div className={sidebarClass}>
        <div className="mx-auto w-[90%]">
          {/* Modal Header */}
          <div className="w-full flex justify-between py-2">
            <div className="flex space-x-1">
              <button
                className="p-1 hover:text-red-600 hover:bg-slate-200 rounded-lg"
                onClick={() => setActive(false)}
              >
                <AiOutlineClose className="text-xl" />
              </button>
              <button
                className="p-1 hover:bg-slate-200 rounded-lg"
                onClick={toggleModelSize}
              >
                {modelSize === "large" ? (
                  <BsArrowsAngleContract className="text-xl" />
                ) : (
                  <BsArrowsAngleExpand className="text-xl" />
                )}
              </button>
            </div>
            <div>
              <button className="p-1 hover:bg-slate-200 rounded-lg">
                <BsThreeDots className="text-xl" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-gray-200 dark:border-gray-700 mb-4">
            <nav className="flex space-x-4">
              <button
                className={`py-2 px-4 font-semibold ${
                  activeTab === "notes"
                    ? "border-b-2 border-green-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("notes")}
              >
                Meeting Notes
              </button>
              <button
                className={`py-2 px-4 font-semibold ${
                  activeTab === "history"
                    ? "border-b-2 border-green-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {meeting ? (
              <div>
                {activeTab === "notes" && (
                  <div>
                    <div className="flex space-x-2">
                      <div className="flex items-center space-x-2 py-1 px-2 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm">
                        {meeting?.status === "Close" && (
                          <>
                            <GoIssueOpened className="text-xl text-purple-700" />
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              {meeting?.status}
                            </span>
                          </>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold capitalize">
                        {meeting?.title}
                      </h2>
                    </div>
                    <div className="mt-4">
                      {/* Header Section */}
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center space-x-2">
                          <IoIosCheckboxOutline className="text-blue-500" />
                          <span>Meeting Notes</span>
                        </h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Last updated:{" "}
                          <span className="font-semibold">
                            <TimeAgo date={meeting?.updatedAt} />
                          </span>
                        </span>
                      </div>

                      {/* Notes Section */}
                      <ul className="list-disc list-inside">
                        {meeting?.notes.length > 0 ? (
                          meeting.notes.map((note, index) => (
                            <li
                              key={index}
                              className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-2 shadow-sm"
                            >
                              {note.content}
                            </li>
                          ))
                        ) : (
                          <li className="py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-md mb-2 shadow-sm text-gray-500">
                            No notes available.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "history" && (
                  <div>
                    {/* Status Section */}
                    <div className="flex justify-between">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">Status</h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {meeting?.status}
                        </p>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">Event</h3>
                        <span className="font-semibold">
                          {new Date(meeting?.eventTime).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    {/* time related Section */}
                    <h3 className="text-lg font-semibold">
                      Creation of Meeting{" "}
                    </h3>
                    <div className="flex justify-between">
                      <div className="mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          Created by
                        </span>
                        <span className="font-semibold mx-2">
                          {meeting.createdBy.firstName}{" "}
                          {meeting.createdBy.lastName}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          Creation time
                        </span>
                        <span className="font-semibold mx-2">
                          {new Date(meeting?.createTime).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">
                      Updation of Meeting{" "}
                    </h3>
                    <div className="flex justify-between">
                      <div className="mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          Updated by
                        </span>
                        <span className="font-semibold mx-2">
                          {meeting.lastEditBy.firstName}{" "}
                          {meeting.lastEditBy.lastName}
                        </span>
                      </div>
                      <div className="mb-4">
                        <span className="text-gray-500 dark:text-gray-400">
                          Updation time
                        </span>
                        <span className="font-semibold mx-2">
                          {new Date(meeting?.updatedAt).toLocaleString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Attendees Section */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Attendees</h3>
                      <ul className="list-disc list-inside">
                        {meeting?.attendees.length > 0 ? (
                          meeting?.attendees.map((attendee, index) => (
                            <li key={index}>
                              {attendee.firstName} {attendee.lastName}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">
                            No attendees listed.
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Actual Attendees Section */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">
                        Actual Attendees
                      </h3>
                      <ul className="list-disc list-inside">
                        {meeting?.actualAttendees.length > 0 ? (
                          meeting?.actualAttendees?.map((attendeeId, index) => (
                            <li key={index}>
                              Attendee ID: {attendeeId}
                              {/* You can enhance this by fetching user details based on attendeeId */}
                            </li>
                          ))
                        ) : (
                          <li className="text-gray-500">
                            No actual attendees listed.
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* this meeting agenda */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">Meeting Agenda</h3>
                      <p>
                        {meeting?.agenda ??
                          "no meenting agenda mention for this meet "}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>No meeting notes details available.</div>
            )}
          </div>
        </div>
      </div>

      <div className={blurEffectClass} onClick={() => setActive(false)}></div>
    </div>
  );
};

export default MeetingNotesModel;
