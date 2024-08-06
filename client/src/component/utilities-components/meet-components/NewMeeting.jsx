import React, { useState } from "react";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import {
  BsArrowsAngleContract,
  BsArrowsAngleExpand,
  BsThreeDots,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { PiUsersBold } from "react-icons/pi";

const userlist = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
];

const NewMeeting = ({ active, setActive }) => {
  const [modelSize, setModelSize] = useState("small");
  const [dropDownMenu, setDropDownMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [meetingData, setMeetingData] = useState({
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

  const toggleModelSize = () => {
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeetingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Meeting data to save:", meetingData);
  };

  const selectDropDownHandler = (menu) => {
    setDropDownMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  const handleDropDownSelect = (field, value) => {
    if (field === "attendees") {
      setMeetingData((prevData) => ({
        ...prevData,
        attendees: prevData.attendees.includes(value)
          ? prevData.attendees.filter((attendee) => attendee !== value)
          : [...prevData.attendees, value],
      }));
    } else {
      setMeetingData((prevData) => ({ ...prevData, [field]: value }));
    }
    setDropDownMenu(null);
  };

  const filteredUserlist = userlist.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="w-[90%] mx-auto">
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
                  value={meetingData.title}
                  onChange={handleInputChange}
                  className="outline-none border-b border-gray-300 focus:border-blue-500 focus:ring-0"
                  placeholder="Untitled"
                />
              </h1>
            </div>

            <div className="flex flex-col space-y-4 w-[30rem]">
              <Field
                label="Created By"
                icon={<PiUsersBold className="text-xl mr-2" />}
                value={meetingData.createdBy || "Select creator"}
                onClick={() => selectDropDownHandler("createdBy")}
                dropDownMenu={dropDownMenu}
                field="createdBy"
                handleDropDownSelect={handleDropDownSelect}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredUserlist={filteredUserlist}
              />

              <Field
                label="Attendees"
                icon={<PiUsersBold className="text-xl mr-2" />}
                value={
                  meetingData.attendees.length > 0
                    ? meetingData.attendees.join(", ")
                    : "Select attendees"
                }
                onClick={() => selectDropDownHandler("attendees")}
                dropDownMenu={dropDownMenu}
                field="attendees"
                handleDropDownSelect={handleDropDownSelect}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredUserlist={filteredUserlist}
              />

              <Field
                label="Create Time"
                icon={<PiUsersBold className="text-xl mr-2" />}
                value={meetingData.createTime || "Select Create Time"}
                onClick={() => selectDropDownHandler("createTime")}
                dropDownMenu={dropDownMenu}
                field="createTime"
                handleDropDownSelect={handleDropDownSelect}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredUserlist={filteredUserlist}
              />

              {moreRowsShow && (
                <>
                  <Field
                    label="Event Time"
                    icon={<PiUsersBold className="text-xl mr-2" />}
                    value={meetingData.eventTime || "Select Event Time"}
                    onClick={() => selectDropDownHandler("eventTime")}
                    dropDownMenu={dropDownMenu}
                    field="eventTime"
                    handleDropDownSelect={handleDropDownSelect}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filteredUserlist={filteredUserlist}
                  />

                  <Field
                    label="Last Edit By"
                    icon={<PiUsersBold className="text-xl mr-2" />}
                    value={meetingData.lastEditBy || "Select Last Editor"}
                    onClick={() => selectDropDownHandler("lastEditBy")}
                    dropDownMenu={dropDownMenu}
                    field="lastEditBy"
                    handleDropDownSelect={handleDropDownSelect}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filteredUserlist={filteredUserlist}
                  />

                  <Field
                    label="Last Edit Time"
                    icon={<PiUsersBold className="text-xl mr-2" />}
                    value={meetingData.lastEditTime || "Select Last Edit Time"}
                    onClick={() => selectDropDownHandler("lastEditTime")}
                    dropDownMenu={dropDownMenu}
                    field="lastEditTime"
                    handleDropDownSelect={handleDropDownSelect}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filteredUserlist={filteredUserlist}
                  />

                  <Field
                    label="Type"
                    icon={<PiUsersBold className="text-xl mr-2" />}
                    value={meetingData.type || "Select Type"}
                    onClick={() => selectDropDownHandler("type")}
                    dropDownMenu={dropDownMenu}
                    field="type"
                    handleDropDownSelect={handleDropDownSelect}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filteredUserlist={filteredUserlist}
                    options={[
                      { id: "type1", name: "Type 1" },
                      { id: "type2", name: "Type 2" },
                    ]}
                  />
                </>
              )}
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setMoreRowsShow((prev) => !prev)}
                className="text-blue-500 hover:underline flex items-center"
              >
                {moreRowsShow ? (
                  <>
                    <MdKeyboardArrowUp className="mr-1" /> Hide 4 Properties
                  </>
                ) : (
                  <>
                    <MdKeyboardArrowDown className="mr-1" /> Show 4 More
                    Properties
                  </>
                )}
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={blurEffectClass} onClick={() => setActive(false)}></div>
    </div>
  );
};


const Field = ({
  label,
  icon,
  value,
  onClick,
  dropDownMenu,
  field,
  handleDropDownSelect,
  searchTerm,
  setSearchTerm,
  filteredUserlist,
  options,
}) => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-center w-[42%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <div className="relative w-[70%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group">
        <div onClick={onClick}>{value}</div>
        {dropDownMenu === field && (
          <div className="absolute z-50 bg-white dark:bg-slate-700 w-full top-0 left-0 mt-2 shadow-lg rounded-md">
            {options ? (
              options.map((option) => (
                <div
                  key={option.id}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleDropDownSelect(field, option.name)}
                >
                  {option.name}
                </div>
              ))
            ) : (
              <>
                <input
                  type="search"
                  className="w-full p-2 border-b"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="max-h-60 overflow-y-auto">
                  {filteredUserlist.map((user) => (
                    <div
                      key={user.id}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                      onClick={() => handleDropDownSelect(field, user.name)}
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewMeeting;
