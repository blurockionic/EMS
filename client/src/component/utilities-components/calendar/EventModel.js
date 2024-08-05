// File: EventModal.js
import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const EventModal = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    start: null,
    end: null,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        start: event.start || null,
        end: event.end || null,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "start" || name === "end" ? new Date(value) : value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div
      isOpen={true}
      onRequestClose={onClose}
      className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-none"
    >
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-sm w-[24rem] p-2 shadow-lg">
        <div
          className="flex justify-end p-2 border-b-2 dark:border-gray-700"
          onClick={onClose}
        >
          <IoClose />
        </div>
        <div className="p-2 flex justify-between gap-3">
          <label className="font-semibold">Title:</label>
          <input
            className="outline-none w-full border h-[2rem] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="p-2 font-semibold">Start:</label>
          <input
            className="outline-none w-full border h-[2rem] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            type="datetime-local"
            name="start"
            value={
              formData.start ? formData.start.toISOString().slice(0, -8) : ""
            }
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="p-2 font-semibold">End:</label>
          <input
            className="outline-none w-full border h-[2rem] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            type="datetime-local"
            name="end"
            value={formData.end ? formData.end.toISOString().slice(0, -8) : ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-evenly m-3">
          <button
            className="bg-slate-100 dark:bg-gray-600 dark:text-white p-2 rounded-full w-[5rem] hover:bg-green-500 dark:hover:bg-green-600 hover:font-bold"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-slate-100 dark:bg-gray-600 dark:text-white p-2 rounded-full w-[5rem] hover:bg-red-400 dark:hover:bg-red-500 hover:font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
