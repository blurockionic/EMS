import React, { useEffect, useState } from "react";

import ProjectCard from "../../../component/utilities-components/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const AllProject = () => {
  const [activeTab, setActiveTab] = useState(0);

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
      {/* Admon panel Design  */}
      {profile.role === "admin" ? (
        <div>
          <nav>
            <div>
              {/* Project Tabs */}
              <div className=" flex flex-row justify-between p-2 border">
                <div className="flex items-center font-semibold bg-slate-800 dark:bg-gray-600 text-white px-4 py-1.5 rounded-md shadow-inner hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer mx-1">
                  All Project
                </div>
                <Link to={"../newProject"}>
                  <div className="flex items-center font-semibold bg-slate-800 dark:bg-gray-600 text-white px-4 py-1.5 rounded-md shadow-inner hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer mx-1">
                    <IoMdAdd className="mr-2 text-xl" />
                    <span>New Project</span>
                  </div>
                </Link>
              </div>
            </div>
          </nav>
          <>
            <div className="w-[80%] mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 ">
              {allProject.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </>
        </div>
      ) : (
        // other users design
        <div>
          {/* Project Tabs */}
          <div className=" flex flex-row shadow-lg">
            <div
              className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
                activeTab === "All Project"
                  ? "border-b-4 border-blue-500 text-blue-500 font-bold"
                  : "bg-white"
              }`}
              onClick={() => handleTabClick("All Project")}
            >
              All Project
            </div>
          </div>
          {/* All Employees Details Table   */}
          {activeTab === "All Project" && (
            <div className="mt-4">
              {activeTab === "All Project" && (
                <div className="mt-5">
                  <div className="mb-2">
                    {/* handle search  */}
                    <div className="w-96 flex items-center border border-gray-300 rounded-md p-1 mx-1">
                      <span className="text-xl mx-1">&#128269;</span>
                      <input
                        type="text"
                        // onChange={(e) => handleSearch(e)}
                        placeholder="Search project name..."
                        className="w-96 p-2 rounded-lg outline-none"
                      />
                    </div>
                    {/* end handle search  */}
                  </div>

                  {allProject.length > 0 ? (
                    <div className="overflow-x-auto mt-5">
                      <table className="min-w-full table-auto">
                        <thead className="bg-slate-400">
                          <tr>
                            <th className="border px-4 py-2">S.No</th>
                            <th className="border px-4 py-2">Project Name</th>
                            <th className="border px-4 py-2">Team Name</th>

                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">
                              Submission Date
                            </th>
                            <th className="border px-4 py-2">Status</th>
                            {/* Add more columns as needed */}
                          </tr>
                        </thead>
                        <tbody>
                          {allProject.map((project, index) => (
                            <tr
                              key={project._id}
                              className={`text-center ${
                                index % 2 ? "bg-slate-100" : "bg-white"
                              }`}
                            >
                              <td className="border px-4 py-2">{index + 1}</td>
                              <td className="border px-4 py-2">
                                {project.projectName}
                              </td>

                              {/* <td className="border px-4 py-2">
                                {teamInfoData
                                  .filter((team) => team._id === project.teamId)
                                  .map((filteredTeam) => (
                                    <div key={filteredTeam._id}>
                                    
                                      {filteredTeam.teamName}
                                    </div>
                                  ))}
                              </td> */}
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
                                  <span className="text-green-800">
                                    Completed
                                  </span>
                                ) : (
                                  <span className="text-red-800">
                                    Not Completed
                                  </span>
                                )}
                              </td>

                              {/* Add more cells as needed */}
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
