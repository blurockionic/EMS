import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { fetchTeams } from "../../../Redux/slices/teamSlice";
import { server } from "../../../App";
import { LuGalleryVerticalEnd, LuLayoutList } from "react-icons/lu";
const ManagerProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    reportTitle: "",
    reportDescription: "",
    isProjectCompleted: false,
    projectId: "",
    managerId: "",
    adminId: "",
  });
  const [employeeData, setEmployeeData] = useState([]);
  const [managerProject, setManagerProject] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const [selectedProject, setSelectedProject] = useState({});

  const { teams } = useSelector((state) => state.team);
  const { allProject, status: projectStatus } = useSelector(
    (state) => state.project
  );
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  useEffect(() => {
    setManagerProject(
      allProject.filter((project) => project.projectManager === profile._id)
    );
  }, [profile, allProject]);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        setEmployeeData(response.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handleReportClick = (project) => {
    setIsModalOpen(true);
    setFormData({
      ...formData,
      managerId: project.managerId,
      adminId: project.adminId,
      projectId: project._id,
      reportTitle: project.projectName,
    });
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/reportProject/new`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const { success, message, reportProject } = response.data;
      localStorage.setItem("id", reportProject.managerId);
      setIsModalOpen(false);
      if (success) {
        setFormData({
          reportTitle: "",
          reportDescription: "",
          isProjectCompleted: false,
          projectId: "",
          managerId: "",
          adminId: "",
        });
        alert(message);
        navigate("../managerreport");
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  };

  const handleAssignTask = (project) => {
    navigate("../newTask", { state: { project } });
  };

  const handleOnShowMore = (projectId) => {
    if (projectId) {
      console.log("Project ID data:", projectId);
      navigate("../projectdetails", {
        state: { projectId: projectId.toString() },
      });
    }
  };

  const empData = employeeData.filter(
    (singleUser) => singleUser.designationType === "employee"
  );

  return (
    <>
      <div>
        <nav>
          <div>
            <div className="flex flex-row justify-between border-b border-gray-300 dark:border-gray-700">
              <div className="flex flex-row">
                <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
                  <div className="flex items-center font-semibold bg-slate-800 dark:bg-gray-600 text-white px-4 py-1.5 rounded-md shadow-inner hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer mx-1">
                    All Project
                  </div>
                </div>
              </div>

              <div className="flex flex-row">
                <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
                  <button
                    className={`tooltip-class p-2 rounded ${
                      viewMode === "table"
                        ? "bg-slate-900 dark:bg-gray-800"
                        : "bg-gray-500 dark:bg-gray-700"
                    }`}
                    onClick={() => setViewMode("table")}
                    data-tip="Switch to Table View"
                  >
                    <LuLayoutList className="text-white dark:text-gray-300" />
                  </button>
                  <button
                    className={`tooltip-2-class p-2 rounded ${
                      viewMode === "gallery"
                        ? "bg-slate-900 dark:bg-gray-800"
                        : "bg-gray-500 dark:bg-gray-700"
                    }`}
                    onClick={() => setViewMode("gallery")}
                    data-tip="Switch to Gallery View"
                  >
                    <LuGalleryVerticalEnd className="text-white dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div>
        {viewMode === "table" ? (
          <>
            {managerProject?.length > 0 ? (
              <div className="overflow-x-auto mt-5">
                <table className="min-w-full table-auto">
                  <thead className="bg-slate-400">
                    <tr>
                      <th className="border px-4 py-2">S.No</th>
                      <th className="border px-4 py-2">Project Name</th>
                      <th className="border px-4 py-2">Start Date</th>
                      <th className="border px-4 py-2">Submission Date</th>
                      <th className="border px-4 py-2">Team Name</th>
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Assign Task</th>
                      <th className="border px-4 py-2">Action</th>
                      <th className="border px-4 py-2">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managerProject.map((project, index) => (
                      <tr key={project._id} className="text-center">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          {project.projectName}
                        </td>
                        <td className="border px-4 py-2">
                          {project.projectStartDate}
                        </td>
                        <td className="border px-4 py-2">
                          {project.projectEndDate}
                        </td>
                        <td className="border px-4 py-2">
                          {teams
                            .filter((team) => team._id === project.teamId)
                            .map((filteredTeam) => (
                              <div key={filteredTeam._id}>
                                {filteredTeam.teamName}
                              </div>
                            ))}
                        </td>
                        <td className="border px-4 py-2">
                          {project.isCompleted ? (
                            <span className="text-green-800">Completed</span>
                          ) : (
                            <span className="text-red-800">Not Completed</span>
                          )}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className={`mx-auto font-bold py-2 px-4 rounded ${
                              project.isCompleted
                                ? "bg-red-300 cursor-not-allowed text-white"
                                : "text-blue-500"
                            }`}
                            onClick={() =>
                              !project.isCompleted && handleAssignTask(project)
                            }
                            disabled={project.isCompleted}
                          >
                            Assign Task
                          </button>
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className={`mx-auto font-bold py-2 px-4 rounded ${
                              project.isCompleted
                                ? "bg-red-300 cursor-not-allowed text-white"
                                : "text-blue-500"
                            }`}
                            onClick={() =>
                              !project.isCompleted && handleReportClick(project)
                            }
                            disabled={project.isCompleted}
                          >
                            Report
                          </button>
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="mx-auto text-blue-500 font-bold py-2 px-4 rounded"
                            onClick={() => handleOnShowMore(project._id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center mt-5 p-4 bg-slate-200">
                <h1 className="uppercase font-bold">
                  Sorry! Data not available!
                </h1>
              </div>
            )}
          </>
        ) : null}

        {viewMode === "gallery" ? (
          <>
            {" "}
            <div> gallery view comming soon.... </div>{" "}
          </>
        ) : null}
      </div>

      {/* show modal for report the project  */}

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-6 w-[500px] mx-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className="ml-40 uppercase font-bold text-xl text-blue-500">
                    Report Project
                  </h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute -top-10 right-0"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              {/* Your modal content goes here */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reportTitle"
                  >
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    name="reportTitle"
                    disabled
                    value={formData.reportTitle}
                    onChange={handleChange}
                    className="capitalize appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter report title"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reportDescription"
                  >
                    Report Description
                  </label>
                  <textarea
                    id="reportDescription"
                    name="reportDescription"
                    value={formData.reportDescription}
                    onChange={handleChange}
                    className="appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter report description"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="isProjectCompleted"
                  >
                    Is Project Completed?
                  </label>
                  <input
                    type="checkbox"
                    id="isProjectCompleted"
                    name="isProjectCompleted"
                    checked={formData.isProjectCompleted}
                    onChange={handleChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Check if project is completed</span>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="w-full  uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerProject;
