import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened, GoIssueReopened } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import TimeAgo from "./TimeAgo";
import {
  fetchTasks,
  closeTask,
  reopenTask,
} from "../../Redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Redux/slices/allUserSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import {
  addComment,
  fetchComments,
  selectComments,
} from "../../Redux/slices/commentSlice";
import { toast } from "react-toastify";

const SingleTaskDetails = () => {
  const { taskId } = useParams(); // get single task's id from params
  const [task, setTask] = useState(null);
  const { tasks } = useSelector((state) => state.tasks);
  const [comment, setComment] = useState("");
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();
  const { data: users, status } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Fetch tasks, users, and profile on component mount
  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
    if (profileStatus === "idle") dispatch(fetchProfile());
    dispatch(fetchTasks());
  }, [dispatch, status, profileStatus]);

  // Fetch comments for the task

  const handleCommentSubmit = () => {
    dispatch(
      addComment({
        comment,
        commentedBy: profile._id,
        relatedTaskId: taskId,
      })
    )
      .then(() => {
        setComment("");
        setCommentSubmitted(true);
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  useEffect(() => {
    if (taskId && commentSubmitted) {
      dispatch(fetchComments({ relatedTaskId: taskId }));
      setCommentSubmitted(false);
    }
  }, [dispatch, taskId, commentSubmitted]);

  // Set the task details
  useEffect(() => {
    if (tasks?.length > 0) {
      const foundTask = tasks.find((task) => task._id === taskId);
      setTask(foundTask);
    }
  }, [tasks, taskId]);

  const handleIssueClose = () => {
    dispatch(closeTask(taskId))
      .then((response) => {
        // console.log("Close Task Response:", response);
        dispatch(fetchTasks());
        toast.success(response?.payload?.message ?? "Error");
      })
      .catch((error) => {
        console.error("Error closing task:", error);
      });
  };

  const handleTaskStatusChange = () => {
    dispatch(reopenTask(taskId))
      .then((response) => {
        // console.log("Reopen Task Response:", response);
        toast.success(response?.payload?.message ?? "Error");
        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.error("Error reopening task:", error);
      });
  };

  // Loader
  if (!task) {
    return <div>Loading...</div>;
  }

  const renderUserFullName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  };

  return (
    <div className="p-3 min-h-screen w-full sm:w-[80%] mx-auto">
      <div className="shadow-md rounded-lg p-6 mb-6 bg-white dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white capitalize mb-2 lg:mb-0">
            {task.title}
            <span className="mx-2 text-xl sm:text-base lg:text-2xl">
              #{task.taskId}
            </span>
          </h1>
          <button className="w-[6rem] bg-green-600 text-white py-1.5 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 mt-2 lg:mt-0">
            Edit Task
          </button>
        </div>
        <div className="flex flex-col flex-wrap sm:flex-row justify-between items-center mt-4">
          <div className="flex flex-row items-center mb-2 sm:mb-0">
            <button className="inline-block py-1.5 px-4 rounded-full transition duration-300 bg-slate-50 dark:bg-gray-700 mb-2 sm:mb-0">
              <span className="flex items-center">
                {task.status === "Close" && (
                  <>
                    <GoIssueClosed className="text-xl sm:text-2xl text-purple-800 mr-2 mt-1" />
                    <span className="font-semibold text-sm sm:text-base">
                      Close
                    </span>
                  </>
                )}
                {task.status === "Open" && (
                  <>
                    <GoIssueOpened className="text-xl sm:text-2xl text-green-500 mr-2 mt-1" />
                    <span className="font-semibold text-sm sm:text-base">
                      Open
                    </span>
                  </>
                )}
                {task.status === "In Review" && (
                  <>
                    <GoIssueReopened className="text-lg sm:text-xl text-blue-500 mr-2 mt-1" />
                    <span className="font-semibold text-sm sm:text-base">
                      In Review
                    </span>
                  </>
                )}
              </span>
            </button>
            <div className="text-sm p-1 flex items-center ml-2 sm:ml-4">
              <span className="mr-1">Assign by</span>
              <span className="mx-2 font-semibold capitalize">
                {renderUserFullName(task.assignBy)}
              </span>
              <span className="mr-1 text-xl">•</span>
              <span className="mx-2">
                Assigned: <TimeAgo date={task.createdAt || new Date()} />
              </span>
            </div>
          </div>
          <div className="flex sm:flex-row lg:flex-row items-center">
            <div className="text-sm p-1 flex items-center ml-2 sm:ml-4">
              <span className="mr-1">Tags</span>
              <div className="dark:bg-slate-400 bg-slate-200 px-2 py-1 rounded ml-2 sm:ml-1">
                <span className="mr-1">•</span>
                <span className="font-semibold capitalize">
                  {task.tags
                    ?.map((tag) => tag.tagName ?? "no tag available")
                    .join(", ")}
                </span>
              </div>
            </div>
            <div className="text-sm p-1 flex items-center ml-2 sm:ml-4">
              <span className="mr-1">Due date</span>
              <div className="dark:bg-slate-400 bg-slate-200 px-2 py-1 rounded ml-2 sm:ml-1">
                <span className="mr-1">•</span>
                <span className="font-semibold capitalize">
                  {new Date(task?.dueDate).toLocaleDateString("en-GB") ??
                    "No due date available"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-lg p-6 mb-6 border bg-white dark:bg-gray-800">
        <div className="border">
          <div className="flex justify-between border p-2">
            <div>
              <span className="font-bold">
                {renderUserFullName(task.assignBy)}
              </span>{" "}
              commented
              <span className="mx-2">
                <TimeAgo date={task.createdAt || new Date()} />
              </span>
            </div>
            <div>
              <BsThreeDots />
            </div>
          </div>
          <div className="flex flex-wrap flex-row justify-between p-4">
            <div>{task.description}</div>
            <div>
              <img src={task.fileUploder}/>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div>
          {comments.map((comment, index) => (
            <div
              key={index}
              className="shadow-md rounded-lg p-6 mb-6 border bg-white dark:bg-gray-800"
            >
              <div className="border">
                <div className="flex justify-between border p-2">
                  <div>
                    <span className="font-bold">
                      {renderUserFullName(comment.commentedBy)}
                    </span>{" "}
                    commented
                    <span className="mx-2">
                      <TimeAgo date={comment.createdAt || new Date()} />
                    </span>
                  </div>
                  <div>
                    <BsThreeDots />
                  </div>
                </div>
                <div className="flex flex-wrap flex-row justify-between p-4">
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
            className="w-full h-24 border border-gray-800 dark:border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Write details about the task"
          ></textarea>
        </div>
        <div className="flex lg:flex-row justify-end ">
          <div className="flex flex-col sm:flex-row justify-end mb-4">
            {task.status === "Open" && (
              <button
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
                onClick={handleIssueClose}
              >
                Close Task
              </button>
            )}
            {task.status === "Close" && (
              <button
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
                onClick={handleTaskStatusChange}
              >
                Open Task
              </button>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end mb-4">
            <button
              onClick={handleCommentSubmit}
              className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTaskDetails;
