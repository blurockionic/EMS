import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsThreeDotsVertical } from "react-icons/bs";

const Team = () => {
  const [projects, setProjects] = useState([]);
  const [activeTeamTab, setActiveTeamTab] = useState("Our Teams");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);
  const [allMembers, setAllMember] = useState([]);
  const [allManager, setAllManager] = useState([]);

  const [teamDescription, setTeamDescription] = useState("");
  let [teamName, setTeamName] = useState("");
  const [adminProfile, setAdminProfile] = useState("");

  const [updateTeamName, setUpdateTeamName] = useState("");
  const [updateTeamDescription, setUpdateTeamDescription] = useState("");
  const [updateTeamManagerName, setUpdateTeamManagerName] = useState("");
  const [updateProjectName, setupdateProjectName] = useState("");

  const [allTeam, setAllTeam] = useState([]);

  const [filteredTeam, setFilteredTeam] = useState([]);
  const [flterDeleteTeam, setFilterDeleteTeam] = useState([]);

  // Update team Model open and close useState
  const [showUpdateTeamModel, setShowUpdateTeamModel] = useState(false);

  // sure delete team f
  const [showSureDeleteModel, setShowSureDeleteModel] = useState(false);

  // const [dropDown, setDropdown] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleOnthreeDot = (empId) => {
    // Toggle the dropdown state for the clicked row
    setOpenDropdownId((prevId) => (prevId === empId ? null : empId));
    // setDropdown(true);
  };

  // geting all Teams Data useEffect
  useEffect(() => {
    const TData = async () => {
      try {
        const allTeamsData = await axios.get(`${server}/team/allTeams`, {
          withCredentials: true,
        });

        console.log("all teams data is here", allTeamsData.data.allTeamsData);
        const { success } = allTeamsData.data;
        if (success) {
          setAllTeam(allTeamsData.data.allTeamsData);
          setLoading(false);
          setLoadingTwo(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    TData();
  }, [loading, loadingTwo, filteredTeam]);
  // console.log("all team data",allTeam);

  // update btn click handler
  const handleUpdatebtn = (id) => {
    setShowUpdateTeamModel(true);
    const selectedTeam = allTeam.filter((team) => team._id === id);

    //team name
    setUpdateTeamName(selectedTeam[0].teamName);
    //team description
    setUpdateTeamDescription(selectedTeam[0].teamDescription);

    // selected members
    setSelectedMembers(selectedTeam[0].selectedMembers);
    setFilteredTeam(allTeam.filter((team) => team._id === id));

    //selected proeject
    let project = [];
    project.push(selectedTeam[0].selectedProject);
    setupdateProjectName(project);
    setSelectedProject(selectedTeam[0].selectedProject);

    //selected manager name
    let manager = [];
    manager.push(selectedTeam[0].selectedManager);
    setUpdateTeamManagerName(manager);
    setSelectedManager(selectedTeam[0].selectedManager);
  };

  const handleDeletebtn = (id) => {
    setShowSureDeleteModel(true);
    setFilterDeleteTeam(allTeam.filter((team) => team._id === id));
  };

  // deleting the team by admin
  const handleDeleteTeam = async (id) => {
    // toast(id)

    try {
      const response = await axios.delete(`${server}/team/deleteTeam/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.success === true) {
        toast.success("delete successful");
        setLoading(true);
      }
      setShowSureDeleteModel(false);
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  // handle closing updateModel
  const handleCloseModal = () => {
    setShowUpdateTeamModel(false);
    setShowSureDeleteModel(false);
  };

  // handle memeber change
  const handleMembersChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
  };

  //get profile of admin
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      setAdminProfile(response.data.user._id);
    };

    //invoke
    myProfile();
  }, []);

  // all new create team post req
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) {
      alert("Team name is Required");
    }

    if (selectedManager === "") {
      alert("Please select Manager");
      return;
    }

    // if (selectedProject === undefined) {
    //   selectedProject = null;
    // }

    console.log(
      teamName,
      teamDescription,
      adminProfile,
      selectedManager,
      selectedProject,
      selectedMembers
    );

    try {
      // Send the form data to the backend API

      const response = await axios.post(
        `${server}/team/CreateNewTeam`,
        {
          teamName,
          teamDescription,
          adminProfile,
          selectedManager,
          selectedProject,
          selectedMembers,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Handle the response as needed
      console.log("Server response:", response.data);

      const { success } = response.data;

      if (success) {
        // alert(message)
        toast.success("Team Create Successfully");
        setTeamName("");
        setTeamDescription("");
        setSelectedManager("");
        setSelectedMembers([]);
        setSelectedProject("");
        setLoadingTwo(true);
      }

      // Clear the form after successful submission
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error if necessary
    }
  };

  // all Update team put req
  const handleUpdateSubmit = async (e, id) => {
    e.preventDefault();

    try {
      // Send the form data to the backend API
      setLoading(true);
      const response = await axios.put(
        `${server}/team/updateTeam/${id}`,
        {
          updateTeamName,
          updateTeamDescription,
          adminProfile,
          updateProjectName,
          updateTeamManagerName,
          selectedMembers,
          selectedManager,
          selectedProject,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Handle the response as needed

      setFilteredTeam([]);
      const { success, message } = response.data;

      if (success) {
        setShowUpdateTeamModel(false);
        setLoadingTwo(true);
        setLoading(false);
        alert(message);
        setSelectedManager("");
        setSelectedProject("");
      }

      // Clear the form after successful submission
    } catch (error) {
      console.error("Error sending form data:", error);
      // Handle error if necessary
    }
  };

  // all prject Get rq
  useEffect(() => {
    const data = async () => {
      try {
        const data = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        // console.log("all project", data.data.allProject);

        setProjects(data.data.allProject);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);
  // all emp get Req
  useEffect(() => {
    let datae = [];
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });

        // Handle the data from the API response
        // console.log("all emp data", allEmployee.data.data);

        datae = allEmployee.data.data; // Declare datae using 'const' or 'let'

        setAllMember(
          datae.filter((user) => user.designationType === "employee")
        );
        setAllManager(datae.filter((m) => m.designationType === "manager"));
        // console.log("manager bhi filter hoke aa rahe h ", allManager);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);

  // handling the Tab
  const handleTabClick = (tab) => {
    setActiveTeamTab(tab);
  };

  // selected members handle
  const handleUpdatedMembersChange = (selectedUpdatedMember) => {
    setSelectedMembers(selectedUpdatedMember);
  };

  const handleOnUpdateProject = (project) => {
    setupdateProjectName(project);
  };

  const handleOnupdateManagerName = (manager) => {
    setUpdateTeamManagerName(manager);
  };

  // console.log("all team data with selected members ", allTeam);
  // console.log("filter datav", filteredTeam[0].selectedMembers)
  // console.log("he kuchh ki nii ",dataofmember);
  return (
    <div>
      <div className=" flex flex-row shadow-lg">
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTeamTab === "Our Teams"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Our Teams")}
        >
          Our Team
        </div>

        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTeamTab === "Create Team"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Create Team")}
        >
          Create Team
        </div>
      </div>

      {/* All teams  */}
      {activeTeamTab === "Our Teams" && (
        
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">All Teams</h2> 
              <div className="container mx-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Team Name</th>
                      <th className="py-2 px-4 border-b">Team Manager</th>
                      <th className="py-2 px-4 border-b">Project</th>
                      <th className="py-2 px-4 border-b">Members</th>
                      {/* <th className="py-2 px-4 border-b">Update Team</th> */}
                      {/* <th className="py-2 px-4 border-b">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {allTeam.map((emp, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2  border-r-2 text-center font-bold">
                          {index + 1}
                        </td>
                        <td className=" border-r-2 text-center">
                          {emp?.teamName}
                        </td>
                        <td className="py-2  border-r-2 text-center">
                          {emp.selectedManager?.employeeName === ""
                            ? "empty"
                            : emp.selectedManager?.employeeName}
                        </td>

                        <td className="py-2 border-r-2 text-center">
                          {emp.selectedProject?.projectName}
                        </td>
                        <td className="py-2  mx-auto flex justify-center">
                          {emp.selectedMembers.map((member, memberIndex) => (
                            <td className="justify-center" key={memberIndex}>
                              <div className="px-3 rounded-sm mr-2 font-semibold border-black">
                                {member.employeeName}
                              </div>
                            </td>
                          ))}
                        </td>
                        {/* <td className=" cursor-pointer py-2 text-center hover:font-extrabold bg-slate-500 hover:bg-sky-800 text-xl ">
                          Click
                        </td>

                        <td className=" cursor-pointer py-2 text-center hover:font-extrabold bg-red-600 hover:bg-red-800 text-xl ">
                          Delete
                        </td> */}
                        <td className="relative border-2">
                          <div
                            className="flex
                           flex-row justify-center"
                          >
                            <BsThreeDotsVertical
                              size={35}
                              className="bg-fcfbfe  p-2 rounded-full cursor-pointer  "
                              onClick={() => handleOnthreeDot(emp._id)}
                            />
                          </div>
                          {openDropdownId === emp._id && (
                            <div className="   absolute z-10 top-5 p-1 bg-slate-100 rounded shadow-md   cursor-pointer ">
                              <ul
                                className=""
                                // onMouseLeave={() => setDropdown(false)}
                              >
                                <li
                                  className=" py-1 px-2 font-semibold rounded cursor-pointer  hover:bg-slate-500"
                                  onClick={() => handleUpdatebtn(emp._id)}
                                >
                                  Edit
                                </li>
                                <li
                                  className=" py-1 px-2 font-semibold rounded cursor-pointer  hover:bg-slate-500"
                                  onClick={() => handleDeletebtn(emp._id)}
                                >
                                  Delete
                                </li>
                                <li
                                  className=" py-1 px-2 font-semibold rounded cursor-pointer  hover:bg-slate-500"
                                  // onClick={() => handleDeletebtn(emp._id)}
                                >
                                  Details
                                </li>
                              </ul>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    <ToastContainer />
                  </tbody>
                </table>
              </div>
            </div>
       
     
      )}

      {/* Create team */}
      {activeTeamTab === "Create Team" && (
        <div className="container mx-auto w-[60%] h-auto bg-white shadow-2xl">
          <div className="m-12">
            <div>
              <h1 className="text-2xl  uppercase text-center font-bold text-blue-500 ">
                Team Details
              </h1>

              <div className="mt-2">
                <label
                  className="text-slate-600 text-sm font-semibold "
                  htmlFor="teamName"
                >
                  Team Name
                </label>
                <input
                  className="w-full border-solid border-slate-400 outline-none
                            border-opacity-100 border
                            rounded-sm p-2"
                  type="text"
                  value={teamName}
                  required
                  name="teamName"
                  placeholder=" Enter team Name"
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              {/* team description */}
              <div className="mt-2">
                <label
                  className="text-slate-600 text-sm font-semibold "
                  htmlFor="teamDescription"
                >
                  Description
                </label>
                <textarea
                  className=" resize-none w-full h-[5rem] border-solid border-slate-400 outline-none
                    border-opacity-100 border
                    rounded-sm p-2"
                  type="text"
                  value={teamDescription}
                  name="teamDescription"
                  placeholder=" Enter team Description"
                  onChange={(e) => setTeamDescription(e.target.value)}
                />
              </div>

              <div className="mt-3 flex flex-row justify-between ">
                <div className="flex flex-col w-full">
                  <label
                    className="text-slate-600 text-sm font-semibold"
                    htmlFor="selcetManager"
                  >
                    Manager
                  </label>
                  <select
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    className=" p-2 font-semibold border-slate-400 outline-none
                           border
                            rounded-sm "
                  >
                    <option className=" text-slate-400" value="">
                      Select Manager
                    </option>
                    {allManager.map((manager) => (
                      <option key={manager._id} value={manager._id}>
                        {manager.employeeName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* <div className=" flex flex-col w-[40%]">
                  <label
                    className="text-slate-600 text-sm font-semibold "
                    htmlFor="selectProject"
                  >
                    Select Project{" "}
                  </label>
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="p-2   font-semibold border-slate-400 outline-none
                    border-opacity-100 border
                    rounded-sm"
                  >
                    <option className="font-semibold w-[15rem]  " value="">
                      Select Project
                    </option>
                    {projects.map((project) => (
                      <option key={project.id} value={project._id}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                </div> */}
              </div>

              <div className=" mt-4 flex flex-col">
                <div>
                  <div>
                    <label
                      className="text-slate-600 text-sm font-semibold "
                      htmlFor="teamMember "
                    >
                      Members
                    </label>

                    <div className="flex flex-row justify-between z-auto">
                      <div className="w-full mx-auto ">
                        <Select
                          // value={selectedMembers}
                          onChange={handleMembersChange}
                          isMulti
                          options={allMembers}
                          getOptionLabel={(option) => option.employeeName}
                          getOptionValue={(option) => option._id}
                          styles={{
                            control: (provided) => ({
                              ...provided,

                              border: "1px solid #839DB4",
                              borderRadius: "2px",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              overflowY: "hidden",
                              // maxHeight: "8rem",
                            }),
                            option: (provided) => ({
                              ...provided,
                              display: "flex",
                              alignItems: "center",
                              padding: "8px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => handleFormSubmit(e)}
                className="bg-blue-500 font-semibold text-xl py-2 mt-10 rounded-sm   justify-center mx-auto w-[80%] flex flex-row"
              >
                Create Team
              </button>
            </div>
            <div className="mt-4 h-2 w-full "></div>
          </div>
        </div>
      )}
      <ToastContainer />
      {/* Showing update team Model  */}
      {showUpdateTeamModel && (
        <div className=" z-10 inset-0 fixed flex items-center min-h-screen">
          <div
            className="inset-0 transition-opacity absolute bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>

          <div className="relative bg-white rounded-sm w-[35rem]  mx-auto">
            <div className="flex  justify-between text-center">
              <div className="">
                <h1 className="  ml-48 uppercase font-bold text-xl text-blue-600">
                  update Team
                </h1>
              </div>
              <button
                className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-sm absolute -top-10 right-0"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
            <div>
              <div>
                {/* team Name  */}
                <div className="m-8">
                  <label
                    className="text-slate-600 text-sm font-semibold "
                    htmlFor="teamName"
                  >
                    Team Name
                  </label>
                  <input
                    className=" w-full p-2 rounded-sm  font-semibold border-slate-400 outline-none
                      border-opacity-100 border
                      "
                    type="text"
                    placeholder="Enter New Name"
                    value={updateTeamName}
                    onChange={(e) => setUpdateTeamName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                {/* team Description */}
                <div className="mr-8 ml-8">
                  <label
                    className="text-slate-600 text-sm font-semibold "
                    htmlFor="teamName"
                  >
                    New Description
                  </label>
                  <input
                    className=" w-full p-2 rounded-sm border-slate-400 outline-none border-opacity-100 border "
                    type="text"
                    placeholder="Team Description"
                    value={updateTeamDescription}
                    onChange={(e) => setUpdateTeamDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row ml-9 mr-9 justify-between">
                {/* current team Manager */}
                <div className="flex flex-col  w-[40%]">
                  <div className="font-bold text-xl">
                    <label
                      className="text-slate-600 text-sm font-semibold "
                      htmlFor="teamName"
                    >
                      Manager
                    </label>
                  </div>

                  <Select
                    value={updateTeamManagerName}
                    onChange={handleOnupdateManagerName}
                    options={allManager}
                    defaultValue={(option) => option._id}
                    getOptionLabel={(option) => option.employeeName}
                    getOptionValue={(option) => option._id}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #839DB4",
                        borderRadius: "2px",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        overflowY: "hidden",
                        // maxHeight: "8rem",
                      }),
                      option: (provided) => ({
                        ...provided,
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                      }),
                    }}
                  />
                </div>

                {/* Current project */}
                <div className="flex flex-col  w-[40%]">
                  <div className="font-bold text-xl ">
                    <label
                      className="text-slate-600 text-sm font-semibold "
                      htmlFor="teamName"
                    >
                      Projects
                    </label>
                  </div>

                  <Select
                    value={updateProjectName}
                    onChange={handleOnUpdateProject}
                    options={projects}
                    defaultValue={(option) => option._id}
                    getOptionLabel={(option) => option.projectName}
                    getOptionValue={(option) => option._id}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "1px solid #839DB4",
                        borderRadius: "2px",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        overflowY: "hidden",
                        // maxHeight: "8rem",
                      }),
                      option: (provided) => ({
                        ...provided,
                        display: "flex",
                        alignItems: "center",
                        padding: "8px",
                      }),
                    }}
                  />
                </div>
              </div>
              {/* Team Members */}
              <div className="flex flex-col mt-2 mx-9">
                <div>
                  <div>
                    <label
                      className="text-slate-600 text-sm font-semibold "
                      htmlFor="teamName"
                    >
                      Edit Members
                    </label>

                    <div className="mt-1 flex flex-row justify-between">
                      <div className="w-full ">
                        <Select
                          value={selectedMembers}
                          onChange={handleUpdatedMembersChange}
                          isMulti
                          options={allMembers}
                          getOptionLabel={(option) => option.employeeName}
                          getOptionValue={(option) => option._id}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              border: "1px solid #839DB4",
                              borderRadius: "2px",
                            }),
                            menu: (provided) => ({
                              ...provided,
                              overflowY: "auto",
                              maxHeight: "6rem",
                            }),
                            option: (provided) => ({
                              ...provided,
                              display: "flex",
                              alignItems: "center",
                              padding: "8px",
                            }),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-blue-500 font-semibold text-xl py-2 mt-[4rem] mb-4 rounded-sm justify-center mx-auto w-[60%] flex flex-row">
                  <button
                    onClick={(e) => handleUpdateSubmit(e, filteredTeam[0]._id)}
                  >
                    Update Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Showing Sure  team Model  */}
      {showSureDeleteModel && (
        <div className="z-10 inset-0 fixed   overflow-y-auto">
          <div className="flex items-center justify-center  min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative bg-white rounded-lg p-2 w-[18rem] h-[16rem]  mx-auto">
              <div className="flex flex-col p-10  text-center justify-between">
                <div className=" text-xl font-extrabold">
                  {" "}
                  Are your sure want to delete team ?{" "}
                </div>
                <span className=" mt-2 text-xl font-serif">
                  {" "}
                  {flterDeleteTeam[0].teamName}
                </span>
                <div className=" mt-4  flex flex-row mx-auto  gap-12 justify-between">
                  <button
                    className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => handleDeleteTeam(flterDeleteTeam[0]._id)}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleCloseModal}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;