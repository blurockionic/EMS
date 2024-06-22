import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";

const ProjectDetails = ({ projectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenReport, setIsOpenReport] = useState(false);
  const [userReport, setUserReport] = useState([]);
  const [project, setProject] = useState({});
  const [task, setTask] = useState([]);
  const [taskReport, setTaskReport] = useState([]);

  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskReportId, setTaskReportId] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskReportDesc, setTaskReportDesc] = useState("");
  const [reportTitle, setReportTitle] = useState("");

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

        setTaskReport(response.data.allTaskReport);
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
    fetchTaskReport();
  }, [projectId]); // Add projectId as a dependency

  // handle on view report
  const handleOnViewReport = (task) => {
    const filteredTaskReport = taskReport.filter(
      (report) => report.taskId === task._id
    );
    setUserReport(filteredTaskReport);
    setIsOpenReport(true);
  };

  const openModal = (taskReport) => {
    setIsModalOpen(true);
    console.log(taskReport);
    setTaskReportId(taskReport._id);
    setEmployeeId(taskReport.employeeId);
    setTaskId(taskReport.taskId);
    setEmployeeName(taskReport.employeeName);
    setTaskTitle(taskReport.taskTitle);
    setTaskReportDesc(taskReport.reportDescription);
    setReportTitle(taskReport.reportTitle);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handle for change the checkbox
  const handleCheckboxChange = () => {
    setIsTaskCompleted(!isTaskCompleted);
  };

  // handle on task report feedback
  const handleOnTaskReportFeedback = async (e) => {
    const data = {
      isTaskCompleted,
      feedback,
      employeeId,
      taskId,
      taskReportId,
      employeeName,
      taskTitle,
      taskReportDesc,
      reportTitle,
    };

    try {
      const responce = await axios.post(
        `${server}/taskReportFeedback/new`,
        { data },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { success, message } = responce.data;
      if (success) {
        alert(message);
        setFeedback("");
        setIsTaskCompleted(false);
        setIsModalOpen(false);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <table class="w-full mx-auto mt-2 p-4 rounded shadow-md">
        <thead className="w-full">
          <tr className="w-full">
            <th
              className="px-2 py-1  text-[10px] uppercase font-semibold"
              colSpan={5}
            >
              Project Name
            </th>

            <th className="px-2 py-1  text-[10px] uppercase font-semibold">
              Status
            </th>

            <th className="mb-4 px-2 py-1 text-[10px] uppercase font-semibold">
              Priority
            </th>

            <th className="mb-4 px-2 py-1  text-[10px] uppercase font-semibold">
              Assign Date
            </th>

            <th className="mb-4 px-2 py-1 text-[10px] uppercase font-semibold">
              End Date
            </th>

            <th className="mb-4 px-2 py-1 text-[10px] uppercase font-semibold">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full">
            <td
              className=" px-2 py-2  text-center font-bold uppercase"
              colSpan={5}
            >
              {project.projectName}
            </td>
            <td className="mb-4  text-center">
              {project.isCompleted ? (
                <span className="bg-green-500 text-white">Completed</span>
              ) : (
                <span className="text-white bg-yellow-500 p-2">
                  In Progress
                </span>
              )}
            </td>

            <td className="mb-4  text-center capitalize">
              {project.priority}
            </td>

            <td className="mb-4  text-center text-green-500 font-semibold">
              {project.projectStartDate}
            </td>

            <td className="mb-4  text-center text-red-500 font-semibold">
              {project.projectEndDate}
            </td>

            <td className="mb-4  text-center">
              {project.completedPercent}%
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mb-4 p-4">
        <td className="Description"></td>
        <td colspan="6">
          <p class="">
            <span className="text-blue-700">Description:</span> <br />{" "}
            {project.description}
          </p>
        </td>
      </div>

      {/* table of task  */}
      <div className="flex justify-evenly items-center">
        <div className="w-full">
          <div className="w-full text-center p-2  uppercase">
            <h1 className="font-bold">Task</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-800">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Task Title</th>
                  <th className="py-2 px-4 border-b"> Employee</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {task.map((task) => (
                  <tr key={task._id}>
                    <td className="py-2 px-4 border-b text-center capitalize">
                      {task.taskTitle}
                    </td>
                    <td className="py-2 px-4 border-b text-center capitalize">
                      {task.employeeName}
                    </td>
                    <td className="py-2 px-4 border-b text-center capitalize">
                      {task.isTaskCompleted ? "Completed" : "In Progress"}
                    </td>

                    <td className="py-2 px-4 border-b text-center">
                      <button
                        className="px-4  py-2 font-bold text-blue-500 rounded-lg"
                        onClick={() => handleOnViewReport(task)}
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-3"></div>
        <div className="w-full">
        <div className="w-full text-center p-2  uppercase">
            <h1 className="font-bold">Task Report</h1>
          </div>
          {/* task report  */}
          {isOpenReport &&
            (userReport.length > 0 ? (
              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b"> Title</th>
                        <th className="py-2 px-4 border-b"> Employee Name</th>
                        <th className="py-2 px-4 border-b">Rported Date</th>
                        <th className="py-2 px-4 border-b">Git Link</th>
                        <th className="py-2 px-4 border-b">Status</th>
                        <th className="py-2 px-4 border-b">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userReport.map((taskReport) => (
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
                            <a
                              target="_blank"
                              href={taskReport.gitLink}
                              className="text-blue-600"
                            >
                              Open Link
                            </a>
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {taskReport.isTaskCompleted
                              ? "Completed"
                              : "In Progress"}
                          </td>
                          <td className="py-2 px-4 border-b text-center">
                            {taskReport.isTaskCompleted ? (
                              <button
                                disabled
                                className="px-4 py-2 bg-red-300 text-white font-bold rounded-sm cursor-not-allowed"
                                onClick={() => openModal(taskReport)}
                              >
                                Add Feedback
                              </button>
                            ) : (
                              <button
                                className="px-4 py-2 bg-green-600 text-white font-bold rounded-sm"
                                onClick={() => openModal(taskReport)}
                              >
                                Add Feedback
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="p-12 mt-4  text-center rounded-sm">
                <h1 className="font-bold uppercase">Report not available!</h1>
              </div>
            ))}
        </div>
      </div>

      {/* Modal component */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className=" p-2 rounded-lg z-10 ">
            {/* Your modal content goes here */}

            <div className="flex justify-between">
              <p className="ml-28">Review Task Report</p>
              <button
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-sm"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            {/* form for submit the feedback on report of specific Task  */}
            <div>
              <div>
                <label htmlFor="Feedback" className="block mb-2">
                  Feedback
                </label>
                <textarea
                  name="feedback"
                  id="feedback"
                  cols="50"
                  rows="5"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className=" border border-slate-800 outline-none rounded-sm"
                ></textarea>
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isTaskCompleted}
                    onChange={() => handleCheckboxChange()}
                  />
                  Approved Task Completion Request
                </label>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className=" w-full px-4 py-2 bg-green-600 text-white rounded-sm"
                  onClick={handleOnTaskReportFeedback}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectDetails;
