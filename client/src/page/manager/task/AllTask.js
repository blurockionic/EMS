import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  specificEmployeeTasks,
} from "../../../Redux/slices/taskSlice";
import TimeAgo from "../../../component/utilities-components/TimeAgo";
import {
  GoDotFill,
  GoIssueClosed,
  GoIssueOpened,
  GoTasklist,
} from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import { fetchTags } from "../../../Redux/slices/tagSlice";
import Loader from "../../../component/utilities-components/Loader";
import { BsThreeDots } from "react-icons/bs";
import { FaTable } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import { MdOutlineViewTimeline } from "react-icons/md";
import { fetchProfile } from "../../../Redux/slices/profileSlice";

const AllTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openedTasks, setOpenedTasks] = useState([]);
  const [closedTasks, setCloseTasks] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const profile = useSelector((state) => state.profile.data);
  const { tasks = [], employeeSpecificTasks = [] } = useSelector(
    (state) => state.tasks
  ); // Ensure default empty array
  const taskStatus = useSelector((state) => state.tasks.loading);
  const { data: users, status } = useSelector((state) => state.user);
  // Extract profile._id to a variable
  const profileId = profile?._id;

  const [uiState, setUiState] = useState({
    activeTab: "All Tasks",
    tabs: ["All Tasks", "My Tasks", "Open", "Close"],
    showMoreTabs: false,
    searchInputBox: false,
    action: null,
    currentMeeting: null,
    activeRowId: null,
    editableMeetingId: null,
  });

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentOpenTasks = openedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const currentCloseTasks = closedTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchTags());
    dispatch(fetchTasks());
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (profileId) {
      dispatch(specificEmployeeTasks(profileId));
    }
  }, [profileId, dispatch]); // Simplified dependency array


  useEffect(() => {
    const openTasks = tasks.filter((task) => task.status === "Open");
    const closedTasks = tasks.filter((task) => task.status === "Close");
    setOpenedTasks(openTasks);
    setCloseTasks(closedTasks);
  }, [tasks]);

  const handleTabChange = (tab) => {
    setUiState((prevState) => ({
      ...prevState,
      activeTab: tab,
    }));
  };

  const getTabIcon = useCallback((tab) => {
    const icons = {
      "All Tasks": <TbSubtask className="mr-2 mt-1" />,
      "My Tasks": <GoTasklist className="mr-2 mt-1" />,
      // "Table View": <FaTable className="mr-2 mt-1" />,
      Open: <GoIssueOpened className="mr-2 mt-1" />,
      Close: <GoIssueClosed className="mr-2 mt-1" />,
      Timeline: <MdOutlineViewTimeline className="mr-2 mt-1" />,
      // Completed: <GoIssueClosed className="mr-2 mt-1" />,
    };
    return icons[tab] || null;
  }, []);

  const addTab = useCallback(
    (tab) => {
      if (!uiState.tabs.includes(tab)) {
        setUiState((prevState) => ({
          ...prevState,
          tabs: [...prevState.tabs, tab],
          activeTab: tab,
          showMoreTabs: false,
        }));
      }
    },
    [uiState.tabs]
  );

  const handleTaskDetails = (taskId) => {
    // Ensure you use the correct path when navigating
navigate(`../singleTaskDetails/${taskId}`);
    // navigate(`../singleTaskDetails/${taskId}`);
  };

  const renderTasks = (tasksList) => (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {tasksList?.map((task) => (
          <tr
            key={task._id}
            className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 cursor-pointer h-16"
            onClick={() => handleTaskDetails(task._id)}
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

  const tabsList = useMemo(
    () =>
      uiState.tabs.map((tab) => (
        <div
          key={tab}
          className={`flex items-center cursor-pointer px-2 py-2 ${
            uiState.activeTab === tab
              ? "border-b-2 border-green-500 font-bold"
              : "font-semibold bg-transparent"
          }`}
          onClick={() => handleTabChange(tab)}
        >
          {getTabIcon(tab)} {tab}
        </div>
      )),
    [uiState.tabs, uiState.activeTab, getTabIcon]
  );

  const TaskView = ({ taskType, currentTasks }) => (
    <>
      {renderTasks(currentTasks)}
      {currentTasks.length === 0 && (
        <div className="flex justify-center font-bold mt-12">
          {taskType === "Open"
            ? "No open tasks available."
            : taskType === "My Tasks"
            ? "No tasks assigned to you."
            : "No closed tasks available."}
        </div>
      )}
    </>
  );

  return (
    <>
      {taskStatus && <Loader />}
      <div className="w-[90%] mx-auto mt-2">
        <h1 className="text-4xl font-bold p-2">Tasks</h1>
        <nav className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="flex w-full sm:w-auto h-full items-end space-x-3 overflow-x-auto sm:overflow-x-hidden">
              {tabsList}
            </div>
            <div className="relative flex items-center">
              <div
                className="cursor-pointer"
                onClick={() =>
                  setUiState((prevState) => ({
                    ...prevState,
                    showMoreTabs: !prevState.showMoreTabs,
                  }))
                }
              >
                <IoMdAdd className="text-2xl mx-2 mt-2" />
              </div>
              {uiState.showMoreTabs && (
                <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 p-1">
                  <ul>
                    {["Timeline",].map(
                      (tab) => (
                        <li
                          key={tab}
                          className="flex flex-row cursor-pointer mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                          onClick={() => addTab(tab)}
                        >
                          {getTabIcon(tab)}
                          {tab}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between p-2 space-x-2">
            <div className="flex flex-col md:flex-row justify-between items-center space-x-2 md:space-y-0">
              <div className="flex space-x-2">
                <button
                  className={` px-2 py-1 rounded-md shadow-inner text-sm ${
                    currentPage === 1
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      : "bg-slate-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-500"
                  }`}
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className={`${
                    (uiState.activeTab === "Open"
                      ? currentOpenTasks
                      : currentCloseTasks
                    ).length < itemsPerPage
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      : "bg-slate-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-500"
                  } px-2 py-1 rounded-md shadow-inner text-sm`}
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    (uiState.activeTab === "Open"
                      ? currentOpenTasks
                      : currentCloseTasks
                    ).length < itemsPerPage
                  }
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
                uiState.searchInputBox
                  ? "bg-gray-200 dark:bg-slate-400"
                  : "hover:bg-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              <span className="p-0.5">
                <BsThreeDots className="text-xl" />
              </span>
            </div>
            <div className="flex items-center">
              <Link to={"../newTask"}>
                <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
                  <IoMdAdd className="text-lg mr-1" />
                  <span>New</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <div className="p-3 dark:bg-gray-900 min-h-screen w-full mx-auto lg:w-4/5 xl:w-[90%] ">
        {uiState.activeTab === "All Tasks" && (
          <TaskView taskType="All Tasks" currentTasks={tasks} />
        )}
        {uiState.activeTab === "My Tasks" && (
          <TaskView taskType="My Tasks" currentTasks={employeeSpecificTasks} />
        )}
        {uiState.activeTab === "Open" && (
          <TaskView taskType="Open" currentTasks={currentOpenTasks} />
        )}
        {uiState.activeTab === "Close" && (
          <TaskView taskType="Close" currentTasks={currentCloseTasks} />
        )}
      </div>
    </>
  );
};

export default AllTask;
