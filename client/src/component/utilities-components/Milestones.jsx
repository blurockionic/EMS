import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMilestonesByProjectId } from "../../Redux/slices/milestones/fetchMilestonesSlice";
import TimeAgo from "./TimeAgo";
import { GoAlert } from "react-icons/go";
import { closeMilestone } from "../../Redux/slices/milestones/milestoneSlice";

import { GoIssueClosed, GoIssueOpened } from "react-icons/go";

const Milestones = ({ projectId }) => {
  const [filter, setFilter] = useState("open");
  const dispatch = useDispatch();
  const { milestones, loading, error } = useSelector(
    (state) => state.fetchMilestones
  );

  const handleClose = async (milestoneId, currentStatus) => {
    try {
      const response = await dispatch(closeMilestone(milestoneId));
      console.log("Milestone status updated successfully:", response);
    } catch (error) {
      console.error("Error updating milestone status:", error);
      // Handle error (e.g., show error message)
    }
  };



  useEffect(() => {
    if (projectId) {
      dispatch(fetchMilestonesByProjectId(projectId));
    }
  }, [dispatch, projectId]);

  const handleEdit = (milestoneId) => {
    // Handle edit functionality
  };



  const handleDelete = (milestoneId) => {
    // Handle delete functionality
  };

  // Filtered milestones based on the current filter state
  const filteredMilestones = milestones.filter((milestone) =>
    filter === "open"
      ? milestone.status === "Open"
      : milestone.status === "Closed"
  );

  // Count of open and closed milestones
  const openCount = milestones.filter(
    (milestone) => milestone.status === "Open"
  ).length;
  const closedCount = milestones.filter(
    (milestone) => milestone.status === "Closed"
  ).length;

  return (
    <div className="w-[90%] mx-auto mt-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center bg-slate-800 text-white font-bold py-1.5 px-4 rounded space-x-2">
          <span className="text-2xl">🎯</span>
          <span>Milestones</span>
        </div>
        <Link
          to={`../newMilestone/${projectId}`}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded"
        >
          New milestone
        </Link>
      </div>

      {loading && <p>Loading milestones...</p>}
      {error && <p>Error: {error}</p>}

      <div className="border ">
        <div className=" space-x-2 flex px-2 py-1  ">
          <button
            className={` py-2 rounded focus:outline-none ${
              filter === "open" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("open")}
          >
            <div className="flex flex-wrap border py-1.5 px-2 rounded-md space-x-1">
              <GoIssueOpened className="text-xl mt-1" />
              <span>Open</span>

              <span>{openCount}</span>
            </div>
          </button>
          <button
            className={`  py-2 rounded focus:outline-none ${
              filter === "closed" ? "text-blue-500" : "text-gray-700"
            }`}
            onClick={() => setFilter("closed")}
          >
            <div className="flex flex-wrap border py-1.5 px-2 rounded-md space-x-1 ">
              <GoIssueClosed className="text-xl mt-1" />
              <span>Closed</span>
              <span>{closedCount}</span>
            </div>
          </button>
        </div>

        <div>
          {/* Display milestones */}
          {!loading && filteredMilestones.length === 0 && (
            <p>No milestones found.</p>
          )}

          <ul className="space-y-4">
            {filteredMilestones.map((milestone) => (
              <li
                key={milestone._id}
                className=" shadow-md p-4 dark:bg-transparent border-t"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="mb-2">
                      {milestone.description ?? "No description"}
                    </p>
                    <div className="flex flex-row items-center space-x-2">
                      <GoAlert className="text-xl" />
                      <span>Due Date:</span>
                      <TimeAgo date={new Date(milestone.dueDate)} />
                    </div>
                  </div>

                  <div className="flex flex-row justify-end items-center space-x-2">
                    <span
                      className="text-blue-500 hover:text-blue-700 font-bold cursor-pointer"
                      onClick={() => handleEdit(milestone._id)}
                    >
                      Edit
                    </span>
                    <span
                      className="text-blue-500 hover:text-blue-700 font-bold cursor-pointer"
                      onClick={() =>
                        handleClose(milestone._id, milestone.status)
                      }
                    >
                      {milestone.status === "Open" ? "Close" : "Reopen"}
                    </span>
                    <span
                      className="text-red-500 hover:text-red-700 font-bold cursor-pointer"
                      onClick={() => handleDelete(milestone._id)}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
