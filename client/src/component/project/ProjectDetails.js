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
  const dispatch = useDispatch();
  const { specificProject, status, error } = useSelector(
    (state) => state.specificProject
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  const [activeTab, setActiveTab] = useState(0);
  const [editableProject, setEditableProject] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [toggleTabButton, setToggleTabButton] = useState("Project details");

  const toggleTab = (tab) => {
    console.log(tab);
    setToggleTabButton(tab);
  };
  useEffect(() => {
    if (specificProject) {
      setEditableProject(specificProject);
    }
  }, [specificProject]);

  const handleInputChange = (e, field) => {
    setEditableProject({
      ...editableProject,
      [field]: e.target.value,
    });
  };

  const handleNestedInputChange = (e, parentField, field) => {
    setEditableProject({
      ...editableProject,
      [parentField]: {
        ...editableProject[parentField],
        [field]: e.target.value,
      },
    });
  };

  const handleArrayInputChange = (e, parentField, index) => {
    const updatedArray = [...editableProject[parentField]];
    updatedArray[index] = e.target.value;
    setEditableProject({
      ...editableProject,
      [parentField]: updatedArray,
    });
  };

  const toggleEditing = (tabIndex) => {
    setIsEditing((prev) => ({
      ...prev,
      [tabIndex]: !prev[tabIndex],
    }));
  };

  const renderField = (
    label,
    value,
    field,
    type = "input",
    nested = false,
    parentField = null,
    tabIndex
  ) => (
    <div className="flex flex-col mt-4">
      <span className="pl-2 font-semibold">{label}</span>
      {isEditing[tabIndex] ? (
        type === "textarea" ? (
          <textarea
            className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            value={value}
            onChange={(e) =>
              nested
                ? handleNestedInputChange(e, parentField, field)
                : handleInputChange(e, field)
            }
          />
        ) : (
          <input
            className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
            value={value}
            onChange={(e) =>
              nested
                ? handleNestedInputChange(e, parentField, field)
                : handleInputChange(e, field)
            }
          />
        )
      ) : (
        <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
          {value}
        </p>
      )}
    </div>
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  if (!specificProject) {
    return <div>No project found</div>;
  }

  const TabButton = ({ index, handleChangeTab, icon: Icon, label }) => (
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
        <div className="max-w-[90%] mx-auto p-2">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex space-x-4">
              <span
                className={` px-3 py-2 rounded-md text-sm font-medium ${
                  toggleTabButton === "Project details"
                    ? "bg-blue-600 text-white"
                    : ""
                } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white`}
                onClick={() => toggleTab("Project details")}
              >
                Project details
              </span>
              <span
                className={` px-3 py-2 rounded-md text-sm font-medium ${
                  toggleTabButton === "Milestone"
                    ? "bg-blue-600 text-white"
                    : ""
                } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white`}
                onClick={() => toggleTab("Milestone")}
              >
                Milestone
              </span>
              <span
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  toggleTabButton === "All task" ? "bg-blue-600 text-white" : ""
                } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white`}
                onClick={() => toggleTab("All task")}
              >
                All task
              </span>
              <span
                className={` px-3 py-2 rounded-md text-sm font-medium ${
                  toggleTabButton === "Other" ? "bg-blue-600 text-white" : ""
                } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white`}
                onClick={() => toggleTab("Other")}
              >
                Other Details
              </span>
            </div>
          </div>

          <div className="flex flex-row space-x-8">
            <div className="flex-1">
              {toggleTabButton === "Project details" && (
                <div> jai shree ram</div>
              )}

              {toggleTabButton === "Milestone" && (
                <div className="text-white"></div>
              )}
              {toggleTabButton === "All task" && (
                <div className="text-white">
                  {/* Content for All task tab */}
                </div>
              )}
              {toggleTabButton === "Other" && (
                <div className="flex flex-row space-x-8">
                  <div className="flex flex-col space-y-1 mb-6 w-[14rem]">
                    <TabButton
                      index={0}
                      handleChangeTab={setActiveTab}
                      icon={GrOverview}
                      label="Project Details"
                    />
                    <TabButton
                      index={1}
                      handleChangeTab={setActiveTab}
                      icon={RxPerson}
                      label="Client Details"
                    />
                    <TabButton
                      index={2}
                      handleChangeTab={setActiveTab}
                      icon={BiLoaderCircle}
                      label="Phases"
                    />
                    <TabButton
                      index={3}
                      handleChangeTab={setActiveTab}
                      icon={HiOutlineUserGroup}
                      label="Team Details"
                    />
                    <TabButton
                      index={4}
                      handleChangeTab={setActiveTab}
                      icon={GrTechnology}
                      label="Tools and Techs"
                    />
                    <TabButton
                      index={5}
                      handleChangeTab={setActiveTab}
                      icon={MdAttractions}
                      label="Tracking"
                    />
                    <TabButton
                      index={6}
                      handleChangeTab={setActiveTab}
                      icon={TiDocumentText}
                      label="Documentation"
                    />
                    <TabButton
                      index={7}
                      handleChangeTab={setActiveTab}
                      icon={CgCalendarNext}
                      label="Others"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="text-xl font-bold mb-2 border-b-2 p-2 dark:border-[#30363D]">
                        {activeTab === 0 && "Project Details"}
                        {activeTab === 1 && "Client Information"}
                        {activeTab === 2 && "Project Phases"}
                        {activeTab === 3 && "Team Members"}
                        {activeTab === 4 && "Tools and Tech"}
                        {activeTab === 5 && "Tracking"}
                        {activeTab === 6 && "Documentation"}
                        {activeTab === 7 && "Other Details"}
                      </h2>
                      <button
                        className="mb-2 p-2 bg-blue-500 text-white rounded"
                        onClick={() => toggleEditing(activeTab)}
                      >
                        {isEditing[activeTab] ? "Save" : "Edit"}
                      </button>
                    </div>

                    {activeTab === 0 && (
                      <>
                        {renderField(
                          "Project Name",
                          editableProject?.projectName ?? "N/A",
                          "projectName",
                          "input",
                          false,
                          null,
                          0
                        )}
                        {renderField(
                          "Description",
                          editableProject?.projectDescription ??
                            "No description",
                          "projectDescription",
                          "textarea",
                          false,
                          null,
                          0
                        )}
                        {renderField(
                          "Objective",
                          editableProject?.projectObjectives ??
                            "No data present",
                          "projectObjectives",
                          "textarea",
                          false,
                          null,
                          0
                        )}
                        {renderField(
                          "Type",
                          editableProject?.projectType ?? "No project type",
                          "projectType",
                          "input",
                          false,
                          null,
                          0
                        )}

                        {renderField(
                          "Scope",
                          editableProject?.projectScope ??
                            "No scope mention by creater",
                          "projectScope",
                          "input",
                          false,
                          null,
                          0
                        )}
                        {renderField(
                          "Start Date",
                          new Date(
                            editableProject.startDate
                          ).toLocaleDateString(),
                          "startDate",
                          "input",
                          false,
                          null,
                          0
                        )}
                        {renderField(
                          "End Date",
                          new Date(
                            editableProject.endDate
                          ).toLocaleDateString(),
                          "endDate",
                          "input",
                          false,
                          null,
                          0
                        )}
                        {renderField(
                          "Quality Standards",
                          editableProject?.qualityStandards ??
                            "No scope mention by creater",
                          "qualityStandards",
                          "input",
                          false,
                          null,
                          0
                        )}
                      </>
                    )}

                    {activeTab === 1 && (
                      <>
                        {renderField(
                          "Name",
                          editableProject?.client?.name ?? "N/A",
                          "name",
                          "input",
                          true,
                          "client",
                          1
                        )}
                        {renderField(
                          "Email",
                          editableProject?.client?.contactInformation?.email ??
                            "N/A",
                          "email",
                          "input",
                          true,
                          "client.contactInformation",
                          1
                        )}
                        {renderField(
                          "Phone",
                          editableProject?.client?.contactInformation
                            ?.phoneNumber ?? "N/A",
                          "phoneNumber",
                          "input",
                          true,
                          "client.contactInformation",
                          1
                        )}
                        {renderField(
                          "Address",
                          editableProject?.client?.contactInformation
                            ?.address ?? "N/A",
                          "address",
                          "input",
                          true,
                          "client.contactInformation",
                          1
                        )}
                      </>
                    )}

                    {activeTab === 2 && (
                      <>
                        {editableProject?.phases?.map((phase, index) => (
                          <div key={index} className="flex flex-col mt-4">
                            {isEditing[2] ? (
                              <input
                                className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                                value={phase ?? "N/A"}
                                onChange={(e) =>
                                  handleArrayInputChange(e, "phases", index)
                                }
                              />
                            ) : (
                              <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                                {phase}
                              </p>
                            )}
                          </div>
                        ))}
                      </>
                    )}

                    {activeTab === 3 && (
                      <>
                        {editableProject?.teamMembers?.map((team, index) => (
                          <div key={index} className="flex flex-col mt-4">
                            {isEditing[3] ? (
                              <input
                                className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                                value={team ?? "N/A"}
                                onChange={(e) =>
                                  handleArrayInputChange(
                                    e,
                                    "teamMembers",
                                    index
                                  )
                                }
                              />
                            ) : (
                              <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                                {team}
                              </p>
                            )}
                          </div>
                        ))}
                        {renderField(
                          "Project Manager",
                          editableProject?.projectManager ?? "N/A",
                          "projectManager",
                          "input",
                          false,
                          null,
                          3
                        )}
                      </>
                    )}

                    {activeTab === 4 && (
                      <>
                        {editableProject?.toolsAndTechnologies?.map(
                          (tech, index) => (
                            <div key={index} className="flex flex-col mt-4">
                              {isEditing[4] ? (
                                <input
                                  className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                                  value={tech ?? "N/A"}
                                  onChange={(e) =>
                                    handleArrayInputChange(
                                      e,
                                      "toolsAndTechnologies",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                                  {tech}
                                </p>
                              )}
                            </div>
                          )
                        )}
                        <h2 className="text-xl font-semibold mb-2">
                          Required Resources
                        </h2>
                        {editableProject?.requiredResources?.map(
                          (reso, index) => (
                            <div key={index} className="flex flex-col mt-4">
                              {isEditing[4] ? (
                                <input
                                  className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                                  value={reso ?? "N/A"}
                                  onChange={(e) =>
                                    handleArrayInputChange(
                                      e,
                                      "requiredResources",
                                      index
                                    )
                                  }
                                />
                              ) : (
                                <p className="py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400">
                                  {reso}
                                </p>
                              )}
                            </div>
                          )
                        )}
                        {renderField(
                          "Resource Status",
                          editableProject?.resourceAllocation ?? "N/A",
                          "resourceAllocation",
                          "input",
                          false,
                          null,
                          4
                        )}
                      </>
                    )}

                    {activeTab === 5 && (
                      <>
                        {renderField(
                          "Status Report",
                          editableProject?.statusReports ?? "N/A",
                          "statusReports",
                          "textarea",
                          false,
                          null,
                          5
                        )}
                        {renderField(
                          "Progress Tracking",
                          editableProject?.progressTracking ?? "N/A",
                          "progressTracking",
                          "textarea",
                          false,
                          null,
                          5
                        )}
                      </>
                    )}

                    {activeTab === 6 && (
                      <>
                        {renderField(
                          "Design",
                          editableProject?.documentation?.design ?? "N/A",
                          "design",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                        {renderField(
                          "Project Plan",
                          editableProject?.documentation?.projectPlan ?? "N/A",
                          "projectPlan",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                        {renderField(
                          "Requirements",
                          editableProject?.documentation?.requirements ?? "N/A",
                          "requirements",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                        {renderField(
                          "Technical Specifications",
                          editableProject?.documentation
                            ?.technicalSpecifications ?? "N/A",
                          "technicalSpecifications",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                        {renderField(
                          "Test Plans",
                          editableProject?.documentation?.testPlans ?? "N/A",
                          "testPlans",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                        {renderField(
                          "User Manuals",
                          editableProject?.documentation?.userManuals ?? "N/A",
                          "userManuals",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                        {renderField(
                          "Archiving Documents",
                          editableProject?.archivingDocumentation ?? "N/A",
                          "archivingDocumentation",
                          "textarea",
                          true,
                          "documentation",
                          6
                        )}
                      </>
                    )}

                    {activeTab === 7 && (
                      <>
                        {renderField(
                          "IP Management",
                          "All IP rights reserved to the client",
                          "ipManagement",
                          "input",
                          false,
                          null,
                          7
                        )}
                        <h3 className="text-lg font-medium mb-1">KPIs</h3>
                        <ul className="list-disc pl-6">
                          {editableProject?.kpis?.map((kpi, index) => (
                            <li
                              key={index}
                              className="py-1.5 pl-2 border-b dark:border-[#30363D] text-lg font-normal dark:bg-[#161B22] dark:text-slate-400"
                            >
                              {isEditing[7] ? (
                                <input
                                  value={kpi}
                                  onChange={(e) =>
                                    handleArrayInputChange(e, "kpis", index)
                                  }
                                />
                              ) : (
                                kpi
                              )}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
