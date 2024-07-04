import React, { useState } from "react";
import Calendar from "./Calendar";
import {
  MdAdd,
  MdOutlineCalendarMonth,
  MdTimer,
  MdClose,
} from "react-icons/md";

const MyEvents = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [people, setPeople] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Handle form data submission
      const eventData = {
        eventTitle,
        eventDate,
        startTime,
        endTime,
        people,
      };
      console.log("Event Data:", eventData);

      // Reset form state
      setEventTitle("");
      setEventDate("");
      setStartTime("");
      setEndTime("");
      setPeople("");

      // Update state or notify user of success
      setIsFormVisible(false); // Close the form modal after submission
    } catch (error) {
      console.error("Error adding event: ", error);
      // Handle error state or notify user
    }
  };

  return (
    <>
      <div className="flex flex-col justify-end mr-4">
        <div>
          <Calendar />
        </div>

        <div className="border-2 mt-2 rounded-lg">
          <div className="p-2 flex flex-row justify-between">
            <h3 className="font-bold">Events</h3>
            <button
              className="bg-purple-500 text-white py-1 px-2 rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setIsFormVisible(true)}
            >
              <MdAdd />
            </button>
          </div>
        </div>

        <div className="border-2 mt-2 rounded-lg mb-6">
          <div className="p-2 flex flex-wrap flex-col">
            <h3 className="font-bold text-xl">Events tile</h3>
            <p>description small (10 words)</p>
            <div className="flex flex-row space-x-16">
              <div className="flex space-x-2">
                <span>
                  <MdOutlineCalendarMonth className="text-lg mt-1" />
                </span>
                <span>26/07/2024</span>
              </div>
              <div className="flex space-x-1">
                <span>
                  <MdTimer className="text-lg mt-1" />
                </span>
                <span>10:30 AM </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-11/12 max-w-md">
            <div className="flex justify-end">
              <button
                onClick={() => setIsFormVisible(false)}
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
              <input
                type="text"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
    </>
  );
};

export default MyEvents;
