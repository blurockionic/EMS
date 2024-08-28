// File: BigCalendar.js

import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./customCalendarStyles.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import EventModal from "./EventModel";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ meetings }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // Transform meetings data to the format required by the Calendar
  useEffect(() => {
    const transformedEvents = meetings.map((meeting) => ({
      title: meeting.title || "No Title",
      start: new Date(meeting.eventTime),
      end: new Date(meeting.eventTime), // If there's a separate end time, use it; otherwise, the same as start
      id: meeting._id,
      color: meeting.color || "#ffd6ff", // Optional: Add color based on some meeting property
    }));
    setEvents(transformedEvents);
  }, [meetings]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setSelectedEvent(newEvent);
  };

  const handleSaveEvent = (newEvent) => {
    if (selectedEvent.id) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...newEvent } : event
        )
      );
    } else {
      const newEventWithId = { ...newEvent, id: events.length + 1 };
      setEvents((prevEvents) => [...prevEvents, newEventWithId]);
    }
    setSelectedEvent(null);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : (
        <div className="">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            style={{ height: 450 }}
            className="custom-calendar"
            dayLayoutAlgorithm="no-overlap"
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color || "#ffd6ff",
                borderRadius: "5px",
                color: "black",
                fontWeight: "semibold",
              },
            })}
            dayPropGetter={(date) => {
              const dayOfWeek = date.getDay();
              if (dayOfWeek === 6) return { className: "custom-sat" };
              if (dayOfWeek === 0) return { className: "custom-sun" };
            }}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          />
          {/* {selectedEvent && (
            <EventModal
              event={selectedEvent}
              onSave={handleSaveEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )} */}
        </div>
      )}
    </>
  );
};

export default BigCalendar;
