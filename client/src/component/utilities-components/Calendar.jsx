// src/components/Calendar.js

import { useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "tailwindcss/tailwind.css";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() - 1,
        1
      );
      return prevMonthDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth() + 1,
        1
      );
      return nextMonthDate;
    });
  };

  const formattedDate = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const daysInMonth = getDaysInMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDaysArray = Array.from(
    { length: new Date(year, month - 1, 1).getDay() },
    (_, i) => i
  );

  return (
    <div className="container mx-auto mt-4 p-4 w-96 border-2 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {formattedDate}
        </h2>
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            onClick={prevMonth}
          >
            <MdArrowBackIos className="text-black dark:text-white" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
            onClick={nextMonth}
          >
            <MdArrowForwardIos className="text-black dark:text-white" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-sm">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="text-center font-bold text-gray-900 dark:text-gray-300"
          >
            {day}
          </div>
        ))}
        {emptyDaysArray.map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}
        {daysArray.map((day) => (
          <div
            key={day}
            className={`text-center p-2 relative cursor-pointer transition-colors duration-300 ease-in-out ${
              year === selectedDate.getFullYear() &&
              month === selectedDate.getMonth() + 1 &&
              day === selectedDate.getDate()
                ? "bg-purple-500 text-white rounded-full"
                : "text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
            }`}
            onClick={() => setSelectedDate(new Date(year, month - 1, day))}
          >
            <span className="font-semibold">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
