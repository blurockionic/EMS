import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { GoIssueClosed, GoIssueOpened, GoIssueReopened } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import TimeAgo from "../utilities-components/TimeAgo";
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
import { toast, ToastContainer } from "react-toastify";

// import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import Loader from "../utilities-components/Loader";

const SingleTaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false); // State for drag-and-drop area
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const { data: users, status } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
    if (profileStatus === "idle") dispatch(fetchProfile());
    dispatch(fetchTasks());
  }, [dispatch, status, profileStatus]);

  useEffect(() => {
    dispatch(fetchComments({ relatedTaskId: taskId }));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (taskId && commentSubmitted) {
      dispatch(fetchComments({ relatedTaskId: taskId }));
      setCommentSubmitted(false);
    }
  }, [dispatch, taskId, commentSubmitted]);

  useEffect(() => {
    if (tasks?.length > 0) {
      const foundTask = tasks.find((task) => task._id === taskId);
      setTask(foundTask);
    }
  }, [tasks, taskId]);

  const handleIssueClose = () => {
    dispatch(closeTask(taskId))
      .then((response) => {
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
        toast.success(response?.payload?.message ?? "Error");
        dispatch(fetchTasks());
      })
      .catch((error) => {
        console.error("Error reopening task:", error);
      });
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("commentedBy", profile._id);
    formData.append("relatedTaskId", taskId);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    // Log formData contents
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    // If you need to log file details
    // if (selectedFile) {
    //   console.log("File details:", {
    //     name: selectedFile.name,
    //     size: selectedFile.size,
    //     type: selectedFile.type,
    //   });
    // }
    dispatch(addComment(formData))
      .then((response) => {
        // This is where you can access the server's response
        // console.log("Server response:", response.payload.success);
        toast.success(response.payload.message ?? "")
        setComment("");
        setSelectedFile(null);
        setCommentSubmitted(true);

        dispatch(fetchComments({ relatedTaskId: taskId }));
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  const renderUserFullName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "";
  };

  if (!task) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <div className="p-3 min-h-screen w-[80%] sm:w-[80%] mx-auto">
        {/* Task details section */}
        <div className="shadow-md rounded-lg p-6 mb-6 bg-white dark:bg-gray-800">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white capitalize mb-2 lg:mb-0">
              {task?.title}
              <span className="mx-2 text-xl sm:text-base lg:text-2xl">
                #{task?.taskId}
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
                  {task?.status === "Close" && (
                    <>
                      <GoIssueClosed className="text-xl sm:text-2xl text-purple-800 mr-2 mt-1" />
                      <span className="font-semibold text-sm sm:text-base">
                        Close
                      </span>
                    </>
                  )}
                  {task?.status === "Open" && (
                    <>
                      <GoIssueOpened className="text-xl sm:text-2xl text-green-500 mr-2 mt-1" />
                      <span className="font-semibold text-sm sm:text-base">
                        Open
                      </span>
                    </>
                  )}
                  {task?.status === "In Review" && (
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
                  {renderUserFullName(task?.assignBy)}
                </span>
                <span className="mr-1 text-xl">•</span>
                <span className="mx-2">
                  Assigned: <TimeAgo date={task?.createdAt || new Date()} />
                </span>
              </div>
            </div>
            <div className="flex sm:flex-row lg:flex-row items-center">
              <div className="text-sm p-1 flex items-center ml-2 sm:ml-4">
                <span className="mr-1">Tags</span>
                <div className="dark:bg-slate-400 bg-slate-200 px-2 py-1 rounded ml-2 sm:ml-1">
                  <span className="mr-1">•</span>
                  <span className="font-semibold capitalize">
                    {task?.tags
                      ?.map((tag) => tag?.tagName ?? "no tag available")
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
        {/* Comments section */}
        <div className="shadow-md rounded-lg p-3 mb-6 border bg-white dark:bg-gray-800">
          <div className="">
            <div className="flex justify-between border p-2">
              <div>
                <span className="font-bold">
                  {renderUserFullName(task?.assignBy)}
                </span>{" "}
                commented
                <span className="mx-2">
                  <TimeAgo date={task?.createdAt || new Date()} />
                </span>
              </div>
              <div>
                <BsThreeDots />
              </div>
            </div>
            <div className="flex flex-wrap flex-row justify-between p-4">
              <div>{task?.description}</div>
              {task?.fileUploader && (
                <div>
                  <img src={task?.fileUploader} alt="Uploaded file" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* User comments and drag-and-drop file upload */}
        <div className="container mx-auto mt-4">
          <div>
            {comments?.map((comment, index) => (
              <div
                key={index}
                className="shadow-md rounded-lg p-3 mb-6 border bg-white dark:bg-gray-800"
              >
                <div className="border border-gray-800 dark:border-gray-600 rounded-lg p-3 ">
                  <div className="flex justify-between border p-2">
                    <div className="flex">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={
                          profile?.profilePicture ??
                          "https://via.placeholder.com/150"
                        }
                        alt="Profile"
                      />
                      <span className="font-bold mx-2">
                        {renderUserFullName(comment?.commentedBy)}
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
                  <div className="flex flex-wrap flex-row justify-between p-3 ">
                    <div>{comment?.comment}</div>
                    {/* Check if documentFile is present and render it */}
                    {comment?.documentFile && (
                      <div>
                        {comment?.documentFile ? (
                          <img
                            src={comment?.documentFile}
                            alt=""
                            className="mx-auto"
                            style={{
                              width: "80%",
                              height: "auto",
                              maxWidth: "80%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          comment?.documentFile
                        )}

                        {/* <DocViewer
                        documents={[{ uri: comment?.documentFile }]}
                        pluginRenderers={DocViewerRenderers}
                      /> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Comment box with drag-and-drop file upload */}
          <div className="flex flex-row py-1 items-center">
            <img
              className="w-8 h-8 rounded-full"
              src={profile?.profilePicture ?? "https://via.placeholder.com/150"}
              alt="Profile"
            />
            <h3 className="font-bold ml-2"> Add a comment</h3>
          </div>
          <div className="w-full border border-gray-800 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <div className="p-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-24 border border-gray-800 dark:border-gray-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Write your comment"
              ></textarea>
            </div>
            {selectedFile && (
              <div className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                <strong>Selected file:</strong> {selectedFile.name}
              </div>
            )}
            <div
              className={`border-t border-gray-300 dark:border-gray-600 p-4 mt-2 rounded-b-lg transition-colors duration-200 ${
                isDragActive
                  ? "bg-blue-50 dark:bg-blue-900"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
              onDrop={onDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document?.getElementById("file-upload").click()} // Trigger file input click on div click
            >
              <div className="flex justify-between">
                <div className="flex">
                  <svg
                    className="w-6 h-6 mx-2 text-gray-400 dark:text-gray-300"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 16"
                  >
                    <path d="M16.5 10a3.5 3.5 0 10-3.17-5H9.5a3.5 3.5 0 00-3.17 5H3.5a3.5 3.5 0 000 7h13a3.5 3.5 0 000-7h-.5zM6 7a2.5 2.5 0 012.5-2.5h3.83a3.501 3.501 0 006.34 2H17a2.5 2.5 0 010 5h-1v1a1 1 0 11-2 0v-1H6v1a1 1 0 11-2 0v-1H3.5a2.5 2.5 0 010-5H6zm4 3a1 1 0 00-1 1v2.586l-.293-.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 13.586V11a1 1 0 00-1-1z" />
                  </svg>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                    Drag and drop a file here, or{" "}
                    <span className="hover:underline font-extrabold">
                      browse
                    </span>
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row justify-end mt-4">
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
                onClick={(e) => handleCommentSubmit(e)}
                className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTaskDetails;
