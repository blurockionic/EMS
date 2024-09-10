import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  GoDotFill,
  GoIssueClosed,
  GoIssueOpened,
  GoIssueReopened,
} from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import TimeAgo from "../utilities-components/TimeAgo";
import {
  fetchTasks,
  closeTask,
  reopenTask,
  putTaskOnHold,
  submitTaskForReview,
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
import { AiOutlineIssuesClose } from "react-icons/ai";

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

  const handleTaskStatusChange = (newStatus) => {
    if (newStatus === "Open") {
      dispatch(reopenTask(task._id))
        .then((response) => {
          dispatch(fetchTasks()); // Refresh task list
          toast.success(
            response.payload.message || "Task reopened successfully"
          );
        })
        .catch((error) => {
          console.error("Error reopening task:", error);
          toast.error("Failed to reopen task");
        });
    } else if (newStatus === "On Hold") {
      dispatch(putTaskOnHold(task._id))
        .then((response) => {
          dispatch(fetchTasks()); // Refresh task list
          toast.success(response.payload.message || "Task put on hold");
        })
        .catch((error) => {
          console.error("Error putting task on hold:", error);
          toast.error("Failed to put task on hold");
        });
    } else if (newStatus === "In Review") {
      dispatch(submitTaskForReview(task._id))
        .then((response) => {
          dispatch(fetchTasks()); // Refresh task list
          toast.success(
            response.payload.message || "Task submitted for review"
          );
        })
        .catch((error) => {
          console.error("Error submitting task for review:", error);
          toast.error("Failed to submit task for review");
        });
    } else {
      console.error(`Unknown task status: ${newStatus}`);
      toast.error("Unknown task status");
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  }, []);

  /**
   * Handles the drag over event by setting the drag active state.
   * @param {DragEvent} e The drag over event.
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // If the drag event contains items, set the drag active state to true
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  /**
   * Handles the drag leave event by resetting the drag active state.
   * @param {DragEvent} e The drag leave event.
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false); // Reset drag active state
  };

  /**
   * Handles the selection of a file for upload.
   * @param {Event} e The change event.
   */
  const handleFileSelect = (e) => {
    // Get the selected file from the input element
    const selectedFile = e.target.files && e.target.files[0];

    // If a file is selected, store it in the component state
    if (selectedFile) {
      setSelectedFile(selectedFile);
    }
  };

  /**
   * Handles the submission of a new comment on a task.
   * @param {Event} e The submit event.
   */
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("commentedBy", profile._id);
    formData.append("relatedTaskId", taskId);
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    /**
     * Log formData contents
     * @example
     * for (let [key, value] of formData.entries()) {
     *   console.log(`${key}: ${value}`);
     * }
     */
    // Log formData contents if needed

    /**
     * Log file details if needed
     * @example
     * if (selectedFile) {
     *   console.log("File details:", {
     *     name: selectedFile.name,
     *     size: selectedFile.size,
     *     type: selectedFile.type,
     *   });
     * }
     */
    // Log file details if needed
    dispatch(addComment(formData))
      .then((response) => {
        // This is where you can access the server's response
        // console.log("Server response:", response.payload.success);
        toast.success(response.payload.message ?? "");
        setComment("");
        setSelectedFile(null);
        setCommentSubmitted(true);

        dispatch(fetchComments({ relatedTaskId: taskId }));
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  // Helper to check if the user is a manager or admin and assigned to this task
  const isManagerOrAdmin =
    (profile.role === "manager" || profile.role === "admin") &&
    task?.assignBy === profile._id;
  // Check if the current user is assigned to this task
  const isAssignedEmployee = task?.assignTo?.some(
    (assign) => assign._id === profile._id
  );

  /**
   * Given a user id, returns the full name of the user as a string, or an empty string if the user is not found
   * @param {string} userId
   * @returns {string}
   */

  const renderUserFullName = (userId) => {
    const user = users.find((user) => user._id === userId);
    // If the user is found, return the full name, otherwise return an empty string
    return user ? `${user.firstName} ${user.lastName}` : "";
  };
  const renderUserProfilePicture = (userId) => {
    const user = users.find((user) => user._id === userId);

    return user ? `${user.profilePicture}` : "";
  };

  if (!task) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <div className="p-3 min-h-screen w-[80%] sm:w-[80%] mx-auto">
        {/* Task details section */}
        <div className="shadow-md rounded-lg p-4 mb-4 bg-white dark:bg-gray-800">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white capitalize mb-2 lg:mb-0">
              {task?.title}
              <span className="mx-1 text-lg sm:text-xl md:text-2xl">
                #{task?.taskId}
              </span>
            </h1>
            <button className="w-full sm:w-auto bg-green-600 text-white py-1.5 px-4 rounded hover:bg-green-700 dark:hover:bg-green-500 transition duration-300 mt-2 lg:mt-0">
              Edit Task
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start mt-4">
            <div className="flex flex-col sm:flex-row items-start mb-4 sm:mb-0">
              <button className="inline-block py-1 px-3 rounded-full transition duration-300 bg-slate-50 dark:bg-gray-700 mb-2 sm:mb-0">
                <span className="flex items-center">
                  {task?.status === "Close" && (
                    <>
                      <GoIssueClosed className="text-lg sm:text-xl text-purple-800 mr-2" />
                      <span className="font-semibold text-sm">Close</span>
                    </>
                  )}
                  {task?.status === "Open" && (
                    <>
                      <GoIssueOpened className="text-lg sm:text-xl text-green-500 mr-2" />
                      <span className="font-semibold text-sm">Open</span>
                    </>
                  )}
                  {task?.status === "In Review" && (
                    <>
                      <GoIssueReopened className="text-lg sm:text-xl text-blue-500 mr-2" />
                      <span className="font-semibold text-sm">In Review</span>
                    </>
                  )}
                  {task?.status === "On Hold" && (
                    <>
                      <AiOutlineIssuesClose className="text-lg sm:text-xl text-red-500 mr-2" />
                      <span className="font-semibold text-sm">On Hold</span>
                    </>
                  )}
                </span>
              </button>
              <div className="text-sm flex flex-col sm:flex-row items-start sm:ml-4 mt-2 sm:mt-0">
                <div className="flex">
                  <GoDotFill className="mt-1" />
                  <span>Assign by</span>
                  <span className="mx-2 font-semibold capitalize">
                    {renderUserFullName(task?.assignBy)}
                  </span>
                </div>
                <span className="flex">
                  <GoDotFill className="mt-1" />
                  Assigned &nbsp;{" "}
                  <TimeAgo date={task?.createdAt || new Date()} />
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-row items-start mt-2 sm:mt-0">
              <div className="text-sm flex flex-col sm:flex-row items-start sm:ml-4 mb-2 sm:mb-0">
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
              <div className="text-sm flex flex-col sm:flex-row items-start sm:ml-4">
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
          <div className="flex flex-col sm:flex-row px-4 mt-4">
            <span className="mr-1">Assign to</span>
            <span className=" font-semibold capitalize">
              {task?.assignTo?.map((assignTo) => (
                <span key={assignTo._id} className="space-x-1">
                  {" "}
                  {renderUserFullName(assignTo._id)},
                </span>
              ))}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row px-4 mt-4">
            <span className="mr-1">Related Project</span>
            <span className="font-semibold capitalize">
              {task?.project?.projectName}
            </span>
          </div>
        </div>

        {/* Comments section */}
        <div className="shadow-md rounded-lg p-4 mb-6 border bg-white dark:bg-gray-800">
          <div className="border-b border-gray-200 dark:border-gray-600 pb-3 mb-3">
            <div className="flex justify-between items-start">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                <div className="flex space-x-2 items-center mb-2 sm:mb-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      renderUserProfilePicture(task?.assignBy) ??
                      "https://via.placeholder.com/150"
                    }
                    alt="https://via.placeholder.com/150"
                  />
                  <div className="">
                    <span className="font-bold">
                      {renderUserFullName(task?.assignBy)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-sm ">
                  <GoDotFill className="mt-1" />
                  <span className="ml-1">Created &nbsp; </span>
                  <TimeAgo date={task?.createdAt || new Date()} />
                </div>
              </div>

              <div className="text-gray-600 dark:text-gray-400">
                <BsThreeDots />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm mb-3">{task?.description}</div>
            {task?.fileUpload && (
              <div className="flex justify-center">
                <img
                  src={task?.fileUpload}
                  alt="Uploaded file"
                  className="w-full max-w-sm h-auto object-contain"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* User comments and drag-and-drop file upload */}
        <div className="container mx-auto mt-4">
          <div>
            {comments?.map((comment, index) => (
              <div className="border border-gray-800 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ">
                <div key={index} className="flex justify-between items-start">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={
                          renderUserProfilePicture(comment?.assignBy) ??
                          "https://via.placeholder.com/150"
                        }
                        alt="https://via.placeholder.com/150"
                      />
                      <span className="font-bold">
                        {renderUserFullName(comment?.commentedBy)}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                      <GoDotFill className="mt-1" />
                      <span className="ml-1">
                        commented &nbsp;{" "}
                        <TimeAgo date={comment?.createdAt || new Date()} />
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-600 dark:text-gray-400">
                    <BsThreeDots />
                  </div>
                </div>
                <div className=" mt-3 border border-gray-800 dark:border-gray-600 rounded-lg p-3 ">
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

          {/* Manager/Admin Actions */}
          <div className="flex lg:flex-row justify-end mt-4">
            {/* Manager/Admin Actions */}
            {isManagerOrAdmin && (
              <>
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
                      onClick={() => handleTaskStatusChange("Open")}
                    >
                      Open Task
                    </button>
                  )}
                  {task.status === "On Hold" && (
                    <button
                      className="px-4 py-1.5 bg-slate-800 text-white rounded-lg focus:outline-none ml-2"
                      onClick={() => handleTaskStatusChange("Open")}
                    >
                      Reopen Task
                    </button>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row justify-end mb-4">
                  {task.status === "Open" && (
                    <button
                      className="px-4 py-1.5 bg-slate-800 text-white rounded-lg ml-2"
                      onClick={() => handleTaskStatusChange("On Hold")}
                    >
                      Put on Hold
                    </button>
                  )}
                  {task.status === "In Review" && (
                    <button
                      className="px-4 py-1.5 bg-slate-800 text-white rounded-lg ml-2"
                      onClick={handleIssueClose}
                    >
                      Close Task
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Employee Actions */}
            {isAssignedEmployee && task.status === "Open" && (
              <div className="flex flex-col sm:flex-row justify-end mb-4">
                <button
                  className="px-4 py-1.5 bg-slate-800 text-white rounded-lg ml-2"
                  onClick={() => handleTaskStatusChange("In Review")}
                >
                  Submit for Review
                </button>
              </div>
            )}

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
