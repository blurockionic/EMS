import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../../App";
import { useNavigate } from "react-router-dom";
import Loader from "../../../component/utilities-components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import Select from "react-select";

import { AiOutlineMinusCircle } from "react-icons/ai";

const NewProject = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectObjectives, setProjectObjectives] = useState("");
  const [projectScope, setProjectScope] = useState("");
  const [deliverables, setDeliverables] = useState([]);
  const [projectType, setProjectType] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [billingFrequency, setBillingFrequency] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  // const [phases, setPhases] = useState([]);
  // const [toolsAndTechnologies, setToolsAndTechnologies] = useState([]);
  // const [requiredResources, setRequiredResources] = useState([]);
  const [newDeliverable, setNewDeliverable] = useState("");



  const dispatch = useDispatch();
  const { data: users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  console.log("all data", users);

  const handleAddDeliverable = () => {
    if (newDeliverable.trim() !== "") {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable("");
    }
  };

  const handleRemoveDeliverable = (index) => {
    const updatedDeliverables = [...deliverables];
    updatedDeliverables.splice(index, 1);
    setDeliverables(updatedDeliverables);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      padding: "6px 8px",
      borderColor: state.isFocused ? "#30363D" : "#30363D",
      backgroundColor: "#161B22",
      color: "#ffffff",
      fontSize: "1rem",
      borderRadius: "4px",
      "&:hover": {
        borderColor: "#30363D",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#161B22",
      borderColor: "#30363D",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#30363D" : "#161B22",
      "&:hover": {
        backgroundColor: "#30363D",
      },
      color: "#ffffff",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#30363D",
      color: "#ffffff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#ffffff",
        color: "#000000",
      },
    }),
  };

  const options = users
    .filter((user) => user.role === "employee") // Adjust role based on your application logic
    .map((teamMember) => ({
      value: teamMember._id,
      label: `${teamMember.firstName} ${teamMember.lastName}`,
    }));

  const handleTeamMembersChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setTeamMembers(selectedIds);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      projectName,
      client: {
        name,
        contactInformation: {
          email,
          phoneNumber,
          address,
        },
      },
      projectDescription,
      projectObjectives,
      projectScope,
      deliverables,
      projectType,
      startDate,
      endDate,
      estimatedBudget,
      // paymentTerms,
      // billingFrequency,
      projectManager,
      teamMembers,
      // phases,
      // toolsAndTechnologies,
      // requiredResources,
    };
    try {
      const response = await axios.post(`${server}/project/new`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // Handle successful response
      console.log(response.data);
    } catch (error) {
      // Handle error
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div className="max-w-[80%] mx-auto p-2 border mt-2 rounded-md shadow-xl mb-8">
      <div className="flex flex-col ">
        <div className="flex flex-row space-x-8 ">
          <div className="w-[70%] mt-4">
            <h2 className="font-semibold text-2xl"> Project details </h2>

            <div className=" mt-4">
              <label className="block font-semibold ">Project name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block    font-semibold mb-1">
                Add a description project description
              </label>
              <div className="border p-2 rounded-md">
                <textarea
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block  font-semibold mb-1">
                Add a project objective
              </label>
              <div className="border p-2 rounded-md">
                <textarea
                  value={projectObjectives}
                  onChange={(e) => setProjectObjectives(e.target.value)}
                  rows={4}
                  className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block  font-semibold mb-1">
                Add a project scope
              </label>
              <div className="border p-2 rounded-md">
                <textarea
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  rows={4}
                  className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold">
                Add deliverables list of items
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  list="deliverablesList"
                  className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded-l dark:bg-[#161B22] dark:text-slate-400"
                  placeholder="Enter or select deliverable"
                />
                <datalist id="deliverablesList">
                  {deliverables.map((deliverable, index) => (
                    <option key={index} value={deliverable} />
                  ))}
                </datalist>
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="flex items-center font-semibold bg-slate-800 dark:bg-gray-600 text-white px-4 py-1.5 rounded-md shadow-inner hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer mx-1"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2">
                {deliverables.map((deliverable, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-1 bg-gray-100 dark:bg-[#2D333B] px-3 rounded mb-1"
                  >
                    <span className="mr-2 text-lg">{deliverable}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(index)}
                      className="text-red-600 hover:text-red-700 focus:outline-none"
                    >
                      <AiOutlineMinusCircle size={20} />{" "}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-[30%] mt-4">
            <h2 className="font-semibold text-2xl"> Client details </h2>
            <div className=" mt-4">
              <label className="block font-semibold ">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>
            <div className="mt-4">
              <label className="block font-semibold ">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
              <small className="block mt-1 text-gray-500 dark:text-gray-400">
                Add first country code like +91
              </small>
            </div>

            <div className="mt-4">
              <label className="block dark:text-white font-semibold">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
              <small className="block mt-1 text-gray-500 dark:text-gray-400">
                Use comma (,) to separate house no, landmark, state, and
                country.
              </small>
            </div>
            <div className="mt-4">
              <label className="block font-semibold">Project type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              >
                <option value="">Select</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="System Software">System Software</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block  font-semibold ">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">End date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Project manager</label>
              <select
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
                className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              >
                <option value="">Select Project Manager</option>
                {users
                  .filter((user) => user.role === "manager")
                  .map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.firstName} {manager.lastName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Team members</label>
              <Select
                options={options}
                value={options.filter((option) =>
                  teamMembers.includes(option.value)
                )}
                onChange={handleTeamMembersChange}
                isMulti
                placeholder="Select Team Members"
                styles={customStyles}
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Estimated budget</label>
              <input
                type="number"
                value={estimatedBudget}
                onChange={(e) => setEstimatedBudget(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="flex items-center font-semibold bg-slate-800 dark:bg-gray-600 text-white px-4 py-1.5 rounded-md shadow-inner hover:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer mx-1"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
