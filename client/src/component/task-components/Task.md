import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { specificProjectTask } from "../../Redux/slices/taskSlice";
import TimeAgo from "../utilities-components/TimeAgo"; // Ensure this path is correct
import { GoIssueClosed, GoIssueOpened, GoIssueReopened } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Loader from "../utilities-components/Loader";
import { fetchTags } from "../../Redux/slices/tagSlice";

const Task = ({ projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users } = useSelector((state) => state.user);
  const { tags } = useSelector((state) => state.tags);

  const { projectSpecificTasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (projectId) {
      dispatch(specificProjectTask(projectId));
    }
    dispatch(fetchTags());
  }, [dispatch, projectId]);

  const renderUserFullName = (userId) => {
    const assignedBy = users.find((user) => user._id === userId);
    return assignedBy
      ? `${assignedBy.firstName} ${assignedBy.lastName}`
      : "Unknown User";
  };

  const handleTaskClick = (taskId) => {
    navigate(`../singleTaksDetails/${taskId}`);
  };

  const tasks = projectSpecificTasks?.tasks || [];

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-5xl">
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-bold text-gray-950 dark:text-black">
              {error}
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              No tasks available
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 shadow-md mb-4 p-6 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4 lg:mb-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white capitalize">
                    <span className="ml-2">{task.title}</span>
                    <span className="text-xl sm:text-base lg:text-2xl ml-2">
                      #{task.taskId}
                    </span>
                  </h1>
                </div>
                <button
                  onClick={() => handleTaskClick(task._id)}
                  className="bg-blue-600 dark:bg-blue-500 text-white py-1.5 px-4 rounded transition duration-300 hover:bg-blue-700 dark:hover:bg-blue-400 mt-2 lg:mt-0"
                >
                  View Details
                </button>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-0">
                  <button className="inline-block py-1.5 px-4 rounded-full bg-slate-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 transition duration-300 mb-2 sm:mb-0">
                    <span className="flex items-center">
                      {task.status === "Close" && (
                        <>
                          <GoIssueClosed className="text-xl sm:text-2xl text-purple-800 mr-2" />
                          <span className="font-semibold text-sm sm:text-base">
                            Close
                          </span>
                        </>
                      )}
                      {task.status === "Open" && (
                        <>
                          <GoIssueOpened className="text-xl sm:text-2xl text-green-500 mr-2" />
                          <span className="font-semibold text-sm sm:text-base">
                            Open
                          </span>
                        </>
                      )}
                      {task.status === "In Review" && (
                        <>
                          <GoIssueReopened className="text-lg sm:text-xl text-blue-500 mr-2" />
                          <span className="font-semibold text-sm sm:text-base">
                            In Review
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                  <div className="text-sm flex items-center ml-2 sm:ml-4">
                    <span className="mr-1">Assigned by</span>
                    <span className="mx-2 font-semibold capitalize">
                      {renderUserFullName(task.assignBy)}
                    </span>
                    <span className="mr-1 text-xl">•</span>
                    <span className="mx-2">
                      Assigned: <TimeAgo date={task.createdAt || new Date()} />
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-row items-center mt-2 sm:mt-0">
                  <div className="text-sm flex items-center ml-2 sm:ml-4">
                    <span className="mr-1">Tags</span>
                    <div className="bg-slate-200 dark:bg-slate-400 px-2 py-1 rounded ml-2 sm:ml-1">
                      <span className="mr-1">•</span>
                      <span className="font-semibold capitalize">
                        {task.tags
                          ?.map((tag) => tag.tagName ?? "no tag available")
                          .join(", ")}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm flex items-center ml-2 sm:ml-4 mt-2 sm:mt-0">
                    <span className="mr-1">Due date</span>
                    <div className="bg-slate-200 dark:bg-slate-400 px-2 py-1 rounded ml-2 sm:ml-1">
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
          ))
        )}
      </div>
    </div>
  );
};

export default Task;
