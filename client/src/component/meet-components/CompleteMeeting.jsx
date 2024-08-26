import React, {

  useRef,
  useState,
  useMemo,
} from "react";
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
import { fetchMeetings } from "../../Redux/slices/meetingSlice";
import { toast } from "react-toastify";
import TimeAgo from "../utilities-components/TimeAgo";
import { FaRegSquareCheck } from "react-icons/fa6";

const CompleteMeeting = ({ active, setActive, meetingData }) => {
  const dispatch = useDispatch();

  // States
  const [modelSize, setModelSize] = useState("small");
  const [dropDownMenu, setDropDownMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState("");
  const [moreRowsShow, setMoreRowsShow] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [showMentionList, setShowMentionList] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const [newNoteContent, setNewNoteContent] = useState("");
  const textareaRef = useRef(null);

  // Memoize profile and user data
  const profile = useSelector((state) => state.profile.data);
  const { data: users } = useSelector((state) => state.user);
  const memoizedUsers = useMemo(
    () => [{ _id: "all", firstName: "all", lastName: "" }, ...users],
    [users]
  );

  const toggleModelSize = () => {
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const handleSubmit = async () => {
    try {
      setActive(false);
      dispatch(fetchMeetings());
    } catch (error) {
      console.error(error);
      toast.error("Some error occurred while updating meeting data");
      setActive(false);
    }
  };

  const handleDropDownSelect = (field, value, e) => {
    e.stopPropagation();
    setDropDownMenu(null);
  };

  const filteredUsersMemo = useMemo(() => {
    return memoizedUsers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [memoizedUsers, searchTerm]);

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
      const rect = e.target.getBoundingClientRect();
      const lineNumber = content.slice(0, cursorPosition).split("\n").length;

      const mentionTop = offsetTop + lineNumber * 24 - rect.top;
      const mentionLeft = offsetLeft - rect.left;

      setMentionPosition({ top: mentionTop, left: mentionLeft });
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

  console.log(notes);
  
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
                <div className="border-b-2 ">
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
                          <span className="font-semibold">
                            {" "}
                          Attendees
                          </span>
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

                <div className="p-2">
                  <div className="mb-4">
                    <div className="text-2xl font-bold capitalize flex space-x-1">
                    <FaRegSquareCheck className="mt-1" />  
                    <span>
                    Meeting Notes
                    </span>
                    </div>
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
                          className="relative flex items-center p-1"
                        >
                          <span className="text-3xl">
                            <BsDot />
                          </span>
                          <div className="flex-1 ml-2 relative">
                            <input
                              type="text"
                              value={note}
                              onChange={(e) =>
                                handleNoteChange(index, e.target.value)
                              }
                              onKeyUp={(e) => handleMention(index, e)}
                              className="w-full p-1 border rounded"
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
                            className="absolute top-3 -right-3 text-red-500"
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
                        className="w-full h-12 p-2 border-0 outline-none"
                      />
                      {showMentionList && (
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
                    <button className="p-1" onClick={handleNoteSubmit}>
                      <IoMdAdd /> Add
                    </button>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={handleSubmit}
                  >
                    Close
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

export default CompleteMeeting;
