import React, { useEffect, useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./customCalendarStyles.css";



import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";


const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [events, setEvents] = useState([]);

  // Fetching all orders for the calendar
  // useEffect(() => {
  //   const fetchAllBistarOrder = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`${config.apiUrl}/order/all`, {
  //         withCredentials: true,
  //       });

  //       // Extract relevant data from the response
  //       const { data } = response.data;

  //       // Define an array of predefined colors
  //       const predefinedColors = [
  //         "#FFB6C1", // Light Pink
  //         "#FFDAB9", // Peach Puff

  //         "#C8B6FF", // Lavender
  //         "#caf0f8", // Baby Blue
  //         "#ffeedd", // Beige
  //         "#ADD8E8", // Light Blue
  //         "#c9e4ca", // Tea Green
  //         "#f5ebe0", // Almond
  //         "#ffd6ff", // Light Lavender
  //         "#c5c3c6", // Lavender Gray
  //         "#fcd5ce", // Pastel Red
  //         "#d5cad6", // Lilac Luster
  //       ];

  //       // Function to generate lighter shades of a color
  //       const lightenColor = (color, percent) => {
  //         let num = parseInt(color.slice(1), 16);
  //         let amt = Math.round(2.55 * percent);
  //         let R = (num >> 16) + amt;
  //         let G = ((num >> 8) & 0x00ff) + amt;
  //         let B = (num & 0x0000ff) + amt;
  //         R = R < 255 ? (R < 1 ? 0 : R) : 255;
  //         G = G < 255 ? (G < 1 ? 0 : G) : 255;
  //         B = B < 255 ? (B < 1 ? 0 : B) : 255;
  //         let newColor = `#${(R << 16) | (G << 8) | B}`;
  //         return newColor;
  //       };

  //       // Map the customer data to events format
  //       const eventDetails = data.map((customer, index) => {
  //         const customerName = customer.customerName || `Customer ${index + 1}`;
  //         // Parse the dateAndTime string to create Date objects
  //         const startDate = new Date(customer.dateAndTime);
  //         const endDate = new Date(customer.dateAndTime);
  //         endDate.setHours(endDate.getHours() + 3);

  //         return {
  //           id: customer._id, // Assuming _id is unique
  //           title: <>{customerName}</>,

  //           start: startDate,
  //           end: endDate,
  //           customerData: customer, // Optionally, you can store the entire customer data for future reference

  //           // color: predefinedColors[index % predefinedColors.length], // Assign colors from the predefined array
  //           // color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate random color for each event
  //           color: lightenColor(
  //             predefinedColors[index % predefinedColors.length],
  //             30
  //           ), // Lighten the predefined colors
  //         };
  //       });

  //       setEvents(eventDetails);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //       setIsLoading(false);
  //     }
  //   };

  //   // Fetch orders when component mounts
  //   fetchAllBistarOrder();
  // }, []);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSelectEvent = (event) => {
    // Construct the path for the order details page
    const orderDetailsPath = `../orderdetails/${event.customerData?._id}`;
    // Navigate to the order details page
    navigate(orderDetailsPath);
  };

  const handleSelectSlot = (slotInfo) => {
    const newEvent = {
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
    };
    setSelectedEvent(newEvent); // Set selectedEvent when a slot is selected
  };

  const handleSaveEvent = (newEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id ? { ...event, ...newEvent } : event
        )
      );
    } else {
      // Add new event
      const newEventWithId = { ...newEvent, id: events.length + 1 };
      setEvents((prevEvents) => [...prevEvents, newEventWithId]);
    }

    setSelectedEvent(null);
  };

  console.log("event sed ho raha h ki nii ", events);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : (
        <div className=" mx-4">
          <div className=""></div>
          <div className="mt-2">
         
              <Link to={"../order"}>
                <span
                  className={`px-3 py-1.5 m-1 rounded-md font-semibold bg-gray-200 cursor-pointer hover:bg-gray-100 `}
                >
                  Back
                </span>
              </Link>
         
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              style={{ height: 580 }}
              className="custom-calendar" // Apply custom CSS class to the calendar component
              dayLayoutAlgorithm="no-overlap" // Ensure each day is rendered individually without overlapping with others
              eventPropGetter={(event, start, end, isSelected) => ({
                style: {
                  backgroundColor: event.color || "#ffd6ff", // Custom background color or default color
                  borderRadius: "5px", // Custom border radius
                  color: "black", // Custom text color
                  fontWeight: "semibold", // semiBold text
                },
              })}
              dayPropGetter={(date) => {
                // Check if the date is Saturday or Sunday
                const dayOfWeek = date.getDay();
                if (dayOfWeek === 6) {
                  return {
                    className: "custom-sat", // Add custom class for Saturday
                  };
                }
                if (dayOfWeek === 0) {
                  return {
                    className: "custom-sun", // Add custom class for Sunday
                  };
                }
              }}
              onSelectSlot={handleSelectSlot}
              onSelectEvent={(event) => handleSelectEvent(event)} // Pass the event object
            />
            {/* {showModal && (
      <EventModal
        event={selectedEvent}
        date={selectedDate}
        onSave={handleSaveEvent}
        onClose={() => setShowModal(false)}
      />
    )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default BigCalendar;
