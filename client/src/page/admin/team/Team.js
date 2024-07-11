import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";

import { Tooltip } from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuGalleryVerticalEnd, LuLayoutList } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import CreateNewTeam from "./CreateNewTeam";
import Loader from "../../../component/utilities-components/Loader";
import {
  fetchTeams,
  updateTeam,
  deleteTeam,
} from "../../../Redux/slices/teamSlice";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchEmployees } from "../../../Redux/slices/employeeSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import ErrorPage from "../../../component/utilities-components/ErrorPage";

const Team = () => {
  const dispatch = useDispatch();
  const { teams, status, error } = useSelector((state) => state.team);
  const { data: users } = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);
  const projectState = useSelector((state) => state.project);

  const {
    allProject,
    status: projectStatus,
    error: projectError,
  } = projectState;

  const [viewMode, setViewMode] = useState("gallery");
  const [activeTeamTab, setActiveTeamTab] = useState("Our Teams");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [loading, setLoading] = useState(false);

  const [allMembers, setAllMembers] = useState([]);
  const [allManagers, setAllManagers] = useState([]);
  const [adminProfile, setAdminProfile] = useState("");
  const [showUpdateTeamModel, setShowUpdateTeamModel] = useState(false);
  const [showSureDeleteModel, setShowSureDeleteModel] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [updateTeamName, setUpdateTeamName] = useState("");
  const [updateTeamDescription, setUpdateTeamDescription] = useState("");
  const [updateTeamManagerName, setUpdateTeamManagerName] = useState("");
  const [updateProjectName, setupdateProjectName] = useState("");

  const [filteredUpdateTeamId, setfilteredUpdateTeamId] = useState(null);
  const [filteredDeleteTeamId, setFilteredDeleteTeamId] = useState(null);

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchEmployees());
    dispatch(fetchProjects());
  }, [dispatch]);

  console.log("team k andar data aa raha h ", teams);

  const projectOptions = allProject.map((project) => ({
    value: project._id,
    label: project.projectName,
  }));

  // use effect dispatch for fetch user profile(admin)
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // use effect dispatch for get all users
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setAllManagers(users.filter((user) => user.role === "manager"));
    setAllMembers(users.filter((user) => user.role === "employee"));
  }, [users]);

  // admin profile
  useEffect(() => {
    if (profile && profile.role === "admin") {
      setAdminProfile(profile._id);
    } else {
      setAdminProfile(null);
    }
  }, [profile]);

  const handleTabClick = (tab) => {
    setActiveTeamTab(tab);
  };
  const handleUpdatebtn = (id) => {
    setShowUpdateTeamModel(true);

    const selectedTeam = teams.find((team) => team._id === id);

    if (selectedTeam) {
      // Set team name
      setUpdateTeamName(selectedTeam.teamName || "");

      // Set team description
      setUpdateTeamDescription(selectedTeam.teamDescription || "");

      // Set selected members
      setSelectedMembers(selectedTeam.selectedMembers || []);

      // Filter the team by id and set the filtered team
      setfilteredUpdateTeamId(id);

      // Set selected project
      const project = selectedTeam.selectedProject
        ? [selectedTeam.selectedProject]
        : [];
      setupdateProjectName(project);
      setSelectedProject(selectedTeam.selectedProject || null);

      // Set selected manager name
      const manager = selectedTeam.selectedManager
        ? [selectedTeam.selectedManager]
        : [];
      setUpdateTeamManagerName(manager);
      setSelectedManager(selectedTeam.selectedManager || null);
    } else {
      console.error("Selected team not found");
    }
  };

  const handleDeletebtn = (id) => {
    setShowSureDeleteModel(true);
    setFilteredDeleteTeamId(id);
  };

  const handleCloseModal = () => {
    setShowUpdateTeamModel(false);
    setShowSureDeleteModel(false);
  };

  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();
    if (!id) {
      toast.error(" selected team id is null");
      return;
    }
    try {
      const teamData = {
        updateTeamName,
        updateTeamDescription,
        adminProfile,
        updateProjectName,
        updateTeamManagerName,
        selectedMembers,
        selectedManager,
        selectedProject,
      };

      const resultAction = dispatch(updateTeam({ id, teamData }));
      if (resultAction.payload) {
        toast.success("Team Updated Successfully");

        setShowUpdateTeamModel(false);
        setLoading(false);

        setSelectedManager("");
        setSelectedProject("");
      } else {
        throw new Error("Failed to update team");
      }
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!id) {
      toast.error("Please select a team to delete");
    }
    try {
      const resultAction = dispatch(deleteTeam(id));
      if (resultAction.payload) {
        toast.success("Delete successful");
      }
      setShowSureDeleteModel(false);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const handleOnthreeDot = (empId) => {
    // Toggle the dropdown state for the clicked row
    setOpenDropdownId((prevId) => (prevId === empId ? null : empId));
    // setDropdown(true);
  };

  return (
    <>
      <div>
        <div className="flex flex-row justify-between border-b">
          <div className="flex flex-row">
            <div className="flex cursor-pointer transition duration-300 ease-in-out px-4 py-2 gap-2 dark:border-[#30363D] rounded-md text-start">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTeamTab === "Our Teams" ? "bg-gray-900 text-white" : ""
                } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer`}
                onClick={() => handleTabClick("Our Teams")}
              >
                Our Team
                
              </button>
              <button
                className={`p-2 rounded-md text-sm font-medium ${
                  activeTeamTab === "Activity" ? "bg-gray-900 text-white" : ""
                } hover:bg-gray-700 dark:hover:bg-gray-900 dark:hover:text-white cursor-pointer`}
                onClick={() => handleTabClick("Activity")}
              >
                Activity
              </button>
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
                <Tooltip anchorSelect=".tooltip-class" place="bottom">
                  Table View
                </Tooltip>{" "}
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
                <Tooltip anchorSelect=".tooltip-2-class" place="bottom">
                  Gallery View
                </Tooltip>{" "}
              </button>
              <button
                className={`tooltip-3-class p-2 rounded flex ${
                  activeTeamTab === "Create Team"
                    ? "dark:bg-[#21262C] font-semibold bg-slate-900 text-blue-500"
                    : "bg-gray-500 dark:hover:bg-[#21262C] hover:bg-slate-400 dark:bg-gray-700"
                }`}
                onClick={() => handleTabClick("Create Team")}
              >
                <span>
                  <IoMdAdd className="text-xl text-white dark:text-gray-300" />
                </span>
                <span>
                  <AiOutlineTeam className="text-xl text-white dark:text-gray-300" />
                </span>
                <Tooltip anchorSelect=".tooltip-3-class" place="bottom">
                  add new team
                </Tooltip>{" "}
              </button>
            </div>
          </div>
        </div>
        ;{/* Render based on active tab */}
        {/* All teams  */}
        {activeTeamTab === "Our Teams" && (
          <>
            {viewMode === "gallery" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4 mx-auto">
                {teams?.map((team) => (
                  <div key={team?._id}>
                    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg dark:bg-slate-950">
                      <div className="dark:bg-slate-950 p-6 mb-6">
                        <div className="flex items-center">
                        
                          <div>
                            <h2 className="text-xl font-bold">
                              <span className="capitalize">
                                {team?.teamName}
                              </span>
                            </h2>
                            <p>{team?.position ?? ""}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex-grow">
                          <p className="dark:text-gray-400">
                            Manager:{" "}
                            {team.selectedManager?.firstName &&
                            team.selectedManager?.lastName
                              ? `${team.selectedManager.firstName} ${team.selectedManager.lastName}`
                              : "empty"}
                          </p>
                          <p className="drak:text-gray-400">
                            Project:{" "}
                            {team?.selectedProject
                              ? team.selectedProject
                              : "no project assigned"}
                          </p>
                          <div className="mt-2 flex space-x-2">
                            {team.selectedMembers.map((member, memberIndex) => (
                              <div
                                key={memberIndex}
                                className="relative group mx-1 cursor-pointer"
                              >
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src={
                                    member?.profilePicture ??
                                    "https://via.placeholder.com/150"
                                  }
                                  alt="Profile"
                                />
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-700 text-white text-xs rounded px-4 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                  {member?.firstName && member?.lastName
                                    ? `${member.firstName} ${member.lastName}`
                                    : "empty"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {viewMode === "table" && (
              <div className="w-full">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Team Name</th>
                      <th className="py-2 px-4 border-b">Team Manager</th>
                      <th className="py-2 px-4 border-b">Project</th>
                      <th className="py-2 px-4 border-b">Members</th>
                      <th className="py-2 px-4 border-b">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teams?.map((team, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 border-r-2 text-center font-bold">
                          {index + 1}
                        </td>
                        <td className="border-r-2 text-center">
                          {team?.teamName}
                        </td>
                        <td className="py-2 border-r-2 text-center">
                          {team.selectedManager?.firstName &&
                          team.selectedManager?.lastName
                            ? `${team.selectedManager.firstName} ${team.selectedManager.lastName}`
                            : "empty"}
                        </td>

                        <td className="py-2 border-r-2 text-center">
                          {team?.selectedProject
                            ? team.selectedProject
                            : "no project assign"}
                        </td>
                        <td className="py-2 mx-auto flex justify-center">
                          {team.selectedMembers.map((member, memberIndex) => (
                            <div
                              key={memberIndex}
                              className="relative group mx-1 cursor-pointer"
                            >
                              <img
                                className="w-10 h-10 rounded-full"
                                src={
                                  member?.profilePicture ??
                                  "https://via.placeholder.com/150"
                                }
                                alt="Profile"
                              />
                              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-700 text-white text-xs rounded px-4 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                {member?.firstName && member?.lastName
                                  ? `${member.firstName} ${member.lastName}`
                                  : "empty"}
                              </div>
                            </div>
                          ))}
                        </td>

                        <td className="relative border-2">
                          <div className="flex flex-row justify-center">
                            <BsThreeDotsVertical
                              size={35}
                              className="bg-fcfbfe p-2 rounded-full cursor-pointer"
                              onClick={() => handleOnthreeDot(team._id)}
                            />
                          </div>
                          {openDropdownId === team._id && (
                            <div className="absolute z-10 top-5 p-1 bg-slate-100 rounded shadow-md cursor-pointer">
                              <ul>
                                <li
                                  className="py-1 px-2 font-semibold rounded cursor-pointer hover:bg-slate-500"
                                  onClick={() => handleUpdatebtn(team._id)}
                                >
                                  Edit
                                </li>
                                <li
                                  className="py-1 px-2 font-semibold rounded cursor-pointer hover:bg-slate-500"
                                  onClick={() => handleDeletebtn(team._id)}
                                >
                                  Delete
                                </li>
                                <li
                                  className="py-1 px-2 font-semibold rounded cursor-pointer hover:bg-slate-500"
                                  // onClick={() => handleDeletebtn(team._id)}
                                >
                                  Details
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
        {/* Activity Tab */}
        {activeTeamTab === "Activity" && (
          <div className="p-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h1 className="text-2xl font-semibold">Team Activity</h1>
            </div>
            <div className="mt-8">
              <ul className="border-t border-gray-200 divide-y divide-gray-200">
                {/* Render Activity */}
              </ul>
            </div>
          </div>
        )}
        {/* Create Team Tab */}
        {activeTeamTab === "Create Team" && (
          <CreateNewTeam
            allManagers={allManagers}
            allMembers={allMembers}
            profile={profile}
            loading={loading}
            setLoading={setLoading}
          />
        )}
        {/* Modals */}
        {/* Update Team Modal */}
        {showUpdateTeamModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <form
                  onSubmit={(e) => handleUpdateSubmit(e, filteredUpdateTeamId)}
                >
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-2xl font-semibold">
                      Update Team Details
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => handleCloseModal()}
                    >
                      <span className="text-black-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div className="mb-4">
                      <label
                        htmlFor="teamName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Team Name
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        value={updateTeamName}
                        onChange={(e) => setUpdateTeamName(e.target.value)}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="teamDescription"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Team Description
                      </label>
                      <textarea
                        id="teamDescription"
                        value={updateTeamDescription}
                        onChange={(e) =>
                          setUpdateTeamDescription(e.target.value)
                        }
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="selectedMembers"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Members
                      </label>
                      <Select
                        id="selectedMembers"
                        value={selectedMembers}
                        onChange={(selectedOptions) =>
                          setSelectedMembers(selectedOptions)
                        }
                        options={allMembers}
                        getOptionLabel={(option) =>
                          `${option.firstName} ${option.lastName}`
                        }
                        getOptionValue={(option) => option._id} // Assuming _id is the unique identifier for each user
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            border: "1px solid #839DB4",
                            borderRadius: "2px",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            overflowY: "hidden",
                          }),
                          option: (provided) => ({
                            ...provided,
                            display: "flex",
                            alignItems: "center",
                            padding: "8px",
                          }),
                        }}
                        isMulti
                        className="mt-1 w-full"
                        placeholder="Select members"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="selectedProject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Project
                      </label>
                      <Select
                        id="selectedProject"
                        value={selectedProject}
                        onChange={setSelectedProject}
                        options={projectOptions}
                        className="mt-1 w-full"
                        placeholder="Select project"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="selectedManager"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Select Manager
                      </label>
                      <Select
                        id="selectedManager"
                        value={selectedManager}
                        onChange={(selectedOption) =>
                          setSelectedManager(selectedOption)
                        }
                        options={allManagers}
                        getOptionLabel={(option) =>
                          `${option.firstName} ${option.lastName}`
                        }
                        getOptionValue={(option) => option._id} // Assuming _id is the unique identifier for each user
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            border: "1px solid #839DB4",
                            borderRadius: "2px",
                          }),
                          menu: (provided) => ({
                            ...provided,
                            overflowY: "hidden",
                          }),
                          option: (provided) => ({
                            ...provided,
                            display: "flex",
                            alignItems: "center",
                            padding: "8px",
                          }),
                        }}
                        placeholder="Select manager"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="py-2 px-4 mr-2 text-gray-500 bg-transparent border border-gray-500 rounded hover:bg-gray-200"
                      onClick={() => setShowUpdateTeamModel(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 ml-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
                    >
                      Update Team
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* Sure Delete Team Modal */}
        {showSureDeleteModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font-semibold">Delete Team</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowSureDeleteModel(false)}
                  >
                    <span className="text-black-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p>Are you sure you want to delete this team?</p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="py-2 px-4 mr-2 text-gray-500 bg-transparent border border-gray-500 rounded hover:bg-gray-200"
                    onClick={() => setShowSureDeleteModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-2 px-4 ml-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteTeam(filteredDeleteTeamId)}
                  >
                    Delete Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Toast Container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default Team;
