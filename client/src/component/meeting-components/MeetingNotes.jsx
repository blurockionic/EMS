import React, { useRef, useState, useMemo, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsDot,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegClock, FaRegUserCircle } from "react-icons/fa";
import { IoMdAdd, IoMdTimer, IoMdTrash } from "react-icons/io";
import {
  MdFormatListBulletedAdd,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdMoreTime,
  MdOutlineViewAgenda,
} from "react-icons/md";
import { PiUsersBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { closeMeeting, fetchMeetings } from "../../Redux/slices/meetingSlice";
import { toast, ToastContainer } from "react-toastify";
import TimeAgo from "../utilities-components/TimeAgo";
import { FaRegSquareCheck, FaUsersViewfinder } from "react-icons/fa6";
import { GoIssueClosed } from "react-icons/go";

const MeetingNotes = ({ active, setActive, meetingData }) => {
  const dispatch = useDispatch();

  // States
  const [modelSize, setModelSize] = useState("small");
  const [dropDownMenu, setDropDownMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [moreRowsShow, setMoreRowsShow] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [showMentionList, setShowMentionList] = useState(false);
  const [notes, setNotes] = useState([]);
  const [actualAttendees, setActualAttendees] = useState([]);

  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [newNoteContent, setNewNoteContent] = useState("");
  const textareaRef = useRef(null);
  const meetingId = meetingData._id;

  // Memoize profile and user data
  const profile = useSelector((state) => state.profile.data);
  const { data: users } = useSelector((state) => state.user);
  const memoizedUsers = useMemo(
    () => [{ _id: "all", firstName: "all", lastName: "" }, ...users],
    [users]
  );

  const [filteredUsers, setFilteredUsers] = useState(users);

  const toggleModelSize = () => {
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const handleSubmit = async () => {
    try {
      // Prepare the notes data with the createdBy field
      const preparedNotes = notes.map((noteContent) => ({
        content: noteContent,
        createdBy: profile._id, // Set the user ID who created the note
      }));

      // Dispatch the closeMeeting action directly with prepared data
      await dispatch(
        closeMeeting({
          meetingId,
          notes: preparedNotes,
          actualAttendees,
        })
      ).unwrap();

      // Handle success
      console.log("Meeting closed successfully");
      toast.success("Meeting closed successfully");

      // Fetch the updated meetings data
      dispatch(fetchMeetings());
    } catch (error) {
      // Handle error
      console.error("Failed to close the meeting:", error);
      toast.error("Failed to close the meeting. Please try again.");
    } finally {
      // Ensure the active state is reset
      setActive(false);
    }
  };

  // Adjusted handleMention to correctly manage currentNoteIndex
  const handleMention = (index, e) => {
    const isExistingNote = index !== -1;
    const content = isExistingNote ? notes[index] : newNoteContent;

    // Detect if there's an active mention
    const mentionRegex = /@([a-zA-Z]*)$/;
    const match = content.slice(0, e.target.selectionEnd).match(mentionRegex);
    if (match) {
      const mentionTrigger = match[1];
      const cursorPosition = e.target.selectionEnd;
      const { offsetTop, offsetLeft } = textareaRef.current;
      const lineNumber = content.slice(0, cursorPosition).split("\n").length;

      // Calculate the top and left position of the mention dropdown
      const mentionTop = offsetTop + lineNumber * 24;
      const mentionLeft = offsetLeft + lineNumber * 8;

      // Adjust position to account for scroll and height of the element
      setMentionPosition({
        top: mentionTop,
        left: mentionLeft,
      });
      setShowMentionList(true);
      setFilteredUsers(
        memoizedUsers.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(mentionTrigger.toLowerCase())
        )
      );

      setCurrentNoteIndex(isExistingNote ? index : -1); // Use index or -1 for new note
    } else {
      setShowMentionList(false);
      setCurrentNoteIndex(null);
    }
  };

  // Adjusted handleUserSelect to handle both new and existing notes
  const handleUserSelect = (user) => {
    let noteContent;
    let updatedNotes;

    if (
      currentNoteIndex !== null &&
      currentNoteIndex >= 0 &&
      typeof notes[currentNoteIndex] !== "undefined"
    ) {
      // For existing notes
      noteContent = notes[currentNoteIndex];
      const newContent = noteContent.replace(
        /@([a-zA-Z]*)$/,
        `@${user.firstName} ${user.lastName} `
      );

      updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = newContent;
    } else if (currentNoteIndex === -1) {
      // For new notes
      noteContent = newNoteContent;
      const newContent = noteContent.replace(
        /@([a-zA-Z]*)$/,
        `@${user.firstName} ${user.lastName} `
      );

      setNewNoteContent(newContent);
      updatedNotes = notes; // No need to update notes array
    } else {
      console.error("Error: currentNoteIndex or note content is invalid.");
      return;
    }

    setNotes(updatedNotes);
    setShowMentionList(false);
  };

  const handleNoteChange = (index, newValue) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = newValue;
    setNotes(updatedNotes);
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleNoteSubmit = () => {
    if (newNoteContent.trim()) {
      setNotes((prevNotes) => [...prevNotes, newNoteContent.trim()]);
      setNewNoteContent("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) {
        // Add new line
        setNewNoteContent(newNoteContent + "\n");
      } else {
        // Submit note
        handleNoteSubmit();
      }
    }
  };

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 overflow-y-scroll ${
    active
      ? modelSize === "large"
        ? "translate-x-0 w-full"
        : "translate-x-0 w-[40rem]"
      : "translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Filter users based on search term
    setFilteredUsers(
      users.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDownMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectDropDownHandler = (menu) => {
    setDropDownMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const getAttendeesNames = () => {
    return actualAttendees
      .map((attendeeId) => {
        const user = users.find((user) => user._id === attendeeId);
        return user ? `${user.firstName} ${user.lastName}` : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  const handleDropDownSelect = (menu, userId, event) => {
    event.stopPropagation();
    setActualAttendees((prevAttendees) =>
      prevAttendees.includes(userId)
        ? prevAttendees.filter((id) => id !== userId)
        : [...prevAttendees, userId]
    );
    setDropDownMenu(null); // Close the dropdown menu
  };

  return (
    <div>
      {Object.keys(meetingData).length > 0 ? (
        <>
          <div className={sidebarClass}>
            <div
              className={`mx-auto ${
                modelSize === "large" ? "w-[90%]" : "w-[90%]"
              }`}
            >
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

              <div className="p-4">
                {/* Upper div */}
                <div className="border-b-2">
                  <div className="mb-4">
                    <h1 className="text-4xl font-bold capitalize">
                      {meetingData.title}
                    </h1>
                  </div>

                  <div
                    className={`flex flex-col space-y-4 mx-auto ${
                      modelSize === "large" ? "w-[90%]" : "w-[90%]"
                    }`}
                  >
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group w-[40%]">
                        <FaRegUserCircle className="text-xl mr-2" />
                        <span className="font-semibold">Created By</span>
                      </div>
                      <div
                        className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div className="font-bold flex space-x-1 ">
                          <img
                            className="w-6 h-6 rounded-full mr-2"
                            src={
                              profile?.profilePicture ??
                              "https://via.placeholder.com/150"
                            }
                            alt="Profile"
                          />
                          {profile?.firstName ?? "no creator found"}{" "}
                          {profile?.lastName}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                        <FaRegClock className="text-xl mr-2" />
                        <span className="font-semibold">Create Time</span>
                      </div>
                      <div className="relative w-[60%] px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer group flex-1">
                        <span className="font-semibold block group-hover:hidden">
                          <TimeAgo date={meetingData.eventTime} />
                        </span>

                        <span className="font-semibold hidden group-hover:block">
                          {new Date(meetingData.createTime).toLocaleString(
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

                    {moreRowsShow && (
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                          <PiUsersBold className="text-xl mr-2" />
                          <span className="font-semibold"> Attendees</span>
                        </div>
                        <div
                          className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="max-h-60 overflow-y-auto">
                            <div>
                              {meetingData.attendees.map((attendee) => (
                                <span key={attendee._id}>
                                  {attendee.firstName} {attendee.lastName}{" "}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {moreRowsShow && (
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                          <MdMoreTime className="text-xl mr-2" />
                          <span className="font-semibold">Event Time</span>
                        </div>
                        <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                          <span className="font-semibold">
                            {new Date(meetingData.eventTime).toLocaleString(
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
                    )}

                    {moreRowsShow && (
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                          <MdFormatListBulletedAdd className="text-xl mr-2" />
                          <span className="font-semibold">Type</span>
                        </div>
                        <div
                          className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="font-semibold">
                            {meetingData.type}
                          </div>
                        </div>
                      </div>
                    )}

                    {moreRowsShow && (
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                          <IoMdTimer className="text-xl mr-2" />
                          <span className="font-semibold">Last Edit By</span>
                        </div>
                        <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                          <div className="font-semibold">
                            {meetingData?.lastEditBy?.firstName}{" "}
                            {meetingData?.lastEditBy?.lastName}
                          </div>
                        </div>
                      </div>
                    )}

                    {moreRowsShow && (
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                          <IoMdTimer className="text-xl mr-2" />
                          <span className="font-semibold">Last Edit Time</span>
                        </div>
                        <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                          <div className="font-semibold">
                            {new Date(meetingData.lastEditTime).toLocaleString(
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
                          </div>
                        </div>
                      </div>
                    )}

                    {moreRowsShow && (
                      <div className="flex flex-row justify-between w-full">
                        <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group w-[40%]">
                          <MdOutlineViewAgenda className="text-xl mr-2" />
                          <span className="font-semibold">Agenda</span>
                        </div>
                        <div
                          className="relative w-[60%]  px-4  py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <span>{meetingData.agenda}</span>
                        </div>
                      </div>
                    )}

                    <div className="w-full flex items-center justify-between cursor-pointer mx-auto">
                      <div
                        className="flex hover:bg-gray-200 hover:rounded-md p-1 dark:hover:bg-gray-700 group"
                        onClick={() => setMoreRowsShow((prev) => !prev)}
                      >
                        {moreRowsShow ? (
                          <MdKeyboardArrowUp className="text-2xl mr-2" />
                        ) : (
                          <MdKeyboardArrowDown className="text-2xl mr-2" />
                        )}
                        <span className="text-md font-semibold">
                          {moreRowsShow ? "Show less" : "Show more"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 border-b-2">
                  <div className="mb-4">
                    <div className="text-2xl font-bold capitalize flex space-x-1">
                      <FaRegSquareCheck className="mt-1" />
                      <span>Meeting Notes</span>
                    </div>
                    <small className="mt-1 font-semibold">
                      Add meeting notes to close the current meeting{" "}
                    </small>
                  </div>
                  <div
                    className={`flex flex-col space-y-4 mx-auto ${
                      modelSize === "large" ? "w-[90%]" : "w-[90%]"
                    }`}
                  >
                    <ul className="space-y-2">
                      {notes.map((note, index) => (
                        <li
                          key={index}
                          className="relative flex items-start space-x-2"
                        >
                          <span className="text-3xl">
                            <BsDot />
                          </span>
                          <div className="flex-1 relative">
                            <textarea
                              type="text"
                              value={note}
                              onChange={(e) =>
                                handleNoteChange(index, e.target.value)
                              }
                              onKeyUp={(e) => handleMention(index, e)}
                              className="w-full p-2 border rounded outline-none"
                              placeholder="Add a note with mentions..."
                            />
                            {showMentionList && currentNoteIndex === index && (
                              <ul
                                className="bg-white border rounded mt-2 shadow-lg absolute max-h-40 overflow-y-auto z-10"
                                style={{
                                  top: `${mentionPosition.top}px`,
                                  left: `${mentionPosition.left}px`,
                                }}
                              >
                                {filteredUsers.map((user) => (
                                  <li
                                    key={user._id}
                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                    onClick={() => handleUserSelect(user)}
                                  >
                                    {user.firstName} {user.lastName}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                          <button
                            className="absolute top-1 right-1 text-red-500"
                            onClick={() => handleRemoveNote(index)}
                          >
                            <IoMdTrash />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="relative">
                      <textarea
                        ref={textareaRef}
                        rows={2}
                        value={newNoteContent}
                        onKeyUp={(e) => handleMention(-1, e)} // Handle mentions in new note
                        onChange={(e) => setNewNoteContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Add a note with mentions..."
                        className="w-full h-12 p-2 border rounded outline-none"
                      />
                      {showMentionList && currentNoteIndex === -1 && (
                        <ul
                          className="bg-white border rounded shadow-lg absolute max-h-40 overflow-y-auto z-10"
                          style={{
                            top: `${mentionPosition.top}px`,
                            left: `${mentionPosition.left}px`,
                          }}
                        >
                          {filteredUsers.map((user) => (
                            <li
                              key={user._id}
                              className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                              onClick={() => handleUserSelect(user)}
                            >
                              {user.firstName} {user.lastName}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <div
                      onClick={handleNoteSubmit}
                      className="inline-flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors"
                    >
                      <IoMdAdd className="text-lg mr-1" />
                      <span>New</span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <div className="mb-4">
                    <div className="text-2xl font-bold capitalize flex space-x-1">
                      <FaUsersViewfinder className="mt-1" />
                      <span>Participants</span>
                    </div>
                    <small className="mt-1 font-semibold">
                      List meeting participants using their names
                    </small>
                  </div>
                  <div
                    className={`flex flex-col space-y-4 mx-auto ${
                      modelSize === "large" ? "w-[90%]" : "w-[90%]"
                    }`}
                  >
                    <div className="flex flex-row justify-between w-full">
                      <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                        <PiUsersBold className="text-xl mr-2" />
                        <span className="font-semibold">Attendees</span>
                      </div>
                      <div
                        ref={dropdownRef}
                        className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectDropDownHandler("attendees");
                        }}
                      >
                        <div>{getAttendeesNames() || "Select attendees"}</div>
                        {dropDownMenu === "attendees" && (
                          <div
                            className="absolute z-50 bg-white dark:bg-slate-700 w-full top-0 left-0 mt-2 shadow-lg rounded-md"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="search"
                              className="w-full p-2 border-b"
                              placeholder="Search..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="max-h-60 overflow-y-auto">
                              {filteredUsers.map((user) => (
                                <div
                                  key={user._id}
                                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                                  onClick={(e) =>
                                    handleDropDownSelect(
                                      "attendees",
                                      user._id,
                                      e
                                    )
                                  }
                                >
                                  {user.firstName} {user.lastName}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    className="inline-flex items-center space-x-1 font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors"
                    onClick={handleSubmit}
                  >
                    <GoIssueClosed />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={blurEffectClass}
            onClick={() => setActive(false)}
          ></div>
        </>
      ) : (
        <div> Data not present </div>
      )}
    </div>
  );
};

export default MeetingNotes;
