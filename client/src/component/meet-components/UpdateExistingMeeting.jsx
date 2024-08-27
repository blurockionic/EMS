// File: src/components/UpdateExistingMeeting.js
import React, { useEffect, useState } from "react";
import {
  MdOutlineViewAgenda,
  MdFormatListBulletedAdd,
} from "react-icons/md";
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegUserCircle, FaRegClock } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdTimer } from "react-icons/io";
import { PiUsersBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { fetchMeetings, updateMeeting } from "../../Redux/slices/meetingSlice";
import { ToastContainer, toast } from "react-toastify";

const UpdateExistingMeeting = ({ active, setActive, meetingId }) => {
  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // Get meetings data from Redux state
  const meetings = useSelector((state) => state.meetings.data);
  // State to manage the size of the model (small or large)
  const [modelSize, setModelSize] = useState("small");
  // State to manage which dropdown menu is currently open
  const [dropDownMenu, setDropDownMenu] = useState(null);
  // State for search term in the attendees dropdown
  const [searchTerm, setSearchTerm] = useState("");
  // State to manage the form data
  const [formData, setFormData] = useState({
    title: "",
    createdBy: "",
    lastEditedBy: "",
    attendees: [],
    createTime: "",
    eventTime: "",
    lastEditTime: "",
    type: "",
    agenda: "",
  });
  // Get profile data from Redux state
  const profile = useSelector((state) => state.profile.data);
  // Get users data from Redux state
  const { data: users } = useSelector((state) => state.user);
  // State to manage data of the single meeting being updated
  const [singleMeetingData, setSingleMeetingData] = useState({});

  // Fetch meeting details, users, and profile when component mounts or meetingId changes
  useEffect(() => {
    if (meetingId) {
      dispatch(fetchMeetings());
    }
    dispatch(fetchUsers());
    dispatch(fetchProfile());
  }, [dispatch, meetingId]);

  // Update singleMeetingData state when meetings or meetingId change
  useEffect(() => {
    if (meetings && meetingId) {
      const meeting = meetings.find((meet) => meet._id === meetingId);
      setSingleMeetingData(meeting || {});
    }
  }, [meetings, meetingId]);

  // Update formData state when singleMeetingData or profile change
  useEffect(() => {
    if (singleMeetingData._id) {
      const {
        createdBy,
        attendees,
        createTime,
        eventTime,
        // lastEditTime,
        title,
        type,
        agenda,
      } = singleMeetingData;

      setFormData({
        title: title || "",
        createdBy: createdBy
          ? `${createdBy.firstName} ${createdBy.lastName}`
          : "",
        lastEditedBy: `${profile.firstName} ${profile.lastName}`,
        attendees: attendees.map((attendee) => attendee._id) || [],
        createTime: createTime,
        eventTime: eventTime
          ? new Date(eventTime).toISOString().substring(0, 16)
          : "", // Format eventTime for datetime-local input
        lastEditTime: new Date().toISOString().substring(0, 16),
        type: type || "",
        agenda: agenda || "",
      });
    }
  }, [singleMeetingData, profile]);

  // Toggle the size of the model between small and large
  const toggleModelSize = () => {
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission to update meeting
  const handleSubmit = async () => {
    try {
      // Create a new data object from formData
      const newData = { ...formData };
      console.log("New Data:", newData);

      // Dispatch updateMeeting action and wait for completion
      const response = await dispatch(
        updateMeeting({ id: meetingId, newData })
      ).unwrap();
      console.log(response);

      // Close the model on successful update
      setActive(false);
      dispatch(fetchMeetings())
    } catch (error) {
      console.error(error);
      // Show error message on failure
      toast.error("Some error occurred while updating meeting data");
      setActive(false);
    }
  };

  // Toggle dropdown menu visibility
  const selectDropDownHandler = (menu) => {
    setDropDownMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  // Handle selection from dropdown menus
  const handleDropDownSelect = (field, value, e) => {
    e.stopPropagation();
    setFormData((prevData) => {
      if (field === "attendees") {
        // Toggle attendee selection
        return {
          ...prevData,
          attendees: prevData.attendees.includes(value)
            ? prevData.attendees.filter((attendee) => attendee !== value)
            : [...prevData.attendees, value],
        };
      } else {
        // Update other fields
        return { ...prevData, [field]: value };
      }
    });
    setDropDownMenu(null);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get names of attendees from formData
  const getAttendeesNames = () => {
    return (formData.attendees || [])
      .map((attendeeId) => {
        const user = users.find((user) => user._id === attendeeId);
        return user ? `${user.firstName} ${user.lastName}` : "";
      })
      .filter(Boolean)
      .join(", ");
  };

  // Define sidebar class based on active state and model size
  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 ${
    active
      ? modelSize === "large"
        ? "translate-x-0 w-full"
        : "translate-x-0 w-[40rem]"
      : "translate-x-full"
  }`;

  // Define blur effect class for overlay
  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;
  return (
    <>
      <ToastContainer />
      <div className={sidebarClass}>
        <div
          className={`mx-auto ${modelSize === "large" ? "w-[90%]" : "w-[90%]"}`}
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

          <div className="p-6">
            <div className="mb-4">
              <h1 className="text-4xl font-bold">
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="outline-none border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                  placeholder="Untitled"
                />
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
                <div className="w-[60%] px-4 py-1">
                  <div className="font-bold flex space-x-1">
                    {formData.createdBy}
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group w-[40%]">
                  <FaRegUserCircle className="text-xl mr-2" />
                  <span className="font-semibold">Last Edited By</span>
                </div>
                <div className="w-[60%] px-4 py-1">
                  <div className="font-bold flex space-x-1">
                    {formData.lastEditedBy}
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group w-[40%]">
                  <FaRegClock className="text-xl mr-2" />
                  <span className="font-semibold">Last Edit Time</span>
                </div>
                <div className="w-[60%] px-4 py-1">
                  <span className="font-semibold inline-block bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 px-2 py-1 rounded-md">
                    {new Date(formData.lastEditTime).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <PiUsersBold className="text-xl mr-2" />
                  <span className="font-semibold">Attendees</span>
                </div>
                <div
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
                              handleDropDownSelect("attendees", user._id, e)
                            }
                          >
                            <div className="flex items-center">
                              <img
                                className="w-6 h-6 rounded-full mr-2"
                                src={user.profilePicture}
                                alt={user.firstName}
                              />
                              <span>{`${user.firstName} ${user.lastName}`}</span>
                              {formData.attendees.includes(user._id) && (
                                <AiOutlineClose className="text-red-600 ml-2" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <IoMdTimer className="text-xl mr-2" />
                  <span className="font-semibold">Create Time</span>
                </div>
                <div className="w-[60%] px-4 py-1">
                  <div className="font-bold flex space-x-1">
                    <span className="font-semibold inline-block bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 px-2 py-1 rounded-md">
                      {new Date(formData.createTime).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <FaRegClock className="text-xl mr-2" />
                  <span className="font-semibold">Event Time</span>
                </div>
                <div className="w-[60%] px-4 py-1">
                  <input
                    type="datetime-local"
                    name="eventTime"
                    required
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <MdOutlineViewAgenda className="text-xl mr-2" />
                  <span className="font-semibold">Type</span>
                </div>
                <div
                  className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectDropDownHandler("type");
                  }}
                >
                  <div>{formData.type || "Select type"}</div>
                  {dropDownMenu === "type" && (
                    <div
                      className="absolute z-50 bg-white dark:bg-slate-700 w-full top-0 left-0 mt-2 shadow-lg rounded-md"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={(e) =>
                          handleDropDownSelect("type", "Daily Meet", e)
                        }
                      >
                        Daily Meet
                      </div>
                      <div
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={(e) =>
                          handleDropDownSelect("type", "Training", e)
                        }
                      >
                        Training
                      </div>
                      <div
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={(e) =>
                          handleDropDownSelect("type", "Brainstorm", e)
                        }
                      >
                        Brainstorm
                      </div>
                      <div
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={(e) =>
                          handleDropDownSelect("type", "Team Weekly", e)
                        }
                      >
                        Team Weekly
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <MdFormatListBulletedAdd className="text-xl mr-2" />
                  <span className="font-semibold">Agenda</span>
                </div>
                <div className="w-[60%] px-4 py-1">
                  <textarea
                    name="agenda"
                    value={formData.agenda}
                    onChange={handleInputChange}
                    className="w-full border rounded-md p-2"
                    rows="4"
                    placeholder="Agenda details..."
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  onClick={() => setActive(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {active && (
        <div className={blurEffectClass} onClick={() => setActive(false)}></div>
      )}
    </>
  );
};

export default UpdateExistingMeeting;
