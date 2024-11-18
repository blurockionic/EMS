import React, { useState, useMemo, useCallback, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaBorderAll, FaDiagramProject, FaTable } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAttractions, MdOutlineViewTimeline } from "react-icons/md";
import { GoIssueClosed, GoProject } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../Redux/slices/projectSlice";
import { fetchProfile } from "../../Redux/slices/profileSlice";
import ManagerProject from "./ManagerProject";
import Loader from "../utilities-components/Loader";
import ProjectCard from "./ProjectCard";
import { LuLayoutList } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const AllProject = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProjects, setUserProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [uiState, setUiState] = useState({
    showMoreTabs: false,
    searchInputBox: false,
    activeTab: "All Project",
    loading: false,
    tabs: ["All Project", "Open Project"], // Initialize tabs list
  });

  const projectState = useSelector((state) => state.project);
  const {
    allProject,
    status: projectStatus,
    error: projectError,
  } = projectState;
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchProjects());
  }, [dispatch]);

  // Conditionally add the "My Project" tab for manager and employee roles
  useEffect(() => {
    if (
      (profile.role === "manager" || profile.role === "employee") &&
      !uiState.tabs.includes("My Project")
    ) {
      setUiState((prevState) => ({
        ...prevState,
        tabs: [...prevState.tabs, "My Project"],
      }));
    }
  }, [profile.role, uiState.tabs]);

  const getTabIcon = useCallback((tab) => {
    const icons = {
      "All Project": <MdOutlineAttractions className="mr-2 mt-1" />,
      "Open Project": <FaDiagramProject className="mr-2 mt-1" />,
      "My Project": <GoProject className="mr-2 mt-1" />,
      "Table View": <LuLayoutList className="mr-2 mt-1" />,
      Timeline: <MdOutlineViewTimeline className="mr-2 mt-1" />,
      Completed: <GoIssueClosed className="mr-2 mt-1" />,
      "Gallery View": <FaBorderAll className="mr-2 mt-1" />,
    };
    return icons[tab] || null;
  }, []);

  useEffect(() => {
    // Filter projects where the user is a team member
    setUserProjects(
      allProject.filter(
        (project) =>
          project.teamMembers.includes(profile._id) ||
          project.projectManager === profile._id
      )
    );
  }, [profile._id]);

  const tabsList = useMemo(
    () =>
      uiState.tabs.map((tab) => (
        <div
          key={tab}
          className={`flex items-center cursor-pointer px-2 py-2 ${
            uiState.activeTab === tab
              ? "border-b-2 border-green-500 font-bold"
              : "font-semibold bg-transparent"
          }`}
          onClick={() => handleTabClick(tab)}
        >
          {getTabIcon(tab)} {tab}
        </div>
      )),
    [uiState.tabs, uiState.activeTab, getTabIcon]
  );

  const handleSearchButton = () => {
    setUiState((prevState) => ({
      ...prevState,
      searchInputBox: !prevState.searchInputBox,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProjects = useMemo(() => {
    return allProject.filter((project) =>
      project.projectName.toLowerCase().includes(searchQuery) ||
      project.description?.toLowerCase().includes(searchQuery) ||
      project.teamName?.toLowerCase().includes(searchQuery)
    );
  }, [allProject, searchQuery]);
  

  const handleNewClick = () => {
    // New project creation logic or modal opening
    console.log("New project clicked");
    navigate("../newProject");
  };

  const handleTabClick = (tab) => {
    setUiState((prevState) => ({
      ...prevState,
      activeTab: tab,
    }));
  };

  const addTab = useCallback(
    (tab) => {
      if (!uiState.tabs.includes(tab)) {
        setUiState((prevState) => ({
          ...prevState,
          tabs: [...prevState.tabs, tab],
          activeTab: tab,
          showMoreTabs: false,
        }));
      }
    },
    [uiState.tabs]
  );

  if (projectStatus === "loading") return <Loader />;
  if (projectStatus === "failed") return <div>Error: {projectError}</div>;

  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-4xl font-bold p-2">Projects</h1>

      <nav className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="flex w-full sm:w-auto h-full items-end space-x-3 overflow-x-auto sm:overflow-x-hidden">
            {tabsList}
          </div>
          <div className="relative flex items-center">
            <div
              className="cursor-pointer"
              onClick={() =>
                setUiState((prevState) => ({
                  ...prevState,
                  showMoreTabs: !prevState.showMoreTabs,
                }))
              }
            >
              <IoMdAdd className="text-2xl mx-2 mt-2" />
            </div>
            {uiState.showMoreTabs && (
              <div className="absolute top-full mt-2 w-full md:w-56 bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10 p-1">
                <ul>
                  {["Table View", "Timeline", "Completed", "Gallery View"].map(
                    (tab) => (
                      <li
                        key={tab}
                        className="flex flex-row cursor-pointer mx-2 px-4 py-1 hover:bg-gray-200 hover:rounded-lg mt-2"
                        onClick={() => addTab(tab)}
                      >
                        {getTabIcon(tab)}
                        {tab}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 space-x-2">
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
              uiState.searchInputBox
                ? "bg-gray-200 dark:bg-slate-400"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <span className="p-0.5">
              <BsThreeDots className="text-xl" />
            </span>
          </div>
          <div
            className={`flex items-center p-0.25 mr-1 rounded-md transition-colors cursor-pointer ${
              uiState.searchInputBox
                ? "hover:bg-gray-300 dark:hover:bg-gray-700"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={handleSearchButton}
          >
            <span className="p-0.5">
              <IoSearchSharp className="text-xl" />
            </span>
          </div>
          {uiState.searchInputBox && (
            <input
              type="search"
              placeholder="Type to search..."
              className="bg-transparent p-1 outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          )}
          {profile.role === "admin" && (
            <div className="flex items-center" onClick={handleNewClick}>
              <div className="flex items-center font-semibold text-white bg-gray-900 hover:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white px-2 py-1 rounded-md shadow-inner cursor-pointer transition-colors">
                <IoMdAdd className="text-lg mr-1" />
                <span>New</span>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="p-2">
        {uiState.activeTab === "All Project" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
        {uiState.activeTab === "My Project" && profile.role === "manager" && (
          <div>
            {" "}
            <ManagerProject />{" "}
          </div>
        )}
        {uiState.activeTab === "My Project" && profile.role === "employee" && (
          <div>
            {userProjects.map((project, index) => (
              <tr key={project._id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{project.projectName}</td>
                <td className="border px-4 py-2">{project.projectStartDate}</td>
                <td className="border px-4 py-2">{project.projectEndDate}</td>
                {/* <td className="border px-4 py-2">
                    {teams
                      .filter((team) => team._id === project.teamId)
                      .map((filteredTeam) => (
                        <div key={filteredTeam._id}>
                          {filteredTeam.teamName}
                        </div>
                      ))}
                  </td> */}
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
                    // onClick={() =>
                    //   !project.isCompleted && handleAssignTask(project)
                    // }
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
                    // onClick={() =>
                    //   !project.isCompleted && handleReportClick(project)
                    // }
                    disabled={project.isCompleted}
                  >
                    Report
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    className="mx-auto text-blue-500 font-bold py-2 px-4 rounded"
                    // onClick={() => handleOnShowMore(project._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </div>
        )}
        {uiState.activeTab === "Table View" && (
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
                {filteredProjects.map((project, index) => (
                  <tr
                    key={project._id}
                    className={`text-center ${
                      index % 2
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }`}
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{project.projectName}</td>
                    <td className="border px-4 py-2">{project.teamName}</td>
                    <td className="border px-4 py-2">{project.description}</td>
                    <td className="border px-4 py-2">{project.startDate}</td>
                    <td className="border px-4 py-2">{project.endDate}</td>
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
    </div>
  );
};

export default AllProject;
