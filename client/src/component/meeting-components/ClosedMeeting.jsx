import React, { useEffect, useState } from "react";
import { MdMoreTime, MdOutlineAttractions } from "react-icons/md";
import MeetingNotesModel from "./MeetingNotesModel";

const ClosedMeeting = ({ meetings }) => {


  const [closedMeetings, setClosedMeetings] = useState([]);
  const [showMeetingNotesModel, setShowMeetingNotesModel] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  useEffect(() => {
    setClosedMeetings(meetings.filter((meeting) => meeting.status === "Close"));
  }, [meetings]);

  // Handle the click event on a meeting row to set current meeting details
  const handleMeetingRowClick = (meetingId) => {
    const meeting = meetings.find((meet) => meet._id === meetingId); // Find the meeting by ID
    if (meeting) {
   
      setShowMeetingNotesModel(true);
      setSelectedMeeting(meeting);
    } else {
      console.error("Meeting not found"); // Error handling if meeting not found
    }
  };

  return (
    <div>
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
            </tr>
          </thead>
          <tbody>
            {closedMeetings && closedMeetings.length > 0 ? (
              closedMeetings.map((meeting) => (
                <tr
                  key={meeting._id}
                  onClick={() => handleMeetingRowClick(meeting._id)}
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
                      <div className="flex">
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
                  <td className="px-4 py-4 relative"></td>
                </tr>
              ))
            ) : (
              <tr className="w-full">
                <td
                  colSpan="3"
                  className="px-4 py-4 text-center text-gray-600 dark:text-gray-400"
                >
                  No closed meetings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showMeetingNotesModel && (
        <MeetingNotesModel
          active={showMeetingNotesModel}
          setActive={setShowMeetingNotesModel}
          meeting ={selectedMeeting}
        />
      )}
    </div>
  );
};

export default ClosedMeeting;
