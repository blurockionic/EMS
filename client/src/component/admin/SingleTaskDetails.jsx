import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import TimeAgo from "./TimeAgo";
import { fetchTasks } from "../../Redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../App";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";

import { GoIssueReopened } from "react-icons/go";
import {
  addComment,
  fetchComments,
  selectComments,
  selectError,
  selectLoading,
} from "../../Redux/slices/commentSlice";

const SingleTaskDetails = () => {
  const { taskId } = useParams(); // get single task's id form params
  // task related data set to be in setTask
  const [task, setTask] = useState(null);
  // all task from the redux slice store
  const { tasks } = useSelector((state) => state.tasks);

  // all comment of a task data variables
  const [comment, setComment] = useState("");
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();
  // all users data
  const { data: users, status } = useSelector((state) => state.user);
  // current user dedails
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);

  // use effect for get task related to the task Id
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // use effect for get all comments of a task using task id
  useEffect(() => {
    if (taskId) {
      dispatch(fetchComments({ relatedTaskId: taskId }));
    }
  }, [dispatch, taskId]);

  // useEffect for filer the tak form all task data using the task id
  useEffect(() => {
    if (tasks?.length > 0) {
      const foundTask = tasks?.find((task) => task._id === taskId);
      setTask(foundTask);
    }
  }, [tasks, taskId]);

  //  fetching all users data
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Fetching current user profile
  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);

  // comment add button handler
  const handleCommentSubmit = () => {
    dispatch(
      addComment({
        comment: comment,
        commentedBy: profile._id,
        relatedTaskId: taskId,
      })
    );
    setComment("");
  };


  // close task handler not working now 
  const handleIssueClose = () => {
    // Assuming you have an API endpoint to close the task
    // This is a placeholder and should be implemented based on your backend logic
    axios
      .put(`${server}/tasks/${taskId}/close`)
      .then((response) => {
        // Update task status in UI or reload data
        alert("Issue closed");
        // Reload tasks or update task state accordingly
        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.error("Error closing task:", error);
      });
  };
// task change handler not working now
  const handleTaskStatusChange = () => {
    // Assuming you have an API endpoint to reopen the task
    // This is a placeholder and should be implemented based on your backend logic
    axios
      .put(`${server}/tasks/${taskId}/reopen`)
      .then((response) => {
        alert("Task reopened");

        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.error("Error reopening task:", error);
      });
  };

  // make more better loader
  if (!task) {
    return <div>Loading...</div>;
  }
  // console.log("all comments", comments);
  // console.log("task me data", task);
  return (
    <div className="p-3 min-h-screen w-[80%] mx-auto">
      <div className="shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {task.title}
            <span className="mx-2">#{task.taskId}</span>
          </h1>
          <button className="bg-green-600 text-white py-1.5 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300">
            Edit Task
          </button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <button className="inline-block py-1.5 px-4 rounded-full  transition duration-300 bg-slate-50">
              <span className="flex">
                {task.status === "Close" && (
                  <>
                    <GoIssueClosed className="text-xl text-purple-800 mr-2" />
                    <span className="font-semibold">Close</span>
                  </>
                )}
                {task.status === "Open" && (
                  <>
                    {" "}
                    <GoIssueOpened className="text-xl text-green-500 mr-2" />
                    <span className="font-semibold"> Open</span>
                  </>
                )}
                {task.status === "In Review" && (
                  <>
                    {" "}
                    <GoIssueReopened className="text-xl text-blue-500 mr-2" />
                    <span className="font-semibold">In Review</span>
                  </>
                )}
              </span>
            </button>
            <div className="text-sm  p-1 flex items-center">
              <span className="mr-1"> Assign by </span>
              <span className="mx-2  font-semibold capitalize">
                {" "}
                {
                  users.find((user) => user._id === task.assignBy)?.firstName
                }{" "}
                {users.find((user) => user._id === task.assignBy)?.lastName}
              </span>
              <span className="mr-1 text-xl">•</span> {/* Add a separator */}
              <span className="mx-2">
                Assigned: <TimeAgo date={task.createdAt || new Date()} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-6 mb-6 border">
        <div className="border ">
          <div className="flex justify-between border  p-2">
            <div>
              {" "}
              <span className="font-bold">
                {" "}
                {
                  users.find((user) => user._id === task.assignBy)?.firstName
                }{" "}
                {users.find((user) => user._id === task.assignBy)?.lastName}{" "}
              </span>{" "}
              commented
              <span className="mx-2">
                <TimeAgo date={task.createdAt || new Date()} />
              </span>
            </div>
            <div>
              <BsThreeDots />{" "}
            </div>
          </div>
          <div className=" flex flex-wrap flex-row justify-between  p-4 ">
            <div>{task.description}</div>
            <div>
              <img src={task.fileUploder}/>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div>
          {comments?.map((comment, index) => (
            <div key={index} className=" shadow-md rounded-lg p-6 mb-6 border">
              <div className="border">
                <div className="flex justify-between border p-2">
                  <div>
                    <span className="font-bold">
                      {" "}
                      {
                        users.find((user) => user._id === comment?.commentedBy)
                          ?.firstName
                      }{" "}
                      {
                        users.find((user) => user._id === comment?.commentedBy)
                          ?.lastName
                      }{" "}
                    </span>{" "}
                    commented
                    <span className="mx-2">
                      <TimeAgo date={comment?.createdAt || new Date()} />
                    </span>
                  </div>
                  <div>
                    <BsThreeDots />
                  </div>
                </div>
                <div className=" flex flex-wrap flex-row justify-between  p-4 ">
                  {comment.comment}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full h-24 border border-gray-800 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-500"
            placeholder="Write details about the task"
          ></textarea>
        </div>
        <div className="flex flex-row justify-end mb-4">
          <div className="relative px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none">
            {task.status === "Open" && (
              <>
                <button
                  className=" text-white py-1.5 px-4 rounded-md"
                  onClick={handleTaskStatusChange} // Fix: added parentheses to invoke function
                >
                  Close Task
                </button>
              </>
            )}{" "}
            {task.status === "Close" && (
              <>
                <span>
                  <button
                    className=" text-white py-1.5 rounded-md"
                    onClick={handleIssueClose} // Fix: added parentheses to invoke function
                  >
                    Open Task
                  </button>
                </span>
              </>
            )}
          </div>
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleTaskDetails;
