import React, { useEffect, useState } from "react";
// import Calendar from "./Calendar";
import {
  MdAdd,
  MdOutlineCalendarMonth,
  MdTimer,
  MdClose,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  createEvent,
  fetchEvents,
  fetchEventsForUser,
} from "../../Redux/slices/eventSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { ToastContainer, toast } from "react-toastify";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './CalendarStyles.css'; // Custom styles

const MyEvents = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { data: users } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const eventStatus = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    dispatch(fetchEventsForUser());
    dispatch(fetchEvents());
    dispatch(fetchUsers());
  }, [dispatch]);

  // create new event handler for each event
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const eventData = {
        eventTitle,
        eventDate,
        startTime,
        endTime,
        people: selectedMembers.map((member) => member._id), // Assuming selectedMembers has _id field
      };
      console.log(eventData);

      const response = await dispatch(createEvent(eventData)); // Dispatch the action and await the response

      if (response?.payload?.success === true) {
        toast.success(response?.payload?.message); // Show success toast notification
      }

      // Reset form state
      setEventTitle("");
      setEventDate("");
      setStartTime("");
      setEndTime("");
      setSelectedMembers([]);

      // Close the form modal after submission
      setIsFormVisible(false);
    } catch (error) {
      console.error("Error adding event: ", error);
      // Handle error state or notify user
    }
  };

  const toggleFormModal = () => {
    setIsFormVisible(!isFormVisible);
  };

  const { events, event, userEvents, status } = useSelector(
    (state) => state.events
  );
  const [newEvent, setNewEvent] = useState({ title: "", description: "" });

  console.log("new event: ", events.events);
  // Fetch all events
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Fetch event by ID (example ID used: 'exampleId123')
  useEffect(() => {
    const exampleId = "exampleId123"; // Replace with actual ID or use a variable
    // dispatch(fetchEventById(exampleId));
  }, [dispatch]);

  // Fetch events for a specific user (example user ID used: 'exampleUserId123')
  useEffect(() => {
    const exampleUserId = "exampleUserId123"; // Replace with actual user ID or use a variable
    // dispatch(fetchEventsForUser(exampleUserId));
  }, [dispatch]);

  // Update an existing event (example ID used: 'exampleIdToUpdate123')
  const handleUpdateEvent = () => {
    const exampleIdToUpdate = "exampleIdToUpdate123"; // Replace with actual ID or use a variable
    // dispatch(updateEvent({ id: exampleIdToUpdate, event: newEvent }));
    // Optional: Reset form or state after update
    setNewEvent({ title: "", description: "" });
  };

  // Delete an event by ID (example ID used: 'exampleIdToDelete123')
  const handleDeleteEvent = () => {
    // const exampleIdToDelete = 'exampleIdToDelete123'; // Replace with actual ID or use a variable
    // dispatch(deleteEvent(exampleIdToDelete));
  };

  return (
    <>
      <div className="flex flex-col justify-end mr-4">
      <div className="p-4 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Calendar />
    </div>

        <div className="border-2 mt-2 rounded-lg">
          <div className="p-2 flex flex-row justify-between">
            <h3 className="font-bold">Events</h3>
            <button
              className="bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={toggleFormModal}
            >
              <MdAdd />
            </button>
          </div>
        </div>

        {events?.events?.length > 0 &&
          events?.events?.map((event) => (
            <div key={event._id} className="border-2 mt-2 rounded-lg mb-6">
              <div className="p-2 flex flex-wrap flex-col">
                <h3 className="font-bold text-xl">{event.eventTitle}</h3>

                <div className="flex flex-row space-x-16">
                  <div className="flex space-x-2">
                    <span>
                      <MdOutlineCalendarMonth className="text-lg mt-1" />
                    </span>
                    <span>
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                    {/* <span>
                
                      {event.endTime - event.startTime}
                    </span> */}
                  </div>
                  <div className="flex space-x-1">
                    <span>
                      <MdTimer className="text-lg mt-1" />
                    </span>
                    <span>{event.startTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap">
                  {event.people.slice(0, 5).map((person, index) => (
                    <div key={person._id} className="flex items-center">
                      <img
                        className={`w-8 h-8 rounded-full ${
                          index !== 0 ? "" : ""
                        }`}
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
          ))}
      </div>

      {/* Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-11/12 max-w-md">
            <div className="flex justify-end">
              <button
                onClick={toggleFormModal}
                className="text-gray-700 dark:text-gray-300"
              >
                <MdClose className="text-2xl hover:text-red-600" />
              </button>
            </div>

            <div className="p-4">
              <label className="block mb-2 dark:text-white">Event Title</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Add event title, like 'Running'"
                className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <label className="block mb-2 dark:text-white">Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              <div className="flex justify-between">
                <div>
                  <label className="block mb-2 dark:text-white">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block mb-2 dark:text-white">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <label className="block mb-2 dark:text-white">Add People</label>
              <Select
                value={selectedMembers}
                onChange={setSelectedMembers}
                isMulti
                options={users} // Assuming users array is correctly fetched from Redux store
                getOptionLabel={(option) =>
                  `${option.firstName} ${option.lastName}`
                }
                getOptionValue={(option) => option._id} // Assuming _id is the unique identifier for each user
                className="basic-multi-select"
                classNamePrefix="select"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isFocused ? "#4B5563" : "#CBD5E0",
                    borderColor: "#4B5563",
                    borderRadius: "4px",
                    minHeight: "40px",
                    boxShadow: state.isFocused ? "0 0 0 1px #4B5563" : null,
                    "&:hover": {
                      borderColor: state.isFocused ? "#4B5563" : "#CBD5E0",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    backgroundColor: "#1A202C",
                    color: "#E2E8F0",
                    borderRadius: "4px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? "#2D3748"
                      : state.isFocused
                      ? "#4A5568"
                      : null,
                    color: state.isSelected
                      ? "#E2E8F0"
                      : state.isFocused
                      ? "#E2E8F0"
                      : "#CBD5E0",
                    "&:hover": {
                      backgroundColor: state.isSelected
                        ? "#2D3748"
                        : state.isFocused
                        ? "#4A5568"
                        : null,
                      color: state.isSelected
                        ? "#E2E8F0"
                        : state.isFocused
                        ? "#E2E8F0"
                        : "#CBD5E0",
                    },
                  }),
                }}
              />
              <button
                type="button"
                onClick={handleFormSubmit}
                className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MyEvents;
