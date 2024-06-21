import React, { useEffect, useState } from "react";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TimeAgo from "./TimeAgo";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../Redux/slices/taskSlice";
import { GoDotFill } from "react-icons/go";
import { fetchUsers } from "../../Redux/slices/allUserSlice";

const EmpTasksDetails = () => {
  const [taskType, setTaskType] = useState("Open");
  const [openedTasks, setOpenedTasks] = useState([]);
  const [colseTasks, setCloseTasks] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 15; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;

  const currentOpenTasks = openedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const currentCloseTasks = colseTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [FilterButtonActive, setFilterButtonActive] = useState(false);

  const toggleDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterSelect = (status) => {
    setSelectedFilter(status);
    setIsFilterOpen(false);
  };

  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  //  fetching all users

  const { data: users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // console.log("all profiel", users);

  const filteredTasks = tasks.filter((task) => {
    // Find corresponding user by task.assignBy
    const user = users.find((user) => user._id === task.assignBy);

    return user;
  });

  // console.log("Filtered tasks:", filteredTasks);

  useEffect(() => {
    const openTasks = tasks.filter((task) => task.status === "Open");
    const closedTasks = tasks.filter((task) => task.status === "Close");

    setOpenedTasks(openTasks);
    setCloseTasks(closedTasks);
  }, [tasks]);

  const openTasksCount = openedTasks.length;
  const closeTasksCount = colseTasks.length;

  const handleTaskType = (type) => {
    setTaskType(type);
  };

  const navigate = useNavigate();

  const handlerforTaksdetails = (taskId) => {
    // console.log("task details", taskId);
    navigate(`../singleTaksDetails/${taskId}`);
  };
  // filter button for open and close its model
  console.log(tasks);
  return (
    <div>
      <div className="p-3 bg-gray-50 min-h-screen w-[80%] mx-auto">
        {/* <h2 className="text-2xl font-bold text-gray-800">Task Details</h2> */}
        <div className="flex flex-row justify-between items-center border p-1 bg-white shadow-sm rounded-md space-x-4">
          <div className="relative">
            <div
              className={`flex items-center mx-4 px-4 py-2 rounded-md cursor-pointer ${
                FilterButtonActive ? "bg-[#ffffff]" : "bg-slate-200"
              } border`}
              onClick={toggleDropdown}
            >
              <span>Filter</span>
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </div>
            {/* Dropdown menu */}
            {isFilterOpen && (
              <div className="absolute top-full mt-1 w-[10rem] bg-white border rounded-md shadow-lg">
                {[
                  "All",
                  "Confirmed",
                  "In Progress",
                  "Completed",
                  "Not Confirmed",
                ].map((status) => (
                  <div
                    key={status}
                    className={`text-left pl-3 p-2 w-full cursor-pointer hover:bg-slate-100 flex items-center ${
                      selectedFilter === status ? "font-bold bg-slate-200" : ""
                    }`}
                    onClick={() => handleFilterSelect(status)}
                  >
                    <div className="w-7 mr-1">
                      {selectedFilter === status && ""}
                    </div>
                    <div>{status}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center space-x-2 ">
            <div className="relative inline-block">
              <div
                className="flex items-center font-semibold bg-slate-200 px-4 py-1.5 rounded-md shadow-inner mx-1 cursor-pointer"
                // onClick={toggleDropdown}
              >
                <span>Tags</span>
                {isOpen ? (
                  <IoMdArrowDropup className="ml-2 text-xl" />
                ) : (
                  <IoMdArrowDropdown className="ml-2 text-xl" />
                )}
              </div>
              {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-md p-2 flex flex-wrap">
                  {/* Dropdown Content Here */}
                  <ul>
                    <li>Option 1</li>
                    <li>Option 2</li>
                    <li>Option 3</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center font-semibold bg-slate-200 px-4 py-1.5 rounded-md shadow-inner mx-1">
              <span>Status</span>
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </div>
            <div className="flex items-center font-semibold bg-slate-200 px-4 py-1.5 rounded-md shadow-inner mx-1">
              <span>Milestone</span>
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </div>
            {/* <Link to={"../newTask"}>
            <div className="flex items-center font-semibold bg-slate-800 text-white px-4 py-1.5 rounded-md shadow-inner hover:bg-gray-600 cursor-pointer mx-1">
              <IoMdAdd className="mr-2 text-xl" />
              <span>New Task</span>
            </div>
          </Link> */}
          </div>
        </div>

        <div className="flex flex-row justify-between items-center border p-1 bg-white shadow-sm rounded-md space-x-4">
          <div className="flex flex-wrap items-center space-x-2">
            {/* Open tasks button */}
            <div
              className={`flex items-center font-semibold bg-slate-200 px-4 py-1.5 rounded-md shadow-inner cursor-pointer mx-1 ${
                taskType === "Open"
                  ? "font-bold bg-slate-800 text-white border-2 border-slate-200"
                  : ""
              }`}
              onClick={() => handleTaskType("Open")}
            >
              <GoIssueOpened className="text-xl text-green-500" />
              <span
                className={`mx-2 ${taskType === "Open" ? "font-bold" : ""}`}
              >
                {openTasksCount}
              </span>
              <span className={`${taskType === "Open" ? "font-bold" : ""}`}>
                Open
              </span>
            </div>
            {/* Closed tasks button */}
            <div
              className={`flex items-center font-semibold bg-slate-200 px-4 py-1.5 rounded-md shadow-inner cursor-pointer mx-1 ${
                taskType === "Close"
                  ? "font-bold bg-slate-800 text-white border-2 border-slate-200"
                  : ""
              }`}
              onClick={() => handleTaskType("Close")}
            >
              <GoIssueClosed className="text-xl text-purple-500" />
              <span
                className={`mx-2 ${taskType === "Close" ? "font-bold" : ""}`}
              >
                {closeTasksCount}
              </span>
              <span className={`${taskType === "Close" ? "font-bold" : ""}`}>
                Closed
              </span>
            </div>
          </div>
          {/* Pagination component */}
          <div className="flex items-center space-x-2">
            {/* Previous page button */}
            <button
              className={`${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-slate-200 text-gray-800 hover:bg-slate-300"
              } px-3 py-1.5 rounded-md shadow-inner`}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {/* Next page button */}
            <button
              className={`${
                currentOpenTasks.length < itemsPerPage
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-slate-200 text-gray-800 hover:bg-slate-300"
              } px-3 py-1.5 rounded-md shadow-inner`}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentOpenTasks.length < itemsPerPage}
            >
              Next
            </button>
          </div>
        </div>

        {/* Display tasks based on selected task type */}
        {taskType === "Open" && (
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOpenTasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b hover:bg-gray-100 transition duration-150 cursor-pointer h-16"
                  onClick={() => handlerforTaksdetails(task._id)}
                >
                  {/* Task details */}
                  <td className="px-4 py-2 flex ">
                    <GoIssueOpened className="text-xl text-green-500 mx-2" />
                    <div className="flex flex-col">
                      <span className="font-bold text-xl hover:text-blue-700">
                        {task.title}{" "}
                      </span>
                      <div className="flex flex-row ">
                        <span> #{task.taskId} created by </span>
                        <span className="font-semibold mx-2">
                         <span className="capitalize">
                         {
                            users.find((user) => user._id === task.assignBy)
                              ?.role
                          }{" "}
                         </span>
                          {
                            users.find((user) => user._id === task.assignBy)
                              ?.firstName
                          }{" "}
                          {
                            users.find((user) => user._id === task.assignBy)
                              ?.lastName
                          }
                        </span>
                        <span className="mt-1">
                          <GoDotFill />
                        </span>
                        <span>
                          Assigned:{" "}
                          <TimeAgo date={task.createdAt || new Date()} />
                        </span>
                      </div>
                    </div>
                    <span></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {taskType === "Close" && (
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCloseTasks.map((task) => (
                <tr
                  key={task._id}
                  className="border-b hover:bg-gray-100 transition duration-150 cursor-pointer"
                  onClick={() => handlerforTaksdetails(task._id)}
                >
                  {/* Task details */}
                  <td className="px-4 py-2 flex ">
                    <GoIssueOpened className="text-xl text-green-500 mx-2" />
                    <div className="flex flex-col">
                      <span className="font-bold text-xl hover:text-blue-700">
                        {task.title}{" "}
                      </span>
                      <div className="flex flex-row ">
                        <span> #{task.taskId} created by </span>
                        <span className="font-semibold mx-2">
                        <span className="capitalize">
                         {
                            users.find((user) => user._id === task.assignBy)
                              ?.role
                          }{" "}
                         </span>
                          {" "}
                          {
                            users.find((user) => user._id === task.assignBy)
                              ?.firstName
                          }{" "}
                          {
                            users.find((user) => user._id === task.assignBy)
                              ?.lastName
                          }
                        </span>
                        <span className="mt-1">
                          <GoDotFill />
                        </span>
                        <span>
                          Assigned:{" "}
                          <TimeAgo date={task.createdAt || new Date()} />
                        </span>
                      </div>
                    </div>
                    <span></span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmpTasksDetails;
