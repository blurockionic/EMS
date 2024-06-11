import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";

const EmpTasksDetails = () => {
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const getMyTask = async () => {
      try {
        const response = await axios.get(`${server}/task/all`, {
          withCredentials: true,
        });

        // console.log(response);
        setAllTask(response.data.allTask);
      } catch (error) {
        console.error("Error fetching task:", error.responce.data.message);
      }
    };

    getMyTask();
  }, []);
  return (
    <div>
      <div className="p-2">
        <h2 className="text-lg font-bold mb-2"> Task Details</h2>
        <div className="container mx-auto  ">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-slate-400">
              <tr>
                <th className="py-2 px-4 border-b">S.No</th>
                <th className="py-2 px-4 border-b">Task Name</th>
                <th className="py-2 px-4 border-b">Manager Name</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Request for Completion</th>
                <th className="py-2 px-4 border-b">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {allTask.map((task, index) => (
                <tr key={task._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {index + 1}
                  </td>

                  <td className="py-2 px-4 border-b text-center">
                    {task.taskTitle}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {task.managerName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {task.isTaskCompleted ? "Completed" : "In Progress"}
                  </td>
                  <td className="py-2 px-4 border-b flex items-center">
                    {task.isTaskCompleted ? (
                      "completed"
                    ) : task.isRequested ? (
                      <button
                        disabled
                        className="mx-auto bg-red-300 cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                        // onClick={() => handleReportClick(task)}
                      >
                        Requested
                      </button>
                    ) : (
                      <button
                        className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={() => handleReportClick(task)}
                      >
                        Request
                      </button>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    //   onClick={() => handleOnFeedback(task._id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpTasksDetails;
