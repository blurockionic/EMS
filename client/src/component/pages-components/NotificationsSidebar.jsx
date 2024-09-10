import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../../Redux/slices/notificationSlice";
import { AiOutlineClose } from "react-icons/ai";

const NotificationsSidebar = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const { notifications, status, error } = useSelector(
    (state) => state.notifications
  );

  // State for managing the active tab
  const [activeTab, setActiveTab] = useState("allNotifications");

  useEffect(() => {
    dispatch(fetchNotifications()); // Fetch notifications on component mount
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  // Sidebar and blur effect CSS classes based on 'active' state
  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-300 ease-in-out ${
    active ? "translate-x-0 w-[20rem]" : "translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;

  return (
    <>
      {/* Blur effect when sidebar is active */}
      <div className={blurEffectClass} onClick={() => setActive(false)}></div>

      {/* Sidebar for Notifications */}
      <div className={sidebarClass}>
        <div className="flex flex-col h-full">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              className="p-2 text-gray-600 hover:text-red-600"
              onClick={() => setActive(false)}
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>

          {/* Tab buttons */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === "allNotifications"
                  ? "border-b-2 border-green-500 font-bold"
                  : "font-semibold text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("allNotifications")}
            >
              All Notifications
            </button>
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === "myNotifications"
                  ? "border-b-2 border-green-500 font-bold"
                  : "font-semibold text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab("myNotifications")}
            >
              My Notifications
            </button>
          </div>

          {/* Notifications List */}
          <div className="p-4 flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500">No notifications available</p>
            ) : (
              notifications
                .filter((notification) =>
                  activeTab === "allNotifications"
                    ? true
                    : notification.isMyNotification
                )
                .map((notification) => (
                  <div
                    key={notification._id}
                    className={`notification-item p-3 mb-2 rounded-lg border ${
                      notification.read ? "bg-gray-100" : "bg-white"
                    }`}
                    onClick={() => handleMarkAsRead(notification._id)}
                  >
                    <p>{notification.message}</p>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsSidebar;
