import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";

const ProjectDetails = ({ projectId }) => {
  const [project, setProject] = useState({});
  const [task, setTask] = useState([]);
  const [taskReport, setTaskReport] = useState([]);


  useEffect(() => {
    //fetch specific project details
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/project/specific/${projectId}`,
          { withCredentials: true }
        );

        setProject(response.data.specificProject);
        const { success } = response.data;

        if (success) {
          //   alert(message);
        }
      } catch (error) {
        // Handle errors, e.g., alert(error.response.data.message);
      }
    };

    //fetch all task report
    const fetchAssignTask = async () => {
      try {
        const response = await axios.get(
          `${server}/task/specific/${projectId}`,
          { withCredentials: true }
        );

        setTask(response.data.specificProjectTask);
        // console.log(response)
        const { success } = response.data;

        if (success) {
          //   alert(message);
        }
      } catch (error) {
        // Handle errors, e.g., alert(error.response.data.message);
      }
    };

    const fetchTaskReport = async () => {
      try {
        const response = await axios.get(
          `${server}/taskReport/specific/${projectId}`,
          { withCredentials: true }
        );

        setTaskReport( response.data.allTaskReport)
        const { success } = response.data;

        if (success) {
          //   alert(message);
        }
      } catch (error) {
        // Handle errors, e.g., alert(error.response.data.message);
      }
    };

    // Invoke the fetchData function immediately
    fetchAssignTask();
    fetchData();
    fetchTaskReport()
  }, [projectId]); // Add projectId as a dependency


  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">{project.projectName}</h2>

        <div className="mb-4">
          <p className="text-gray-600">Description: {project.description}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">Priority: {project.priority}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Start Date: {project.projectStartDate}
          </p>
          <p className="text-gray-600">End Date: {project.projectEndDate}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Completed Percent: {project.completedPercent}%
          </p>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Status: {project.isCompleted ? "Completed" : "In Progress"}
          </p>
        </div>
      </div>

      <div>
        <div>
          <h1 className="font-bold"> All Task</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b"> Title</th>
                <th className="py-2 px-4 border-b"> Project</th>
                <th className="py-2 px-4 border-b"> Employee Name</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {task.map((task) => (
                <tr key={task._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {task.taskTitle}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {task.projectName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {task.employeeName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {task.taskAssignDate}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {task.isTaskCompleted ? "Completed" : "In Progress"}
                  </td>
                  {/* Add more table cells for additional task properties */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* task report  */}
      <div>
        <div>
          <h1 className="font-bold"> All Task Report</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b"> Title</th>
                <th className="py-2 px-4 border-b"> Employee Name</th>
                <th className="py-2 px-4 border-b">Rported Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {taskReport.map((taskReport) => (
                <tr key={taskReport._id}>
                  <td className="py-2 px-4 border-b text-center">
                    {taskReport.reportTitle}
                  </td>
                 
                  <td className="py-2 px-4 border-b text-center">
                    {taskReport.employeeName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {taskReport.createdAt}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {taskReport.isTaskCompleted ? "Completed" : "In Progress"}
                  </td>
                  {/* Add more table cells for additional task properties */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
