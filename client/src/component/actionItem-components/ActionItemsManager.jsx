import React, { useState, useRef, useMemo } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { BsThreeDots, BsDot } from "react-icons/bs";
import { FaRegClock, FaRegSquareCheck } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

const ActionItemsManager = () => {
  const [uiState, setUiState] = useState({
    showMoreTabs: false,
    searchInputBox: false,
  });
  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const textareaRef = useRef(null);
  const { data: users } = useSelector((state) => state.user);
  const tabsList = []; // Placeholder for tabs list
  const modelSize = "large"; // Placeholder for model size
  const memoizedUsers = useMemo(
    () => [{ _id: "all", firstName: "all", lastName: "" }, ...users],
    [users]
  );

  const handleSearchButton = () => {
    setUiState((prevState) => ({
      ...prevState,
      searchInputBox: !prevState.searchInputBox,
    }));
  };

  const handleNewClick = () => {
    // Logic for handling new item click
  };

  const addTab = (tab) => {
    // Logic for adding a new tab
  };

  const getTabIcon = (tab) => {
    // Logic to get icon for a tab
    return null;
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
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
      const rect = e.target.getBoundingClientRect();
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


  const handleUserSelect = (user) => {
    // Logic for handling user selection from mention list
  };

  const handleRemoveNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleNoteSubmit = () => {
    if (newNoteContent.trim()) {
      setNotes([...notes, newNoteContent]);
      setNewNoteContent("");
    }
  };

  const handleKeyDown = (event) => {
    // Logic for handling key down events in textarea
  };

  return (
    <div className="w-[90%] mx-auto mt-2">
      <h1 className="text-4xl font-bold p-2">Action Items</h1>

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
                  {["Table View", "Timeline"].map((tab) => (
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

      <div className="p-2">
        <div className="mb-4">
          <div className="text-2xl font-bold capitalize flex space-x-1">
            <FaRegSquareCheck className="mt-1" />
            <span>Action Items</span>
          </div>
        </div>

        <div
          className={`flex flex-col space-y-4 mx-auto ${
            modelSize === "large" ? "w-[90%]" : "w-[90%]"
          }`}
        >
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="relative flex items-center p-1">
                <div className="flex flex-col w-full">
                  <div className="flex items-start ml-2 relative">
                    <span className="text-3xl">
                      <BsDot />
                    </span>
                    <textarea
                      type="text"
                      value={note}
                      onChange={(e) => handleNoteChange(index, e.target.value)}
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
                        aria-labelledby={`mention-list-${index}`}
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
                    <button
                      className="absolute top-2 -right-2 text-red-500"
                      onClick={() => handleRemoveNote(index)}
                      aria-label={`Remove note ${index}`}
                    >
                      <IoMdTrash />
                    </button>
                  </div>

                  <div className="flex flex-row justify-between mt-2">
                    <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <FaRegClock className="text-xl mr-2" />
                      <span className="font-semibold">Due Date</span>
                    </div>
                    <div className="w-[60%] px-4 py-1">
                      <input
                        type="datetime-local"
                        name="eventTime"
                        required
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
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
            {showMentionList && currentNoteIndex === -1 && (
              <ul
                className="bg-white border rounded mt-2 shadow-lg absolute max-h-40 overflow-y-auto z-10"
                style={{
                  top: `${mentionPosition.top}px`,
                  left: `${mentionPosition.left}px`,
                }}
                aria-labelledby="mention-list-new"
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
            className="p-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleNoteSubmit}
            aria-label="Add new note"
          >
            <IoMdAdd />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionItemsManager;
