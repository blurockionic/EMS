import React, { useEffect, useState } from "react";
import {
  MdOutlineCalendarMonth,
  MdTimer,
  MdClose,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { createEvent, fetchEvents } from "../../Redux/slices/eventSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import "../utilities-components/CalendarStyles.css"; // Custom styles
import { fetchProfile } from "../../Redux/slices/profileSlice";
import { IoCalendarNumberOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import Loader from "../utilities-components/Loader";

const MyEvents = () => {
  const dispatch = useDispatch();

  // State management
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Redux selectors
  const { data: users } = useSelector((state) => state.user);
  const { data: profile } = useSelector((state) => state.profile);
  const events = useSelector((state) => state.events.events);

  const eventStatus = useSelector((state) => state.events.status);

  const [activeTab, setActiveTab] = useState("events"); // State to track active tab

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Close menu
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchEvents());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Form submission handler
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const eventData = {
        createdBy: profile._id,
        eventTitle,
        eventDescription,
        eventType,
        eventDate,
        startTime,
        endTime,
        people: selectedMembers.map((member) => member._id),
      };
      console.log(eventData);

      const response = await dispatch(createEvent(eventData));

      if (response?.payload?.success) {
        toast.success(response.payload.message);
        // Reset form
        setEventTitle("");
        setEventDescription("");
        setEventType("");
        setEventDate(null);
        setStartTime("");
        setEndTime("");
        setSelectedMembers([]);
        setIsFormVisible(false);

        dispatch(fetchEvents());
      }
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  // Toggle form visibility
  const toggleFormModal = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Filter events based on user role
  const filteredEvents = events?.filter((event) => {
    if (profile.role === "admin") {
      return true;
    } else if (profile.role === "manager") {
      return (
        event.createdBy === profile._id ||
        (Array.isArray(event.people) &&
          event.people.some((person) => person._id === profile._id))
      );
    } else if (profile.role === "employee") {
      return (
        Array.isArray(event.people) &&
        event.people.some((person) => person._id === profile._id)
      );
    }
    return false;
  });

  return (
    <>
    {
      eventStatus === "loading" && ( <Loader/> )
    }
      <div className="w-[90%] mx-auto mt-2">
        <h1 className="text-4xl font-bold p-2">Events</h1>
        <nav className="flex flex-row justify-between items-center p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Tab Navigation */}
          <div className="flex flex-row space-x-4 border-b-2 border-transparent dark:border-transparent">
            <button
              className={`py-2 px-4 font-semibold ${
                activeTab === "events"
                  ? "border-b-2 border-green-500 "
                  : "text-gray-500 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("events")}
            >
              Events
            </button>
            <button
              className={`py-2 px-4 font-semibold ${
                activeTab === "other"
                  ? "border-b-2 border-green-500 "
                  : "text-gray-500 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("other")}
            >
              Other
            </button>
          </div>

          <div className="flex flex-row items-center space-x-2">
            <div>
              <div className="relative">
                <span
                  className="p-0.5 cursor-pointer text-gray-500 dark:text-gray-300"
                  onClick={toggleMenu}
                >
                  <BsThreeDots className="text-xl" />
                </span>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10">
                    <ul>
                      <li
                        onClick={() => {
                          setActiveTab("history");
                          closeMenu();
                        }}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <IoMdClose className="text-xl mr-2" />
                        <span>History</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {(profile.role === "manager" || profile.role === "admin") && (
              <div
                onClick={toggleFormModal}
                className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded-md shadow-md cursor-pointer transition-colors"
              >
                <IoMdAdd className="text-lg mr-1" />
                <span>New</span>
              </div>
            )}
          </div>
        </nav>

        {/* <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Calendar />
        </div> */}

        {activeTab === "events" && (
          <>
            {filteredEvents?.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event._id} className="border-2 mt-2 rounded-lg mb-6">
                  <div className="p-2 flex flex-wrap flex-col">
                    <h3 className="font-bold text-xl">{event.eventTitle}</h3>
                    <p>{event.eventDescription}</p>
                    <p>
                      <strong>Type:</strong> {event.eventType}
                    </p>

                    <div className="flex flex-row space-x-16">
                      <div className="flex space-x-2">
                        <span>
                          <MdOutlineCalendarMonth className="text-lg mt-1" />
                        </span>
                        <span>
                          {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <span>
                          <MdTimer className="text-lg mt-1" />
                        </span>
                        <span>{event.startTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap">
                      {event.people.slice(0, 5).map((person) => (
                        <div key={person._id} className="flex items-center">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={
                              person?.profilePicture ??
                              "https://via.placeholder.com/20"
                            }
                            alt="Profile"
                          />
                        </div>
                      ))}
                      {event.people.length > 5 && (
                        <div className="flex items-center ml-2">
                          <span>+{event.people.length - 5}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </>
        )}

        {activeTab === "history" && (
          <>
            {(profile.role === "manager" || profile.role === "admin") && (
              <>
                {events?.length > 0 ? (
                  events.map((event) => (
                    <div
                      key={event._id}
                      className="border-2 mt-2 rounded-lg mb-6"
                    >
                      <div className="p-2 flex flex-wrap flex-col">
                        <h3 className="font-bold text-xl">
                          {event.eventTitle}
                        </h3>
                        <p>{event.eventDescription}</p>
                        <p>
                          <strong>Type:</strong> {event.eventType}
                        </p>

                        <div className="flex flex-row space-x-16">
                          <div className="flex space-x-2">
                            <span>
                              <MdOutlineCalendarMonth className="text-lg mt-1" />
                            </span>
                            <span>
                              {new Date(event.eventDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex space-x-1">
                            <span>
                              <MdTimer className="text-lg mt-1" />
                            </span>
                            <span>{event.startTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap">
                          {event.people.slice(0, 5).map((person) => (
                            <div key={person._id} className="flex items-center">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={
                                  person?.profilePicture ??
                                  "https://via.placeholder.com/20"
                                }
                                alt="Profile"
                              />
                            </div>
                          ))}
                          {event.people.length > 5 && (
                            <div className="flex items-center ml-2">
                              <span>+{event.people.length - 5}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No events found.</p>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {isFormVisible &&
        (profile.role === "manager" || profile.role === "admin") && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative w-[90%] md:w-[70%] lg:w-[50%] bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mx-auto my-auto">
              <button
                onClick={toggleFormModal}
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
              >
                <MdClose className="text-2xl hover:text-red-600" />
              </button>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block mb-2 dark:text-white">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Event title"
                      className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <label className="block mb-2 dark:text-white">
                      Event Description
                    </label>
                    <textarea
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Event description"
                      className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <label className="block mb-2 dark:text-white">
                      Event Type
                    </label>
                    <input
                      type="text"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      placeholder="e.g., Presentation, Meeting"
                      className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />

                    <label className="block mb-2 dark:text-white">
                      Add People
                    </label>
                    <Select
                      value={selectedMembers}
                      onChange={setSelectedMembers}
                      isMulti
                      options={users}
                      getOptionLabel={(option) =>
                        `${option.firstName} ${option.lastName}`
                      }
                      getOptionValue={(option) => option._id}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>

                  <div className="flex-none w-full md:w-1/4 flex flex-col gap-4">
                    <div className="relative border-b pb-4">
                      <div className="flex justify-between items-center text-gray-600 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 font-bold">
                        Event Date
                        <IoCalendarNumberOutline
                          className="text-xl cursor-pointer"
                          onClick={() => setShowDatePicker(!showDatePicker)}
                        />
                      </div>

                      {showDatePicker && (
                        <DatePicker
                          selected={eventDate}
                          onChange={(date) => {
                            setEventDate(date);
                            setShowDatePicker(false); // Optionally hide the picker after selecting a date
                          }}
                          className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          dateFormat="MMMM d, yyyy"
                          inline // Optional: Show calendar inline
                        />
                      )}

                      <div className="text-gray-700 dark:text-gray-400">
                        {eventDate ? (
                          <span className="text-gray-500 dark:text-white text-sm font-semibold">
                            {eventDate.toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="text-gray-500 dark:text-white text-sm">
                            None yet
                          </span>
                        )}
                      </div>

                      <div className="">
                        <label className="block mb-2 dark:text-white">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>

                      <div className="">
                        <label className="block mb-2 dark:text-white">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      <ToastContainer />
    </>
  );
};

export default MyEvents;
