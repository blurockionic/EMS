import React, { useState, useRef, useMemo, useCallback } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { BsThreeDots, } from "react-icons/bs";
import { FaBorderAll, FaTable } from "react-icons/fa6";
import { IoCalendar, IoSearchSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { MdOutlineAttractions, MdOutlineViewTimeline } from "react-icons/md";
import { GoIssueClosed } from "react-icons/go";
import { Link } from "react-router-dom";

const ActionItemsManager = () => {
  const [uiState, setUiState] = useState({
    showMoreTabs: false,
    searchInputBox: false,
    activeTab: "Action Items", // Default tab set to Action Items
    loading: false, // Loading state for showing Loader
    tabs: ["Action Items", "Calendar", "All"], // Initialize tabs list
  });

  const [notes, setNotes] = useState([]);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [showMentionList, setShowMentionList] = useState(false);
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(null);
  const textareaRef = useRef(null);
  const { data: users } = useSelector((state) => state.user);

  const memoizedUsers = useMemo(
    () => [{ _id: "all", firstName: "all", lastName: "" }, ...users],
    [users]
  );

  // Memoized function to get the icon associated with each tab
  const getTabIcon = useCallback((tab) => {
    const icons = {
      "Action Items": <MdOutlineAttractions className="mr-2 mt-1" />,
      Calendar: <IoCalendar className="mr-2 mt-1" />,
      All: <FaBorderAll className="mr-2 mt-1" />,
      "Table View": <FaTable className="mr-2 mt-1" />,
      Timeline: <MdOutlineViewTimeline className="mr-2 mt-1" />,
      Completed: <GoIssueClosed className="mr-2 mt-1" />,
    };
    return icons[tab] || null; // Return the corresponding icon or null if not found
  }, []);

  const [modals, setModals] = useState();

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
          onClick={() => handleTabClick(tab)} // Update active tab on click
        >
          {getTabIcon(tab)} {tab}
        </div>
      )),
    [uiState.tabs, uiState.activeTab, getTabIcon] // Dependencies: tabs, activeTab, getTabIcon
  );

  const handleSearchButton = () => {
    setUiState((prevState) => ({
      ...prevState,
      searchInputBox: !prevState.searchInputBox,
    }));
  };

  const handleNewClick = () => {
    setModals({ ...modals, activeNewMeeting: true });
  };

  const handleNoteChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = value;
    setNotes(updatedNotes);
  };

  const handleMention = (index, e) => {
    const isExistingNote = index !== -1;
    const content = isExistingNote ? notes[index] : newNoteContent;

    const mentionRegex = /@([a-zA-Z]*)$/;
    const match = content.slice(0, e.target.selectionEnd).match(mentionRegex);

    if (match) {
      const mentionTrigger = match[1];
      const cursorPosition = e.target.selectionEnd;
      const { offsetTop, offsetLeft } = textareaRef.current;
      const rect = e.target.getBoundingClientRect();
      const lineNumber = content.slice(0, cursorPosition).split("\n").length;

      setMentionPosition({
        top: rect.top + window.scrollY + lineNumber * 24,
        left: rect.left + window.scrollX + lineNumber * 8,
      });
      setShowMentionList(true);
      setFilteredUsers(
        memoizedUsers.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(mentionTrigger.toLowerCase())
        )
      );
      setCurrentNoteIndex(isExistingNote ? index : -1);
    } else {
      setShowMentionList(false);
      setCurrentNoteIndex(null);
    }
  };

  const handleUserSelect = (user) => {
    // Logic for handling user selection from mention list
    console.log(`User selected: ${user.firstName} ${user.lastName}`);
  };

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

  const handleTabClick = (tab) => {
    setUiState((prevState) => ({
      ...prevState,
      activeTab: tab,
    }));
  };

  return (
    <div className="w-[90%] mx-auto mt-2">
      {/* Loader only appears at the top of the screen when loading */}
      {/* {uiState.loading && <Loader />} */}

      {/* <h1 className="text-4xl font-bold p-2">{uiState.activeTab}</h1> */}
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
              <IoMdAdd className="text-2xl mx-2 mt-2" />
            </div>
            {uiState.showMoreTabs && (
              <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 p-1">
                <ul>
                  {["Table View", "Timeline", "Completed"].map((tab) => (
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
          <Link className="flex items-center" to="../NewActionItem">
            <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
              <IoMdAdd className="text-lg mr-1" />
              <span>New</span>
            </div>
          </Link>
        </div>
      </nav>

      <div className="p-2">
        <div
          className={`flex flex-col space-y-4 mx-auto ${
            uiState.activeTab === "Action Items" ? "w-[90%]" : "w-[90%]"
          }`}
        >
          {uiState.activeTab === "Action Items" && (
            <ul className="space-y-2">
              <div>"this is action"</div>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionItemsManager;
