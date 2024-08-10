import React from "react";
import { FiUsers } from "react-icons/fi";
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
import CommentBox from "./CommentBox";

const MeetingViewMode = ({ viewMode, meetings }) => {
  // console.log(meetings);

  return (
    <>
      {viewMode === "Gallery" && (
        <div className="grid grid-cols-3 flex-wrap gap-12 p-4 mx-auto">
          {meetings.map((meeting) => (
            <div key={meeting?._id}>
              <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:bg-slate-950">
                <div className="dark:bg-slate-950 p-6 mb-6">
                  <div className="flex items-center">
                    <img
                      className="w-20 h-20 rounded-full mr-6"
                      src={
                        meeting?.profilePicture ??
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                    />
                    <div>
                      <h2 className="text-xl font-bold">
                        <span className="capitalize">{meeting?.firstName}</span>
                        <span className="capitalize ml-1">
                          {meeting?.lastName}
                        </span>
                      </h2>
                      <p>{meeting?.position ?? ""}</p>
                    </div>
                  </div>
                  <div className="flex mt-2 p-3">
                    <p className="text-blue-500 text-base">{meeting?.email}</p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex space-x-2">
                      <span></span>
                      <p>{meeting?.department}</p>
                    </div>
                    <div className="flex space-x-2">
                      <span></span>
                      <p className="capitalize">{meeting?.currentAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        // <div>
        //   <CommentBox/>
        // </div>
      )}
      {viewMode === "Table View" && (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-slate-100">
                <th>
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <span className="font-semibold">Name</span>
                  </div>
                </th>
                <th className=" ">
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <span>
                      <FiUsers />
                    </span>
                    <span> Attendees </span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <FaRegUserCircle className="text-xl mr-2" />
                    <span className="font-semibold">Created By</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <FaRegClock className="text-xl mr-2" />
                    <span className="font-semibold">Create Time</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <MdMoreTime className="text-xl mr-2" />
                    <span className="font-semibold">Event Time</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <MdFormatListBulletedAdd className="text-xl mr-2" />
                    <span className="font-semibold">Type</span>
                  </div>
                </th>

                <th>
                  <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                    <IoMdTimer className="text-xl mr-2" />
                    <span className="font-semibold">Last Edit Time</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <tr key={meeting._id} className="border-b dark:border-gray-600">
                  <td className="py-2 font-bold">
                    <div className="flex items-center px-4 py-1 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <span className="capitalize">{meeting?.title}</span>
                    </div>
                  </td>
                  <td className="py-2">
                    {meeting?.attendees?.map((user, index) => (
                      <span key={index} className="capitalize">
                        {user.firstName} {user.lastName}
                        {index < meeting.attendees.length - 1 && ", "}
                      </span>
                    ))}
                  </td>
                  <td className="py-2">
                    <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <img
                        className="w-6 h-6 rounded-full mr-2"
                        src={
                          meeting.createdBy?.profilePicture ??
                          "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                      />

                      <span className="font-semibold mx-2">
                        {meeting.createdBy.firstName}{" "}
                        {meeting.createdBy.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 flex-1">
                    <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <span >
                        {new Date(meeting?.createTime).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </td>

                  <td className="py-2 flex-1">
                    <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <span >
                        {new Date(meeting.eventTime).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 flex-1">
                    <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <span className="font-semibold">
                        {meeting.type}
                      </span>
                    </div>
                  </td>

                  <td className="py-2 flex-1">
                    <div className="flex items-center px-2 py-0.5 hover:bg-gray-200 hover:rounded-md dark:hover:bg-gray-700 group">
                      <span >
                        {new Date(meeting.lastEditTime).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </td>
               
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MeetingViewMode;
