import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import { IoSettingsOutline, IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { createTeam } from "../../../Redux/slices/teamSlice";
import "react-toastify/dist/ReactToastify.css";

const CreateNewTeam = ({ profile, allManagers, allMembers, tags }) => {
  const [teamDescription, setTeamDescription] = useState("");
  const [teamName, setTeamName] = useState("");
  const [adminProfile, setAdminProfile] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedManager, setSelectedManager] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagDropdown, setTagDropdown] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setAdminProfile(profile._id);
    }
  }, [profile]);

  const handleMembersChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(dropdownOpen === dropdown ? null : dropdown);
  };

  const toggleTagDropdown = () => {
    setTagDropdown(!tagDropdown);
  };

  const handleTagSelection = (tagId) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tagId)
        ? prevTags.filter((id) => id !== tagId)
        : [...prevTags, tagId]
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) {
      alert("Team name is required");
      return;
    }

    if (selectedManager === "") {
      alert("Please select a manager");
      return;
    }

    try {
      const teamData = {
        teamName,
        teamDescription,
        adminProfile,
        selectedManager,
        selectedMembers,
        selectedTags,
      };
      const resultAction = await dispatch(createTeam(teamData));
      setTeamName("");
      setTeamDescription("");
      setSelectedManager("");
      setSelectedMembers([]);
      setSelectedTags([]);
      if (createTeam.fulfilled.match(resultAction)) {
        if (resultAction.payload.success) {
          toast.success("Team created successfully");
        } else {
          throw new Error(
            resultAction.payload.message || "Failed to create team"
          );
        }
      } else {
        throw new Error("Failed to create team");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error(
        "An error occurred while creating the team. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <ToastContainer />
      <form
        onSubmit={handleFormSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded p-6"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between lg:space-x-6">
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="teamName"
              >
                Team Name
              </label>
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
                className="w-full p-2 border rounded"
                placeholder="Enter team name"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="teamDescription"
              >
                Description
              </label>
              <textarea
                id="teamDescription"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Enter team description"
              />
            </div>
          </div>

          {/* Manager and Members Section */}
          <div className="flex flex-col w-full lg:w-1/3">
            {/* Manager Section */}
            <div className="mb-4 relative flex flex-col pb-4 border-b">
              <div className="flex flex-row justify-between text-gray-600 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 font-bold">
                Manager
                <IoSettingsOutline
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    selectedManager === "" && toggleDropdown("Manager")
                  }
                />
              </div>
              {selectedManager === "" && dropdownOpen === "Manager" && (
                <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md p-2 mt-2 w-full">
                  <div
                    className="flex justify-end cursor-pointer"
                    onClick={() => toggleDropdown(null)}
                  >
                    <IoClose className="text-xl hover:text-red-700" />
                  </div>
                  <select
                    id="selectedManager"
                    value={selectedManager}
                    onChange={(e) => setSelectedManager(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="" disabled>
                      Select Manager
                    </option>
                    {allManagers.map((manager) => (
                      <option key={manager._id} value={manager._id}>
                        {manager.firstName} {manager.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Members Section */}
            <div className= "mt-6  mb-4 relative flex flex-col pb-4 border-b">
              <div className="flex flex-row justify-between text-gray-600 dark:text-white dark:hover:text-blue-600 hover:text-blue-600 font-bold">
                Members
                <IoSettingsOutline
                  className="text-xl cursor-pointer"
                  onClick={() => toggleDropdown("Members")}
                />
              </div>
              {dropdownOpen === "Members" && (
                <div className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-md p-2 mt-2 w-full">
                  <div
                    className="flex justify-end cursor-pointer"
                    onClick={() => toggleDropdown(null)}
                  >
                    <IoClose className="text-xl hover:text-red-700" />
                  </div>
                  <Select
                    isMulti
                    options={allMembers}
                    value={selectedMembers}
                    onChange={handleMembersChange}
                    getOptionLabel={(option) =>
                      `${option.firstName} ${option.lastName}`
                    }
                    getOptionValue={(option) => option._id}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              )}
              <div className="flex flex-wrap mt-2">
                {selectedMembers.length === 0 ? (
                  <span className="text-gray-500 dark:text-white text-sm">
                    None yet
                  </span>
                ) : (
                  selectedMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded mr-2 mb-2"
                    >
                      {member.firstName} {member.lastName}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewTeam;
