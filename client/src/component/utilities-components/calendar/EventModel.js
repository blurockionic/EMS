import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import config from "../../../../config/config";

const EventModal = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    start: null,
    end: null,
  });

  // handle for seta the state 
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        start: event.start || null,
        end: event.end || null,
      });
    }
  }, [event]);

  // handle for change the event 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "start" || name === "end" ? new Date(value) : value,
    }));
  };

  //handle for save the event on calender
  const handleSave = async () => {
     
      console.log(formData)
    try {
      const response = await axios.post(
        `${config.apiUrl}/calendarevent/newevent`,
        { formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      if (response.status >= 200 && response.status < 300) {
        const { success, message } = response.data;
        if (success) {
          alert(message);
          console.log("Successfully created Event");
          // Update state or trigger a re-fetch if needed
          // setIsLoadLead(true);
        } else {
          // Handle server response with an unsuccessful status
          console.error("Failed to create Event. Server response:", response.data);
        }
      } else {
        // Handle non-2xx status codes
        console.error("Failed to create Event. Unexpected status:", response.status);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("An error occurred while creating Event:", error);
    }
  };
  





  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      className="z-10 fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-50 backdrop-blur-none"
    >
      <div className="  bg-white rounded-sm w-[24rem] p-2 shadow-lg">
        <div className="flex justify-end p-2 border-b-2" onClick={onClose}>
          <CloseIcon />
        </div>
        <div className="p-2  flex justify-between gap-3">
          <label className="font-semibold">Title:</label>
          <input
            className="outline-none w-full border h-[2rem]"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="p-2 font-semibold">Start:</label>
          <input
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
            type="datetime-local"
            name="end"
            value={formData.end ? formData.end.toISOString().slice(0, -8) : ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-evenly m-3">
          <button className="bg-slate-100 p-2 rounded-full w-[5rem] hover:bg-green-500 hover:font-bold" onClick={handleSave}>Save</button>
          <button className="bg-slate-100 p-2 rounded-full w-[5rem] hover:bg-red-400 hover:font-bold" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
