import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../../Redux/slices/specificProjectSlice";
import { TiDocumentText } from "react-icons/ti";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiLoaderCircle } from "react-icons/bi";
import { MdAttractions } from "react-icons/md";

import { RxPerson } from "react-icons/rx";
import { GrOverview, GrTechnology } from "react-icons/gr";
import { CgCalendarNext } from "react-icons/cg";
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

  if (projectStatus === "loading") {
    return <div> loading .... </div>;
  }

  const TabButton = ({
    activeTab,
    index,
    handleChangeTab,
    icon: Icon,
    label,
  }) => (
    <div
      className={`tab-btn flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D] rounded-md text-start ${
        activeTab === index
          ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200"
          : "dark:hover:bg-[#21262C] hover:bg-slate-200"
      }`}
      onClick={() => handleChangeTab(index)}
    >
      <Icon className="text-lg mr-2 mt-1" />
      <span>{label}</span>
    </div>
  );

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
                  activeTab === 2
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(2)}
              >
                <span className={``}>
                  <BiLoaderCircle className="text-lg mr-2 mt-1" />
                </span>
                <span>Phases</span>
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
                  <GrTechnology className="text-lg mr-2 mt-1" />
                </span>
                <span>Tools and Techs</span>
              </div>

              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D] rounded-md text-start ${
                  activeTab === 5
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(5)}
              >
                <span className={``}>
                  <MdAttractions className="text-lg mr-2 mt-1" />
                </span>
                <span>Tracking</span>
              </div>

              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D] rounded-md text-start ${
                  activeTab === 6
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(6)}
              >
                <span className={``}>
                  <TiDocumentText className="text-lg mr-2 mt-1" />
                </span>
                <span>Documentation</span>
              </div>
              <div
                className={`tab-btn  flex cursor-pointer transition duration-300 ease-in-out px-4 py-1 dark:border-[#30363D] rounded-md text-start ${
                  activeTab === 7
                    ? "border-2 dark:bg-[#21262C] font-semibold bg-slate-200 "
                    : "dark:hover:bg-[#21262C] hover:bg-slate-200"
                }`}
                onClick={() => handleChangeTab(7)}
              >
                <span className={``}>
                  <CgCalendarNext className="text-lg mr-2 mt-1" />
                </span>
                <span>Others</span>
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
                      {specificProject?.projectName ?? "N/A"}
                    </p>
                  </div>

                  <div className=" flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">Description </span>

                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectDescription ?? "No description"}
                    </p>
                  </div>
                  <div className=" flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">Objective </span>

                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectObjectives ?? " No data present"}
                    </p>
                  </div>
                  <div className=" flex flex-col  mt-4 ">
                    <span className=" pl-2 font-semibold">Type</span>

                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectType ?? "No project type"}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between ">
                    <div className=" w-[40%] flex flex-col  mt-4 ">
                      <span className=" pl-2 font-semibold">Category</span>

                      <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.projectCategory ?? "No project type"}
                      </p>
                    </div>
                    <div className=" w-[40%] flex flex-col  mt-4 ">
                      <span className=" pl-2 font-semibold">Scope</span>

                      <p className="flex-wrap py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.projectScope ??
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
                      {specificProject?.qualityStandards ??
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

                  <div className=" flex flex-col ">
                    <span className=" pl-2 font-semibold">Name</span>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.client?.name ?? "N/A "}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between">
                      <div className=" w-[40%] flex flex-col mt-4 ">
                        <span className=" pl-2 font-semibold">Email</span>
                        <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                          {specificProject?.client?.contactInformation?.email ??
                            "N/A"}
                        </p>
                      </div>
                      <div className=" w-[40%] flex flex-col mt-4 ">
                        <span className=" pl-2 font-semibold">Phone</span>
                        <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                          +91{" "}
                          {specificProject?.client?.contactInformation
                            ?.phoneNumber ?? "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className=" w-[40%] flex flex-col mt-4 ">
                      <span className=" pl-2 font-semibold">Address</span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                       
                        {specificProject?.client?.contactInformation?.address ??
                          "N/A"}
                      </p>
                    </div>
                  </div>
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
                          {specificProject?.actualBudget ?? "N/A"}
                        </p>
                      </div>
                      <div className=" w-[40%] flex flex-col mt-4 ">
                        <span className=" pl-2 font-semibold">
                          Estimated Budget
                        </span>
                        <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                          {specificProject?.estimatedBudget ?? "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className=" flex flex-col mt-4 ">
                      <span className=" pl-2 font-semibold">
                        Billing frequency{" "}
                      </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.billingFrequency ?? "N/A"}
                      </p>
                    </div>
                    <div className=" flex flex-col mt-4">
                      <span className=" pl-2 font-semibold">
                        Budget tracking{" "}
                      </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.budgetTracking ?? "N/A"}
                      </p>
                    </div>
                    <div className=" flex flex-col mt-4">
                      <span className=" pl-2 font-semibold">Payment term </span>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.paymentTerms ?? "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mt-4  text-xl font-semibold mb-2">
                    Final Delivery
                  </h2>

                  <div className=" flex flex-col mt-4 ">
                    <span className=" pl-2 font-semibold">Final deliver</span>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.finalDeliverables ?? "N/A"}
                    </p>
                  </div>

                  <div className="">
                    <h2 className=" mt-4 text-xl font-semibold mb-2">
                      Deliverables
                    </h2>
                    <div>
                      <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                        {specificProject?.deliverables?.map((team, index) => (
                          <li key={index}>{team ?? "N/A"}</li>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${activeTab === 2 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-semibold mb-2">Project Phases</h2>
                <div>
                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.phases?.map((phase, index) => (
                        <li key={index}>{phase ?? "N/A"}</li>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-semibold mb-2">Team members</h2>
                <div>
                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.teamMembers?.map((team, index) => (
                        <li key={index}>{team ?? "N/A"}</li>
                      ))}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">Project Manger</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.projectManager}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 4 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-semibold mb-2">Tools and Tech</h2>
                <div>
                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.toolsAndTechnologies?.map(
                        (tech, index) => (
                          <li key={index}>{tech ?? "N/A"}</li>
                        )
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Requierd Resourses{" "}
                  </h2>

                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.requiredResources?.map(
                        (reso, index) => (
                          <li key={index}>{reso ?? "N/A"}</li>
                        )
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {" "}
                    Resourses status
                  </h2>

                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.resourceAllocation}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 5 ? "block" : "hidden"}`}>
                <h2 className="text-xl font-semibold mb-2">Tracking</h2>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">Status Report</h2>

                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.statusReports ?? "N/A"}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Progress Tracking
                  </h2>

                  <div>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.progressTracking ?? "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 6 ? "block" : "hidden"}`}>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">Documentation</h2>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">Design</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.documentation?.design}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">Project Plan</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.documentation?.projectPlan}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">Requirements</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.documentation?.requirements}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">
                      Technical Specifications
                    </h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.documentation?.technicalSpecifications}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">Test Plans</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.documentation?.testPlans}
                    </p>
                  </div>

                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">User Manuals</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.documentation?.userManuals}
                    </p>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">
                      Archiving Documents
                    </h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      {specificProject?.archivingDocumentation}
                    </p>
                  </div>
                </div>
              </div>
              <div className={`${activeTab === 7 ? "block" : "hidden"} `}>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">Other Details</h2>
                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">IP Management</h3>
                    <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                      All IP rights reserved to the client
                    </p>
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-1">KPIs</h3>
                    <ul className="list-disc pl-6">
                      <li className="py-1.5 pl-2 border-b dark:border-[#30363D] text-lg font-normal dark:bg-[#161B22] dark:text-slate-400">
                        On-time delivery
                      </li>
                      <li className="py-1.5 pl-2 border-b dark:border-[#30363D] text-lg font-normal dark:bg-[#161B22] dark:text-slate-400">
                        Budget adherence
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
