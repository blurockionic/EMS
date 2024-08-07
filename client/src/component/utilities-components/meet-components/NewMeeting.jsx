import React, { useEffect, useState } from "react";
import {
  MdKeyboardArrowUp,
  MdKeyboardArrowDown,
  MdMoreTime,
  MdFormatListBulletedAdd,
} from "react-icons/md";
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsThreeDots,
} from "react-icons/bs";
import { FaRegUserCircle, FaRegClock } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdTimer } from "react-icons/io";
import { PiUsersBold } from "react-icons/pi";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import {
  fetchMeetings,
  createMeeting,
  updateMeeting,
} from "../../../Redux/slices/meetingSlice";
import { useDispatch, useSelector } from "react-redux";

const NewMeeting = ({ active, setActive, meetingData = null }) => {
  const [modelSize, setModelSize] = useState("small");
  const [dropDownMenu, setDropDownMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    createdBy: "",
    attendees: [],
    createTime: "",
    eventTime: "",
    lastEditBy: "",
    lastEditTime: "",
    type: "",
  });
  const [moreRowsShow, setMoreRowsShow] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);
  const { data: users } = useSelector((state) => state.user);
  const meetings = useSelector((state) => state.meetings.data);
console.log(meetings);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProfile());
    dispatch(fetchMeetings());
  }, [dispatch]);

  useEffect(() => {
    if (active) {
      if (meetingData) {
        setFormData({
          ...meetingData,
          lastEditBy: profile._id,
          lastEditTime: new Date().toISOString(),
        });
      } else {
        setFormData({
          title: "",
          createdBy: profile._id,
          attendees: [],
          createTime: new Date().toISOString(),
          eventTime: "",
          lastEditBy: profile._id,
          lastEditTime: new Date().toISOString(),
          type: "",
        });
      }
    }
  }, [active, meetingData, profile]);

  const toggleModelSize = () => {
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("befor sumit ",formData);
    
    
    if (meetingData) {
      dispatch(updateMeeting({ id: meetingData._id, meeting: formData }));
    } else {
      dispatch(createMeeting(formData));
    }
    setActive(false);
  };

  const selectDropDownHandler = (menu) => {
    setDropDownMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleDropDownSelect = (field, value, e) => {
    e.stopPropagation();
    setFormData((prevData) => {
      if (field === "attendees") {
        return {
          ...prevData,
          attendees: prevData.attendees.includes(value)
            ? prevData.attendees.filter((attendee) => attendee !== value)
            : [...prevData.attendees, value],
        };
      } else {
        return { ...prevData, [field]: value };
      }
    });
    setDropDownMenu(null);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sidebarClass = `dark:bg-slate-900 bg-white z-50 h-full fixed top-0 right-0 transition-transform duration-500 ${
    active
      ? modelSize === "large"
        ? "translate-x-0 w-full"
        : "translate-x-0 w-[40rem]"
      : "translate-x-full"
  }`;

  const blurEffectClass = `z-40 inset-0 bg-gray-900 opacity-50 transition-all ease-in-out duration-200 ${
    active ? "fixed w-full h-full" : "hidden"
  }`;

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
                  <div>
                    {profile.firstName} {profile.lastName}
                  </div>
                  {dropDownMenu === "createdBy" && (
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
                              handleDropDownSelect("createdBy", user._id, e)
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
                  <div>
                    {formData.attendees.length > 0
                      ? formData.attendees
                          .map((attendee) => {
                            const user = users.find(
                              (user) => user._id === attendee
                            );
                            return user
                              ? `${user.firstName} ${user.lastName}`
                              : "";
                          })
                          .join(", ")
                      : "Select attendees"}
                  </div>
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
                          handleDropDownSelect("type", "in-person", e)
                        }
                      >
                        In-Person
                      </div>
                      <div
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={(e) =>
                          handleDropDownSelect("type", "online", e)
                        }
                      >
                        Online
                      </div>
                      <div
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={(e) =>
                          handleDropDownSelect("type", "hybrid", e)
                        }
                      >
                        Hybrid
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
                  {meetingData ? "Update Meeting" : "Create Meeting"}
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
