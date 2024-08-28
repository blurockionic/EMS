import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdMoreTime,
  MdFormatListBulletedAdd,
  MdOutlineViewAgenda,
} from "react-icons/md"; // Import icons for various UI elements
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsThreeDots,
} from "react-icons/bs"; // Import more icons
import { FaRegUserCircle, FaRegClock } from "react-icons/fa"; // Import icons for user and clock
import { AiOutlineClose } from "react-icons/ai"; // Import close icon
import { IoMdTimer } from "react-icons/io"; // Import timer icon
import { PiUsersBold } from "react-icons/pi"; // Import users icon
import { fetchProfile } from "../../Redux/slices/profileSlice"; // Import action to fetch user profile
import { fetchUsers } from "../../Redux/slices/allUserSlice"; // Import action to fetch all users
import { fetchMeetings, createMeeting } from "../../Redux/slices/meetingSlice"; // Import actions to fetch and create meetings
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks for dispatching actions and selecting state

const NewMeeting = ({ active, setActive }) => {
  // Component for creating a new meeting
  const [modelSize, setModelSize] = useState("small"); // State for modal size (small or large)
  const [dropDownMenu, setDropDownMenu] = useState(null); // State for currently active dropdown menu
  const [searchTerm, setSearchTerm] = useState(""); // State for search input in attendee dropdown
  const [formData, setFormData] = useState({
    // State for form data
    title: "",
    createdBy: "",
    attendees: [],
    createTime: "",
    eventTime: "",
    lastEditBy: "",
    lastEditTime: "",
    type: "",
    agenda: "",
  });

  const [moreRowsShow, setMoreRowsShow] = useState(false); // State to show/hide additional form fields

  const dispatch = useDispatch(); // Initialize dispatch function for Redux
  const profile = useSelector((state) => state.profile.data); // Get user profile from Redux state
  const { data: users } = useSelector((state) => state.user); // Get users list from Redux state

  useEffect(() => {
    // Fetch data when component mounts or dependencies change
    dispatch(fetchUsers()); // Fetch all users
    dispatch(fetchProfile()); // Fetch user profile
    dispatch(fetchMeetings()); // Fetch existing meetings
  }, [dispatch]); // Dependency array to re-run effect if dispatch changes

  useEffect(() => {
    // Reset form data when the component is active or profile changes
    setFormData({
      title: "",
      createdBy: profile._id,
      attendees: [],
      createTime: new Date().toISOString(),
      eventTime: "",
      lastEditBy: profile._id,
      lastEditTime: new Date().toISOString(),
      type: "",
      agenda: "",
    });
  }, [active, profile]); // Dependencies to re-run effect if active or profile changes

  const toggleModelSize = () => {
    // Toggle modal size between small and large
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const handleInputChange = (e) => {
    // Handle input changes in the form
    const { name, value } = e.target; // Destructure input name and value
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data
  };

  const handleSubmit = async () => {
    // Handle form submission
    try {
      const response = await dispatch(createMeeting(formData)).unwrap(); // Dispatch createMeeting action and unwrap response
      console.log("Meeting created successfully:", response.message); // Log success message
      setActive(false)
      dispatch(fetchMeetings()); // Fetch existing meetings
      // Perform additional actions, like closing the modal or resetting the form
    } catch (error) {
      // Catch any errors during meeting creation
      console.error("Error creating meeting:", error); // Log error
      // Show an error message to the user or take other actions
    }
  };

  const selectDropDownHandler = (menu) => {
    // Toggle dropdown menu visibility
    setDropDownMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleDropDownSelect = (field, value, e) => {
    // Handle selection in dropdown menus
    e.stopPropagation(); // Prevent event bubbling
    setFormData((prevData) => {
      if (field === "attendees") {
        // Handle attendees dropdown separately
        return {
          ...prevData,
          attendees: prevData.attendees.includes(value)
            ? prevData.attendees.filter((attendee) => attendee !== value) // Remove attendee if already selected
            : [...prevData.attendees, value], // Add attendee if not already selected
        };
      } else {
        // Handle other dropdown fields
        return { ...prevData, [field]: value };
      }
    });
    setDropDownMenu(null); // Close the dropdown menu
  };

  const filteredUsers = users.filter(
    (
      user // Filter users based on search term
    ) => user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendeesNames = () => {
    // Get names of selected attendees
    return formData.attendees
      .map((attendeeId) => {
        const user = users.find((user) => user._id === attendeeId); // Find user by ID
        return user ? `${user.firstName} ${user.lastName}` : ""; // Return full name if user found
      })
      .filter(Boolean) // Remove empty names
      .join(", "); // Join names with comma
  };

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 ${
    active
      ? modelSize === "large"
        ? "translate-x-0 w-full"
        : "translate-x-0 w-[40rem]"
      : "translate-x-full"
  }`; // Class names for sidebar based on active state and modal size

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`; // Class names for blur effect based on active state

  return (
    <div>
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
                <div
                  className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectDropDownHandler("createdBy");
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
                  {dropDownMenu === "createdBy" && (
                    <div className="absolute z-50 bg-white dark:bg-slate-700 w-full top-0 left-0 mt-2 shadow-lg rounded-md"></div>
                  )}
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
                            {user.firstName} {user.lastName}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <FaRegClock className="text-xl mr-2" />
                  <span className="font-semibold">Create Time</span>
                </div>
                <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                  <div>{new Date(formData.createTime).toLocaleString()}</div>
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <MdMoreTime className="text-xl mr-2" />
                  <span className="font-semibold">Event Time</span>
                </div>
                <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                  <input
                    type="datetime-local"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    className="outline-none w-full bg-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <MdFormatListBulletedAdd className="text-xl mr-2" />
                  <span className="font-semibold">Type</span>
                </div>
                <div
                  className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectDropDownHandler("type");
                  }}
                >
                  <div>{formData.type || "Select a type"}</div>
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

              {moreRowsShow && (
                <div className="flex flex-row justify-between w-full">
                  <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <IoMdTimer className="text-xl mr-2" />
                    <span className="font-semibold">Last Edit By</span>
                  </div>
                  <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                    <div>
                      {profile.firstName} {profile.lastName}
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
                    <div>
                      {new Date(formData.lastEditTime).toLocaleString()}
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
                    className="relative w-[60%] p-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      selectDropDownHandler("");
                    }}
                  >
                    <textarea
                      type="text"
                      name="agenda"
                      rows={3}
                      cols={2}
                      value={formData.agenda}
                      onChange={handleInputChange}
                      className="w-full outline-none"
                      placeholder="Enter meeting agenda..."
                    />
                  </div>
                </div>
              )}

              <div className="w-full flex items-center justify-between cursor-pointer mx-auto px-3 py-2">
                <div
                  className="flex hover:bg-gray-200 hover:rounded-md p-2 dark:hover:bg-gray-700 group"
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

              <div className="flex justify-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  onClick={handleSubmit}
                >
                  Create Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={blurEffectClass} onClick={() => setActive(false)}></div>
    </div>
  );
};

export default NewMeeting;
