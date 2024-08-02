import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../../Redux/slices/taskSlice";
import TimeAgo from "../../../component/utilities-components/TimeAgo";
import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown, IoMdAdd } from "react-icons/io";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import { fetchTags } from "../../../Redux/slices/tagSlice";

const AllTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskType, setTaskType] = useState("Open");
  const [openedTasks, setOpenedTasks] = useState([]);
  const [closedTasks, setCloseTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;

  const currentOpenTasks = openedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const currentCloseTasks = closedTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [FilterButtonActive, setFilterButtonActive] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const { data: users, status } = useSelector((state) => state.user);
  const { tags } = useSelector((state) => state.tags);

  const [activeTab, setActiveTab] = useState("All Task");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterSelect = (status) => {
    setSelectedFilter(status);
    setIsFilterOpen(false);
  };

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const openTasks = tasks.filter((task) => task.status === "Open");
    const closedTasks = tasks.filter((task) => task.status === "Close");

    setOpenedTasks(openTasks);
    setCloseTasks(closedTasks);
  }, [tasks]);

  const handleTaskType = (type) => {
    setTaskType(type);
  };

  const handlerforTaksdetails = (taskId) => {
    navigate(`../singleTaksDetails/${taskId}`);
  };
  console.log(tasks);
  const renderTasks = (tasks) => (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map((task) => (
          <tr
            key={task._id}
            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 cursor-pointer h-16"
            onClick={() => handlerforTaksdetails(task._id)}
          >
            <td className="px-4 py-2 flex flex-col md:flex-row flex-grow-4">
              <GoIssueOpened className="text-2xl text-green-500 mx-2 mt-2" />
              <div className="flex flex-col">
                <span className="font-bold text-xl hover:text-blue-700 dark:hover:text-blue-500">
                  {task.title}
                </span>
                <div className="flex flex-col md:flex-row">
                  <span> #{task.taskId} created by </span>
                  <span className="font-semibold mx-2">
                    {
                      users.find((user) => user._id === task.assignBy)
                        ?.firstName
                    }{" "}
                    {users.find((user) => user._id === task.assignBy)?.lastName}
                  </span>
                  <span className="mt-1">
                    <GoDotFill />
                  </span>
                  <span>
                    Assigned: <TimeAgo date={task.createdAt || new Date()} />
                  </span>
                </div>
              </div>
            </td>
            <td className="px-4 py-2 flex-grow-1">
              {task?.tags?.map((tag) => (
                <span
                  key={tag._id}
                  className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full mr-2 mb-1"
                >
                  {tag.tagName}
                </span>
              ))}
            </td>
            <td className="px-4 py-2 flex-grow-1">
              {task?.assignTo?.map((user) => (
                <span
                  key={user._id}
                  className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full mr-2 mb-1"
                >
                  {user.firstName} {user.lastName}
                </span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className="flex flex-row justify-between border-b">
        <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
          <button
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              activeTab === "All Task" ? "bg-gray-900 text-white" : ""
            } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer`}
            onClick={() => handleTabClick("All Task")}
          >
            All Task
          </button>
        </div>
        <div className="flex flex-row">
          <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
            <Link to={"../newTask"}>
              <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white  px-4 py-1.5 rounded-md shadow-inner cursor-pointer ">
                <IoMdAdd className="mr-2 text-xl" />
                <span>New Task</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-3 dark:bg-gray-900 min-h-screen w-full mx-auto lg:w-4/5 xl:w-[80%] ">
        <div className="flex flex-col md:flex-row md:justify-between border p-2 bg-white dark:bg-gray-800 dark:text-gray-100 shadow-sm rounded-md mt-4">
          <div className="flex justify-between space-x-2 mt-2 md:mt-0 sm:justify-between md:flex-row">
            <div
              className={`flex items-center font-semibold bg-slate-200 dark:bg-gray-600 px-4 py-1.5 rounded-md shadow-inner cursor-pointer mx-1 ${
                taskType === "Open"
                  ? "font-bold bg-slate-800 dark:bg-gray-700 text-white border-2 border-slate-200 dark:border-gray-500"
                  : ""
              }`}
              onClick={() => handleTaskType("Open")}
            >
              <GoIssueOpened className="text-xl text-green-500" />
              <span
                className={`mx-2 ${taskType === "Open" ? "font-bold" : ""}`}
              >
                {openedTasks.length}
              </span>
              <span className={`${taskType === "Open" ? "font-bold" : ""}`}>
                Open
              </span>
            </div>
            <div
              className={`flex items-center font-semibold bg-slate-200 dark:bg-gray-600 px-4 py-1.5 rounded-md shadow-inner cursor-pointer mx-1 ${
                taskType === "Close"
                  ? "font-bold bg-slate-800 dark:bg-gray-700 text-white border-2 border-slate-200 dark:border-gray-500"
                  : ""
              }`}
              onClick={() => handleTaskType("Close")}
            >
              <GoIssueClosed className="text-xl text-purple-500" />
              <span
                className={`mx-2 ${taskType === "Close" ? "font-bold" : ""}`}
              >
                {closedTasks.length}
              </span>
              <span className={`${taskType === "Close" ? "font-bold" : ""}`}>
                Closed
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-x-2 md:space-y-0">
            <div className="flex space-x-2">
              <button
                className={`${
                  currentPage === 1
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    : "bg-slate-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-500"
                } px-3 py-1.5 rounded-md shadow-inner`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className={`${
                  (taskType === "Open" ? currentOpenTasks : currentCloseTasks)
                    .length < itemsPerPage
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                    : "bg-slate-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-500"
                } px-3 py-1.5 rounded-md shadow-inner`}
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  (taskType === "Open" ? currentOpenTasks : currentCloseTasks)
                    .length < itemsPerPage
                }
              >
                Next
              </button>
            </div>

            <div className="relative flex items-center">
              <button
                className={`font-semibold px-4 py-1.5 rounded-md shadow-inner flex items-center cursor-pointer ${
                  FilterButtonActive
                    ? "bg-white dark:bg-gray-700 border"
                    : "bg-slate-200 dark:bg-gray-600"
                } border`}
                onClick={toggleDropdown}
              >
                <span>Filter</span>
                <IoMdArrowDropdown className="ml-2 text-xl" />
              </button>

              {isFilterOpen && (
                <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10">
                  {[
                    "All",
                    "Confirmed",
                    "In Progress",
                    "Completed",
                    "Not Confirmed",
                  ].map((status) => (
                    <div
                      key={status}
                      className={`text-left pl-3 p-2 w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-gray-600 flex items-center ${
                        selectedFilter === status
                          ? "font-bold bg-slate-200 dark:bg-gray-600"
                          : ""
                      }`}
                      onClick={() => handleFilterSelect(status)}
                    >
                      <div className="w-7 mr-2">
                        {selectedFilter === status && ""}
                      </div>
                      <div>{status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {taskType === "Open" && renderTasks(currentOpenTasks)}
        {taskType === "Close" && renderTasks(currentCloseTasks)}
      </div>
    </>
  );
};

export default AllTask;
