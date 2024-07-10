import React, { useEffect, useState } from "react";

import ProjectCard from "../../../component/utilities-components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { LuGalleryVerticalEnd, LuLayoutList } from "react-icons/lu";

const AllProject = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState("gallery");
  //fetch all the details of project
  const dispatch = useDispatch();

  const projectState = useSelector((state) => state.project);
  const {
    allProject,
    status: projectStatus,
    error: projectError,
  } = projectState;

  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  console.log("all project data me h kuchh ", allProject);

  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // console.log(allProject);
  return (
    <>
      {profile.role === "admin" ? (
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
                    <Link to={"../newProject"}>
                      <button
                        className={`flex items-center p-2 rounded ${
                          activeTab === "Create New Project"
                            ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 text-blue-500"
                            : "bg-gray-500 dark:hover:bg-[#21262C] hover:bg-slate-400 dark:bg-gray-700"
                        }`}
                      >
                        <IoMdAdd className="mr-2 text-xl text-white dark:text-gray-300" />
                        <span>New Project</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          {viewMode === "gallery" ? (
            <div className="w-[80%] mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
              {allProject.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto mt-5 w-[80%] mx-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="border px-4 py-2">S.No</th>
                    <th className="border px-4 py-2">Project Name</th>
                    <th className="border px-4 py-2">Team Name</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Start Date</th>
                    <th className="border px-4 py-2">Submission Date</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allProject?.map((project, index) => (
                    <tr
                      key={project._id}
                      className={`text-center ${
                        index % 2
                          ? "bg-gray-100 dark:bg-gray-800"
                          : "bg-white dark:bg-gray-900"
                      }`}
                    >
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        {project?.projectName}
                      </td>
                      <td className="border px-4 py-2">{project.teamName}</td>
                      <td className="border px-4 py-2">
                        {project?.projectDescription}
                      </td>
                      <td className="border px-4 py-2">{project?.startDate}</td>
                      <td className="border px-4 py-2">{project?.endDate}</td>
                      <td className="border px-4 py-2">
                        {project.isCompleted ? (
                          <span className="text-green-800 dark:text-green-400">
                            Completed
                          </span>
                        ) : (
                          <span className="text-red-800 dark:text-red-400">
                            Not Completed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTab === "All Project"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white dark:bg-gray-800"
              }`}
              onClick={() => handleTabClick("All Project")}
            >
              All Project
            </div>
          </div>
          {activeTab === "All Project" && (
            <div className="mt-4">
              <div className="w-96 flex items-center border border-gray-300 dark:border-gray-700 rounded-md p-1 mx-1">
                <span className="text-xl mx-1">&#128269;</span>
                <input
                  type="text"
                  placeholder="Search project name..."
                  className="w-96 p-2 rounded-lg outline-none bg-white dark:bg-gray-900"
                />
              </div>
              {allProject.length > 0 ? (
                <div className="overflow-x-auto mt-5">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-200 dark:bg-gray-700">
                      <tr>
                        <th className="border px-4 py-2">S.No</th>
                        <th className="border px-4 py-2">Project Name</th>
                        <th className="border px-4 py-2">Team Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Start Date</th>
                        <th className="border px-4 py-2">Submission Date</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProject.map((project, index) => (
                        <tr
                          key={project._id}
                          className={`text-center ${
                            index % 2
                              ? "bg-gray-100 dark:bg-gray-800"
                              : "bg-white dark:bg-gray-900"
                          }`}
                        >
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td className="border px-4 py-2">
                            {project.projectName}
                          </td>
                          <td className="border px-4 py-2">
                            {project.teamName}
                          </td>
                          <td className="border px-4 py-2">
                            {project.description}
                          </td>
                          <td className="border px-4 py-2">
                            {project.projectStartDate}
                          </td>
                          <td className="border px-4 py-2">
                            {project.projectEndDate}
                          </td>
                          <td className="border px-4 py-2">
                            {project.isCompleted ? (
                              <span className="text-green-800 dark:text-green-400">
                                Completed
                              </span>
                            ) : (
                              <span className="text-red-800 dark:text-red-400">
                                Not Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center mt-5 p-4 bg-gray-200 dark:bg-gray-700">
                  <h1 className="uppercase font-bold">
                    Sorry! Data not available!
                  </h1>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllProject;
