import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowsAngleContract, BsArrowsAngleExpand, BsThreeDots } from "react-icons/bs";
import { FaRegClock, FaRegUserCircle } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { MdFormatListBulletedAdd, MdKeyboardArrowDown, MdKeyboardArrowUp, MdMoreTime, MdOutlineViewAgenda } from "react-icons/md";
import { PiUsersBold } from "react-icons/pi";

const CompleteMeeting = ({active, setActive, meetingData}) => {
  const [modelSize, setModelSize] = useState("small");
  const [moreRowsShow, setMoreRowsShow] = useState(false);

  
  const toggleModelSize = () => {
    setModelSize((prevSize) => (prevSize === "small" ? "large" : "small"));
  };

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
            Meeting Title
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
                
                  }}
                >
                  {/* <div className="font-bold flex space-x-1 ">
                    <img
                      className="w-6 h-6 rounded-full mr-2"
                      src={
                        profile?.profilePicture ??
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                    />
                    {profile?.firstName ?? "no creator found"}{" "}
                    {profile?.lastName}
                  </div> */}
                 
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
                 
                  }}
                >
                  <div>
                    {
                      "Select attendees"}
                  </div>
                
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <FaRegClock className="text-xl mr-2" />
                  <span className="font-semibold">Create Time</span>
                </div>
                <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                  {/* <div>{new Date(formData.createTime).toLocaleString()}</div> */}
                </div>
              </div>

              <div className="flex flex-row justify-between w-full">
                <div className="flex w-[40%] items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                  <MdMoreTime className="text-xl mr-2" />
                  <span className="font-semibold">Event Time</span>
                </div>
                <div className="relative w-[60%] px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1">
                  
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
                   
                  }}
                >
                  <div>{"Select a type"}</div>
                
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
                      {/* {profile.firstName} {profile.lastName} */}
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
                      {/* {new Date(formData.lastEditTime).toLocaleString()} */}
                    </div>
                  </div>
                </div>
              )}

              {moreRowsShow && (
                <div className="flex flex-row justify-between w-full">
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group w-[40%]">
                    <MdOutlineViewAgenda className="text-xl mr-2" />
                    <span className="font-semibold">Agenda</span>
                  </div>
                  <div
                    className="relative w-[60%] p-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 cursor-pointer group flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                     
                    }}
                  >
                   
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
                //   onClick={handleSubmit}
                >
                 close
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

export default CompleteMeeting;
