import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { createTeam } from "../../../Redux/slices/teamSlice";
import { toast } from "react-toastify";

const CreateNewTeam = ({
  profile,
  allManagers,
  allMembers,
  loading,
  setLoading,
}) => {
  const [teamDescription, setTeamDescription] = useState("");
  const [teamName, setTeamName] = useState("");
  const [adminProfile, setAdminProfile] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setAdminProfile(profile._id);
    }
  }, [profile]);

  const handleMembersChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!teamName) {
      alert("Team name is Required");
      return;
    }

    if (selectedManager === "") {
      alert("Please select Manager");
      return;
    }

    try {
      const teamData = {
        teamName,
        teamDescription,
        adminProfile,
        selectedManager,
        selectedProject,
        selectedMembers,
      };
      const resultAction = dispatch(createTeam(teamData));
      setTeamName("");
      setTeamDescription("");
      setSelectedManager("");
      setSelectedMembers([]);
      setSelectedProject("");
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
    <div>
      <div className="container mx-auto w-[60%] h-auto bg-white shadow-2xl">
        <div className="m-12">
          <div>
            <h1 className="text-2xl uppercase text-center font-bold text-blue-500">
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
                  className="p-2 font-semibold border border-slate-400 outline-none rounded-sm"
                >
                  <option className="text-slate-400" value="">
                    Select Manager
                  </option>
                  {allManagers?.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.firstName} {manager.lastName}
                    </option>
                  ))}
                </select>
              </div>
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
                    <div className="w-full mx-auto">
                      <Select
                        value={selectedMembers}
                        onChange={handleMembersChange}
                        isMulti
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
    </div>
  );
};

export default CreateNewTeam;
