import React, { useCallback, useEffect, useRef, useState } from "react";
// Importing necessary React hooks and libraries

import { useDispatch, useSelector } from "react-redux";
// Importing hooks from Redux for state management

import { fetchProjects } from "../../Redux/slices/projectSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { fetchTags } from "../../Redux/slices/tagSlice";
import { submitNewTask } from "../../Redux/slices/taskSlice";
// Importing Redux actions to fetch data and submit the task

import { toast, ToastContainer } from "react-toastify";
// Importing ToastContainer for notifications and toast for triggering notifications

import { useNavigate } from "react-router-dom";
// Importing useNavigate for programmatic navigation

import {
  IoSettingsOutline,
  IoClose,
  IoCheckmarkSharp,
  IoCalendarNumberOutline,
} from "react-icons/io5";
// Importing icons from react-icons library for UI elements

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Importing DatePicker for date selection and its corresponding CSS

const NewActionItem = () => {
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Hook for navigating to different routes

  const [loading, setLoading] = useState(false); // State to manage loading status
  const { allProject } = useSelector((state) => state.project); // Fetching projects from Redux store
  const { data: users } = useSelector((state) => state.user); // Fetching users from Redux store
  const { tags } = useSelector((state) => state.tags); // Fetching tags from Redux store
  const profile = useSelector((state) => state.profile.data); // Fetching user profile from Redux store

  const [title, setTitle] = useState(""); // State for task title
  const [description, setDescription] = useState(""); // State for task description
  const [status] = useState("Open"); // State for task status (default is "Open")
  const [assignBy, setAssignBy] = useState(""); // State for who is assigning the task
  const [assignTo, setAssignTo] = useState([]); // State for who the task is assigned to
  const [project, setProject] = useState(""); // State for selected project
  const [assignDate, setAssignDate] = useState(""); // State for the assignment date
  const [dueDate, setDueDate] = useState(""); // State for the task due date

  const [tagDropdown, setTagDropdown] = useState(false); // State to toggle the tag dropdown
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [activeTab, setActiveTab] = useState("Create Task"); // State to track the active tab
  const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file for upload
  const [isDragActive, setIsDragActive] = useState(false); // State to manage drag-and-drop area status

  // Callback function to handle file drop in drag-and-drop area
  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false); // Reset drag state
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]); // Set selected file
    }
  }, []);

  // Function to handle drag over event in drag-and-drop area
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true); // Set drag active state
    }
  };

  // Function to handle drag leave event in drag-and-drop area
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false); // Reset drag state
  };

  // Function to handle file selection using input element
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]); // Set selected file
    }
  };

  // Fetch data when component mounts (projects, users, profile, tags)
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
    dispatch(fetchProfile());
    dispatch(fetchTags());
  }, [dispatch]);

  // Function to handle tab switching (e.g., Create Task)
  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set the active tab
  };

  // Function to handle tag selection
  const handleTagSelection = (tagId) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((t) => t !== tagId) // Remove tag if already selected
        : [...prevTags, tagId] // Add tag if not selected
    );
  };

  // Function to handle selection of users to assign task to
  const handleAssignToSelection = (userId) => {
    setAssignTo((prevAssignTo) =>
      prevAssignTo.includes(userId)
        ? prevAssignTo.filter((id) => id !== userId) // Remove user if already selected
        : [...prevAssignTo, userId] // Add user if not selected
    );
  };

  // Function to handle form submission for creating a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state
    const data = new FormData(); // Create a FormData object to handle file uploads
    data.append("title", title);
    data.append("description", description);
    data.append("status", status);
    data.append("assignBy", assignBy);
    data.append("assignTo", JSON.stringify(assignTo)); // Convert array to JSON string
    data.append("project", project);
    data.append("assignDate", assignDate);
    data.append("dueDate", dueDate);
    data.append("selectedTags", JSON.stringify(selectedTags)); // Convert array to JSON string

    if (selectedFile) {
      data.append("file", selectedFile); // Append the selected file
    }

    try {
      const response = await dispatch(submitNewTask(data)); // Submit task to backend
      if (response.payload.success) {
        toast.success(response.payload.message); // Show success message
        setTimeout(() => navigate("../alltask"), 3000); // Navigate to all tasks after 3 seconds
        resetForm(); // Reset form after successful submission
        setLoading(false); // Reset loading state
      } else {
        setErrorMessage(response.payload.message || "Error creating task."); // Set error message
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setErrorMessage("Error creating task."); // Set error message
      setLoading(false); // Reset loading state
    }
  };

  // Function to reset the form after submission (can be implemented as needed)
  const resetForm = () => {
    // Example: Reset the form fields
    // setTitle("");
    // setDescription("");
    // setStatus("Open");
    // setAssignBy("");
    // setAssignTo([]);
    // setProject("");
    // setAssignDate("");
    // setDueDate("");
    // setSelectedFile(null);
    // setSelectedTags([]);
  };

  // Function to toggle the visibility of the tag dropdown
  const toggleTagDropdown = () => setTagDropdown((prev) => !prev);

  const assignDateRef = useRef(null); // Ref for the assign date date picker
  const dueDateRef = useRef(null); // Ref for the due date date picker

  // Function to handle icon clicks for opening date pickers
  const handleIconClick = (label) => {
    if (label === "Assign Date" && assignDateRef.current) {
      assignDateRef.current.setOpen(true); // Open assign date picker
    } else if (label === "Due Date" && dueDateRef.current) {
      dueDateRef.current.setOpen(true); // Open due date picker
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between border-b">
        <div className="flex flex-row">
          <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === "Create Task" ? "bg-gray-900 text-white" : ""
              } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer`}
              onClick={() => handleTabClick("Create Task")}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>

      <div className="w-full dark:bg-gray-800 rounded shadow-md flex items-center justify-center">
        <ToastContainer />
        <div className=" flex flex-col md:flex-row rounded shadow-md w-[80%] py-2 mx-auto">
          <div className="pl-1 flex-shrink-0">
            <img
              className="w-10 h-10 rounded-full"
              src={profile?.profilePicture ?? "https://via.placeholder.com/150"}
              alt="https://via.placeholder.com/150"
            />
          </div>
          <div className="left md:w-[90%] flex flex-col m-2 p-2 rounded shadow-md">
            <div>
              <label className="block mb-2">
                <span className="text-gray-600 dark:text-white font-bold ">
                  Add a task title
                </span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded focus:ring-slate-900 focus:border-slate-900"
                  placeholder="Enter task title"
                />
              </label>
            </div>
            <div>
              <h3 className="ml-2 text-gray-600 dark:text-white font-bold">
                Add a description
              </h3>
              <div className="w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <div className="p-3">
                  <textarea
                    rows="10"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-24 border border-gray-300 dark:border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-slate-950 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Write your task description here..."
                  />
                </div>

                {selectedFile && (
                  <div className="mt-3 p-3">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Selected file:</strong> {selectedFile.name}
                    </div>
                    {/* <div className="mt-2">
                      <button
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
                        onClick={() => handlePreview(selectedFile)}
                      >
                        Preview File
                      </button>
                    </div> */}
                  </div>
                )}

                <div
                  className={`border-t border-gray-300 dark:border-gray-600 p-4 mt-2 rounded-b-lg transition-colors duration-200 ${
                    isDragActive
                      ? "bg-blue-50 dark:bg-blue-900"
                      : "bg-gray-50 dark:bg-gray-700"
                  }`}
                  onDrop={onDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() =>
                    document?.getElementById("file-upload").click()
                  }
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <svg
                        className="w-6 h-6 mx-2 text-gray-400 dark:text-gray-300"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 16"
                      >
                        <path d="M16.5 10a3.5 3.5 0 10-3.17-5H9.5a3.5 3.5 0 00-3.17 5H3.5a3.5 3.5 0 000 7h13a3.5 3.5 0 000-7h-.5zM6 7a2.5 2.5 0 012.5-2.5h3.83a3.501 3.501 0 006.34 2H17a2.5 2.5 0 010 5h-1v1a1 1 0 11-2 0v-1H6v1a1 1 0 11-2 0v-1H3.5a2.5 2.5 0 010-5H6zm4 3a1 1 0 00-1 1v2.586l-.293-.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 13.586V11a1 1 0 00-1-1z" />
                      </svg>
                      <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                        Drag and drop a file here, or{" "}
                        <span className="hover:underline font-extrabold">
                          browse
                        </span>
                      </p>
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview area */}
                {/* {previewContent && (
                  <div className="mt-4 border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
                    {previewContent}
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="right md:w-1/4 h-full flex flex-col gap-4 m-2 p-2 rounded shadow-md">
            <div className="relative flex flex-col pb-4 border-b ">
              <div className="flex flex-row justify-between text-gray-600 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 font-bold">
                Tags
                <IoSettingsOutline
                  className="text-xl cursor-pointer"
                  onClick={toggleTagDropdown}
                />
              </div>
              {tagDropdown && (
                <div className="absolute z-10 flex-wrap bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md p-2 mt-2 w-full">
                  <div
                    className="flex justify-end cursor-pointer"
                    onClick={toggleTagDropdown}
                  >
                    <IoClose className="text-xl hover:text-red-700" />
                  </div>
                  {tags.map((tag) => (
                    <div
                      key={tag._id}
                      onClick={() => handleTagSelection(tag._id)}
                      className="flex flex-wrap flex-row justify-between border-b py-1.5 mb-1 cursor-pointer"
                    >
                      {selectedTags.includes(tag._id) && (
                        <IoCheckmarkSharp className="mr-2 text-blue-600" />
                      )}
                      <span
                        className={`font-semibold ${
                          selectedTags.includes(tag._id)
                            ? "text-blue-600 font-bold"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {tag.tagName}
                      </span>
                      {selectedTags.includes(tag._id) && (
                        <IoClose className="text-xl hover:text-red-700 ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap mt-2">
                {selectedTags.length === 0 ? (
                  <span className="text-gray-500 dark:text-white text-sm ">
                    None yet
                  </span>
                ) : (
                  selectedTags.map((tagId) => {
                    const tag = tags.find((t) => t._id === tagId);
                    return (
                      <div
                        key={tagId}
                        className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-2 mb-2"
                      >
                        {tag.tagName}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {["Assign By", "Assign To", "Project"].map((label, index) => (
              <Dropdown
                key={index}
                label={label}
                data={
                  label === "Assign By"
                    ? users.filter((user) => user._id === profile._id)
                    : label === "Assign To"
                    ? users.filter((user) => user.role !== "admin")
                    : allProject
                }
                selected={
                  label === "Assign By"
                    ? assignBy
                    : label === "Assign To"
                    ? assignTo
                    : project
                }
                onChange={
                  label === "Assign By"
                    ? setAssignBy
                    : label === "Assign To"
                    ? handleAssignToSelection
                    : setProject
                }
                multiple={label === "Assign To"}
              />
            ))}

            {["Assign Date", "Due Date"].map((label, index) => (
              <div key={index} className="relative pb-4 border-b">
                <div className="flex flex-row justify-between items-center text-gray-600 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 font-bold">
                  {label}
                  <IoCalendarNumberOutline
                    className="text-xl cursor-pointer"
                    onClick={() => handleIconClick(label)}
                  />
                </div>

                <DatePicker
                  selected={label === "Assign Date" ? assignDate : dueDate}
                  onChange={(date) =>
                    label === "Assign Date"
                      ? setAssignDate(date)
                      : setDueDate(date)
                  }
                  ref={label === "Assign Date" ? assignDateRef : dueDateRef}
                  customInput={<input style={{ display: "none" }} />} // Custom input is hidden
                  popperPlacement="bottom-start"
                />

                <div className="text-gray-700 dark:text-gray-400">
                  {label === "Assign Date" ? (
                    assignDate ? (
                      <span className="text-gray-500 dark:text-white text-sm font-semibold">
                        {assignDate.toLocaleDateString()}{" "}
                      </span>
                    ) : (
                      <span
                        className="text-gray-500 
                     dark:text-white text-sm "
                      >
                        None yet
                      </span>
                    )
                  ) : label === "Due Date" ? (
                    dueDate ? (
                      <span className="text-gray-500 dark:text-white text-sm">
                        {dueDate.toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-gray-500 dark:text-white text-sm">
                        None yet
                      </span>
                    )
                  ) : null}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-slate-950 text-white py-2 px-4 rounded-md hover:bg-slate-800 disabled:bg-gray-400"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    {/* Loader Spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-white mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Loading...
                  </div>
                ) : (
                  "Create New Task"
                )}
              </button>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Dropdown = ({ label, data, selected, onChange, multiple = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredData = data.filter((item) =>
    item.firstName
      ? `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : item.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex flex-col pb-4 border-b">
      <div className="flex flex-row justify-between text-gray-600 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 font-bold">
        {label}
        <IoSettingsOutline
          className="text-xl cursor-pointer"
          onClick={toggleDropdown}
        />
      </div>
      {dropdownOpen && (
        <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md p-2 mt-2 w-full">
          <div
            className="flex justify-end cursor-pointer"
            onClick={toggleDropdown}
          >
            <IoClose className="text-xl hover:text-red-700" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-input mb-2 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder={`Search ${label.toLowerCase()}`}
          />
          <div className="flex flex-col mt-2 max-h-48 overflow-y-auto">
            {filteredData.map((item) => (
              <div
                key={item._id}
                onClick={() => onChange(item._id)}
                className={`flex items-center justify-between border-b py-1.5 mb-1 cursor-pointer ${
                  (
                    multiple
                      ? selected.includes(item._id)
                      : selected === item._id
                  )
                    ? "bg-gray-200 dark:bg-gray-700"
                    : ""
                }`}
              >
                {(multiple
                  ? selected.includes(item._id)
                  : selected === item._id) && (
                  <IoCheckmarkSharp className="mr-2 text-blue-600" />
                )}
                <span
                  className={`font-semibold ${
                    (
                      multiple
                        ? selected.includes(item._id)
                        : selected === item._id
                    )
                      ? "text-blue-600 font-bold"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.firstName
                    ? `${item.firstName} ${item.lastName}`
                    : item.projectName}
                </span>
                {(multiple
                  ? selected.includes(item._id)
                  : selected === item._id) && (
                  <IoClose className="text-xl hover:text-red-700 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap mt-2">
        {multiple ? (
          selected.length > 0 ? (
            selected.map((id) => (
              <div
                key={id}
                className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-2 mb-2"
              >
                {data.find((item) => item._id === id)?.firstName
                  ? `${data.find((item) => item._id === id).firstName} ${
                      data.find((item) => item._id === id).lastName
                    }`
                  : data.find((item) => item._id === id).projectName}
              </div>
            ))
          ) : (
            <span className="text-gray-500 dark:text-white text-sm ">
              None yet
            </span>
          )
        ) : selected ? (
          <div className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-2 mb-2">
            {data.find((item) => item._id === selected)?.firstName
              ? `${data.find((item) => item._id === selected).firstName} ${
                  data.find((item) => item._id === selected)?.lastName
                }`
              : data.find((item) => item._id === selected)?.projectName}
          </div>
        ) : (
          <span className="text-gray-500 dark:text-white text-sm">
            None yet
          </span>
        )}
      </div>
    </div>
  );
};

export default NewActionItem;
