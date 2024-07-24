import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import { fetchTags } from "../../../Redux/slices/tagSlice";
import { submitNewTask } from "../../../Redux/slices/taskSlice";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  IoSettingsOutline,
  IoClose,
  IoCheckmarkSharp,
  IoCalendarNumberOutline,
} from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allProject } = useSelector((state) => state.project);
  const { data: users } = useSelector((state) => state.user);
  const { tags } = useSelector((state) => state.tags);
  const profile = useSelector((state) => state.profile.data);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Open");
  const [assignBy, setAssignBy] = useState("");
  const [assignTo, setAssignTo] = useState([]);
  const [project, setProject] = useState("");
  const [assignDate, setAssignDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [fileUploader, setFileUploader] = useState(null);
  const [tagDropdown, setTagDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("Create Task");
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
    dispatch(fetchProfile());
    dispatch(fetchTags());
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleTagSelection = (tagId) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((t) => t !== tagId)
        : [...prevTags, tagId]
    );
  };

  const handleAssignToSelection = (userId) => {
    setAssignTo((prevAssignTo) =>
      prevAssignTo.includes(userId)
        ? prevAssignTo.filter((id) => id !== userId)
        : [...prevAssignTo, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("status", status);
    data.append("assignBy", assignBy);
    data.append("assignTo", JSON.stringify(assignTo)); // Convert to JSON string
    data.append("project", project);
    data.append("assignDate", assignDate);
    data.append("dueDate", dueDate);
    data.append("selectedTags", JSON.stringify(selectedTags)); // Convert to JSON string
    if (fileUploader) data.append("fileUploader", fileUploader);

    // for (let [key, value] of data.entries()) {
    //     console.log(`form data before submit ${key}: ${value}`);
    // }

    try {
      const response = await dispatch(submitNewTask(data));
      if (response.payload.success) {
        toast.success(response.payload.message);
        setTimeout(() => navigate("../alltask"), 3000);
        resetForm();
      } else {
        setErrorMessage(response.payload.message || "Error creating task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setErrorMessage("Error creating task.");
    }
  };

  const resetForm = () => {
    // setTitle("");
    // setDescription("");
    // setStatus("Open");
    // setAssignBy("");
    // setAssignTo([]);
    // setProject("");
    // setAssignDate("");
    // setDueDate("");
    // setFileUploader(null);
    // setSelectedTags([]);
  };

  const toggleTagDropdown = () => setTagDropdown((prev) => !prev);

  const assignDateRef = useRef(null);
  const dueDateRef = useRef(null);

  const handleIconClick = (label) => {
    if (label === "Assign Date" && assignDateRef.current) {
      assignDateRef.current.setOpen(true); // Open the date picker
    } else if (label === "Due Date" && dueDateRef.current) {
      dueDateRef.current.setOpen(true); // Open the date picker
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
                  className="form-input p-2 mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                />
              </label>
            </div>
            <div className="">
              <label className="block mb-2">
                <span className="text-gray-600 dark:text-white font-bold">
                  Add a description
                </span>
                <textarea
                  rows="10"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-input mt-1 p-2 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                />
              </label>
            </div>
            <div>
              <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                  Upload File:
                </span>
                <input
                  type="file"
                  onChange={(e) => setFileUploader(e.target.files[0])}
                  className="form-input mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
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
                    ? users.filter((user) => user.role === "manager")
                    : label === "Assign To"
                    ? users.filter((user) => user.role === "employee")
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
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
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
                  data.find((item) => item._id === selected).lastName
                }`
              : data.find((item) => item._id === selected).projectName}
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

export default NewTask;
