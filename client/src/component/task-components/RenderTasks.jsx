import React from "react";
import TimeAgo from "../utilities-components/TimeAgo";
import {
  GoDotFill,
  GoIssueClosed,
  GoIssueOpened,
  GoIssueReopened,
} from "react-icons/go";
import { AiOutlineIssuesClose } from "react-icons/ai";

/**
 * A table component to render a list of tasks with their details and clickable to navigate to the task details page
 * @param {Array} tasksList - A list of tasks objects
 * @param {Function} handleTaskDetails - Function to navigate to a task details page
 * @param {Array} users - An array of all available users
 * @returns A table with tasks details
 */
const RenderTasks = ({ tasksList, handleTaskDetails, users }) => (
  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {tasksList?.map((task, index) => (
        <tr
          key={task._id || index}
          className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-150 cursor-pointer h-16"
          onClick={() => handleTaskDetails(task._id)}
        >
          <td className="px-4 py-2 flex flex-col md:flex-row flex-grow-4">
            <span className="flex items-center">
              {/* Close Status */}
              {task?.status === "Close" && (
                <span className="relative group">
                  <GoIssueClosed className="text-lg sm:text-xl text-purple-800 mr-2" />
                  <span className="absolute left-full hidden group-hover:inline-flex items-center font-semibold text-sm bg-gray-800 text-white p-1 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 shadow-lg">
                    Close
                  </span>
                </span>
              )}

              {/* Open Status */}
              {task?.status === "Open" && (
                <span className="relative group">
                  <GoIssueOpened className="text-lg sm:text-xl text-green-500 mr-2" />
                  <span className="absolute left-0 hidden group-hover:inline-flex items-center font-semibold text-sm bg-gray-800 text-white p-1 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 shadow-lg">
                    Open
                  </span>
                </span>
              )}

              {/* In Review Status */}
              {task?.status === "In Review" && (
                <span className="relative group">
                  <GoIssueReopened className="text-lg sm:text-xl text-blue-500 mr-2" />
                  <span className="absolute hidden group-hover:inline-flex items-center font-semibold text-sm bg-gray-800 text-white p-1 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 shadow-lg">
                    In Review
                  </span>
                </span>
              )}

              {/* On Hold Status */}
              {task?.status === "On Hold" && (
                <span className="relative group">
                  <AiOutlineIssuesClose className="text-lg sm:text-xl text-red-500 mr-2" />
                  <span className="absolute hidden group-hover:inline-flex items-center font-semibold text-sm bg-gray-800 text-white p-1 rounded-md transition-opacity duration-200 opacity-0 group-hover:opacity-100 shadow-lg">
                    On Hold
                  </span>
                </span>
              )}
            </span>

            <div className="flex flex-col">
              <span className="font-bold text-xl hover:text-blue-700 dark:hover:text-blue-500">
                {task.title}
              </span>
              <div className="flex flex-col md:flex-row">
                <span> #{task.taskId} created by </span>
                <span className="font-semibold mx-2">
                  {users.find((user) => user._id === task.assignBy)?.firstName}{" "}
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

export default RenderTasks;
