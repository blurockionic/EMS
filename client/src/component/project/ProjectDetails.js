import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../Redux/slices/specificProjectSlice";
import { TiDocumentText } from "react-icons/ti";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLoaderCircle } from "react-icons/bi";

import { RxPerson } from "react-icons/rx";
import { GrOverview } from "react-icons/gr";
const ProjectDetails = ({ projectId }) => {
  //fetch all the details of project

  console.log("id", projectId);
  const dispatch = useDispatch();
  // Fetching projects
  const projectState = useSelector((state) => state.project);
  const {
    allProject,
    status: projectStatus,
    error: projectError,
  } = projectState;

  const { specificProject, status, error } = useSelector(
    (state) => state.specificProject
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);
  console.log(projectId);
  console.log("specific project of specific id ", status, specificProject);

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (index) => {
    setActiveTab(index);
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!specificProject) {
    return <div>No project found</div>;
  }

  return (
    <>
      <div>
        <div className="max-w-[90%] mx-auto p-2  ">
          <div className=" flex flex-row space-x-8 ">
            <div className="flex flex-col space-y-1 mb-6 w-[14rem]">
              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D]  rounded-md text-start ${
                  activeTab === 0
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(0)}
              >
                <span className={``}>
                  <GrOverview className="text-lg mr-2 mt-1" />
                </span>
                <span>Overview</span>
              </div>

              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D]  rounded-md text-start ${
                  activeTab === 1
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(1)}
              >
                <span className={``}>
                  <RxPerson className="text-lg mr-2 mt-1" />
                </span>
                <span>Client Details</span>
              </div>

              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D]   rounded-md text-start ${
                  activeTab === 3
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(3)}
              >
                <span className={``}>
                  <BiLoaderCircle className="text-lg mr-2 mt-1" />
                </span>
                <span>Phases</span>
              </div>

              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D]   rounded-md text-start ${
                  activeTab === 2
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(2)}
              >
                <span className={``}>
                  <HiOutlineUserGroup className="text-lg mr-2 mt-1" />
                </span>
                <span>Team Details</span>
              </div>

              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D] rounded-md text-start ${
                  activeTab === 4
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(4)}
              >
                <span className={``}>
                  <TiDocumentText className="text-lg mr-2 mt-1" />
                </span>
                <span>Documentation</span>
              </div>
            </div>

            <div className="flex-1">
              {/* Content of tabs */}
              <div className={`${activeTab === 0 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-bold mb-2 border-b-2 p-2 dark:border-[#30363D]">
                  Project details
                </h2>

                <div className="">
                  <div className=" flex flex-col ">
                    <span className=" pl-2 font-semibold">Project Name</span>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-bold rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectName || "N/A"}
                    </p>
                  </div>

                  <div className=" flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">Description </span>

                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectDescription || "No description"}
                    </p>
                  </div>
                  <div className=" flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">Objective </span>

                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectObjectives || " No data present"}
                    </p>
                  </div>
                  <div className=" flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">Type</span>

                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectType || "No project type"}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between ">
                    <div className=" w-[40%] flex flex-col  mt-4 ">
                      <span className=" pl-2 font-semibold">Category</span>

                      <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.projectCategory || "No project type"}
                      </p>
                    </div>
                    <div className=" w-[40%] flex flex-col  mt-4 ">
                      <span className=" pl-2 font-semibold">Scope</span>

                      <p className="flex-wrap py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.projectScope ||
                          "No scope mention by creater"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between mt-4">
                    <div className="w-[40%]">
                      <span className=" pl-2 font-semibold"> Start Date</span>
                      <p className="flex-wrap py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {new Date(
                          specificProject.startDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-[40%]">
                      <span className=" pl-2 font-semibold"> End Date</span>
                      <p className="flex-wrap py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {new Date(specificProject.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">
                      Quality Standards
                    </span>

                    <p className="flex-wrap py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.qualityStandards ||
                        "No scope mention by creater"}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Client Information
                  </h2>
                  <p>Name: {specificProject.client}</p>
                  there is need to get the data of client, project contain only
                  object id of client <br />
                  <span className="text-3xl">Comming Soon..............</span>
                </div>
                <div>
                  <h2 className="mt-4  text-xl font-semibold mb-2">
                    Payment Details
                  </h2>

                  <div>

                    <div className="flex flex-row justify-between">
                    <div className=" w-[40%] flex flex-col mt-4 ">
                      <span className=" pl-2 font-semibold">
                        Actual budget{" "}
                      </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.actualBudget || "N/A"}
                      </p>
                    </div>
                    <div className=" w-[40%] flex flex-col mt-4 ">
                      <span className=" pl-2 font-semibold">
                        Estimated Budget
                      </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.estimatedBudget || "N/A"}
                      </p>
                    </div>
                    </div>
                    



                    <div className=" flex flex-col mt-4 ">
                      <span className=" pl-2 font-semibold">
                        Billing frequency{" "}
                      </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.billingFrequency || "N/A"}
                      </p>
                    </div>
                    <div className=" flex flex-col mt-4">
                      <span className=" pl-2 font-semibold">
                        Budget tracking{" "}
                      </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.budgetTracking || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-semibold mb-2">Project Details</h2>
                <p>Objectives: {specificProject.projectObjectives}</p>
                <p>Project Type: {specificProject.projectType}</p>
                <p>Project Category: {specificProject.projectCategory}</p>
                {/* Add other project details */}
              </div>
              <div className={`${activeTab === 4 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-semibold mb-2">Documentation</h2>
                <p>Project Plan: {specificProject.documentation.projectPlan}</p>
                <p>
                  Requirements: {specificProject.documentation.requirements}
                </p>
                <p>Design: {specificProject.documentation.design}</p>
                <p>
                  Technical Specifications:{" "}
                  {specificProject.documentation.technicalSpecifications}
                </p>
                {/* Add other documentation details */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
