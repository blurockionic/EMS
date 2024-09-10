// File Path: src/components/AllTask.jsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchTasks,
  specificEmployeeTasks,
} from "../../Redux/slices/taskSlice";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { fetchTags } from "../../Redux/slices/tagSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import Loader from "../utilities-components/Loader";
import RenderTasks from "./RenderTasks";
import {
  GoIssueClosed,
  GoIssueOpened,
  GoIssueReopened,
  GoTasklist,
} from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { TbSubtask } from "react-icons/tb";
import { MdOutlineViewTimeline } from "react-icons/md";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { IoSearchCircleSharp } from "react-icons/io5";

const AllTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openedTasks, setOpenedTasks] = useState([]);
  const [closedTasks, setClosedTasks] = useState([]);
  const [onHoldTasks, setOnHoldTasks] = useState([]);
  const [inReviewTasks, setInReviewTasks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [uiState, setUiState] = useState({
    activeTab: "All Tasks",
    tabs: ["All Tasks", "My Tasks", "Open", "Close"],
    showMoreTabs: false,
    searchInputBox: false,
  });

  const itemsPerPage = 10;
  const profileId = useSelector((state) => state.profile.data?._id);
  const tasks = useSelector((state) => state.tasks.tasks);
  const employeeSpecificTasks = useSelector(
    (state) => state.tasks.employeeSpecificTasks
  );
  const taskStatus = useSelector((state) => state.tasks.loading);
  const { data: users, status } = useSelector((state) => state.user);

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;

  const getCurrentTasks = useCallback(
    (tasks) => tasks.slice(indexOfFirstTask, indexOfLastTask),
    [indexOfFirstTask, indexOfLastTask]
  );

  const currentOpenTasks = useMemo(
    () => getCurrentTasks(openedTasks),
    [openedTasks, getCurrentTasks]
  );
  const currentCloseTasks = useMemo(
    () => getCurrentTasks(closedTasks),
    [closedTasks, getCurrentTasks]
  );
  const currentOnHoldTasks = useMemo(
    () => getCurrentTasks(onHoldTasks),
    [onHoldTasks, getCurrentTasks]
  );
  const currentInReviewTasks = useMemo(
    () => getCurrentTasks(inReviewTasks),
    [inReviewTasks, getCurrentTasks]
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getCurrentPageTasks = useMemo(() => {
    switch (uiState.activeTab) {
      case "Open":
        return currentOpenTasks;
      case "Close":
        return currentCloseTasks;
      case "On Hold":
        return currentOnHoldTasks;
      case "In Review":
        return currentInReviewTasks;
      default:
        return tasks;
    }
  }, [
    uiState.activeTab,
    currentOpenTasks,
    currentCloseTasks,
    currentOnHoldTasks,
    currentInReviewTasks,
    tasks,
  ]);

  const handleTabChange = (tab) =>
    setUiState((prevState) => ({ ...prevState, activeTab: tab }));

  const handleTaskDetails = (taskId) =>
    navigate(`../singleTaskDetails/${taskId}`);

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

  const getTabIcon = useCallback((tab) => {
    const icons = {
      "All Tasks": <TbSubtask className="mr-2 mt-1" />,
      "My Tasks": <GoTasklist className="mr-2 mt-1" />,
      Open: <GoIssueOpened className="mr-2 mt-1" />,
      Close: <GoIssueClosed className="mr-2 mt-1" />,
      "On Hold": <AiOutlineIssuesClose className="mr-2 mt-1" />,
      "In Review": <GoIssueReopened className="mr-2 mt-1" />,
      Timeline: <MdOutlineViewTimeline className="mr-2 mt-1" />,
    };
    return icons[tab] || null;
  }, []);

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
  }, [profileId, dispatch]);

  useEffect(() => {
    const openTasks = tasks.filter((task) => task.status === "Open");
    const closedTasks = tasks.filter((task) => task.status === "Close");
    const inReviewTasks = tasks.filter((task) => task.status === "In Review");
    const onHoldTasks = tasks.filter((task) => task.status === "On Hold");

    setOpenedTasks(openTasks);
    setClosedTasks(closedTasks);
    setOnHoldTasks(onHoldTasks);
    setInReviewTasks(inReviewTasks);
  }, [tasks]);

  const TaskView = ({ taskType, currentTasks }) => (
    <>
      <RenderTasks
        tasksList={currentTasks}
        handleTaskDetails={handleTaskDetails}
        users={users}
      />
      {currentTasks.length === 0 && (
        <div className="flex justify-center font-bold mt-12">
          {`No ${taskType.toLowerCase()} tasks available.`}
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
                    {["On Hold", "In Review", "Timeline"].map((tab) => (
                      <li
                        key={tab}
                        className="flex flex-row cursor-pointer mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                        onClick={() => addTab(tab)}
                      >
                        {getTabIcon(tab)}
                        {tab}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row justify-between p-2 space-x-2">
            <div className="flex space-x-2">
              <button
                className={`px-2 py-1 rounded-md text-sm ${
                  currentPage === 1
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className={`px-2 py-1 rounded-md text-sm ${
                  getCurrentPageTasks.length < itemsPerPage
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
                onClick={() => paginate(currentPage + 1)}
                disabled={getCurrentPageTasks.length < itemsPerPage}
              >
                Next
              </button>
            </div>

            <div className="flex items-center">
              <IoSearchCircleSharp className="text-xl cursor-pointer" />
              {uiState.searchInputBox && (
                <input
                  type="search"
                  placeholder="Type to search..."
                  className="bg-transparent p-1 outline-none"
                />
              )}
              <Link to={"../newTask"}>
                <div className="flex items-center bg-gray-900 hover:bg-gray-800 text-white px-2 py-1 rounded-md shadow-inner cursor-pointer">
                  <IoMdAdd className="text-lg mr-1" />
                  <span>New</span>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-3 dark:bg-gray-900 min-h-screen w-full mx-auto lg:w-4/5 xl:w-[90%]">
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
        {uiState.activeTab === "On Hold" && (
          <TaskView taskType="On Hold" currentTasks={currentOnHoldTasks} />
        )}
        {uiState.activeTab === "In Review" && (
          <TaskView taskType="In Review" currentTasks={currentInReviewTasks} />
        )}
      </div>
    </>
  );
};

export default AllTask;
