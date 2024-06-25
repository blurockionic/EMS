import React, { useState } from "react";
import axios from "axios";
import { server } from "../../../App";
import { useNavigate } from "react-router-dom";
import Loader from "../../../component/utilities-components/Loader";

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
  const [projectCategory, setProjectCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [billingFrequency, setBillingFrequency] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [phases, setPhases] = useState([]);
  const [toolsAndTechnologies, setToolsAndTechnologies] = useState([]);
  const [requiredResources, setRequiredResources] = useState([]);

  const handleArrayInput = (setter) => (event) => {
    const newValue = event.target.value;
    const newArray = newValue.split(",").map((item) => item.trim());
    setter(newArray);
  };

  const handleSubmit = (e) => {
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
      projectCategory,
      startDate,
      endDate,
      estimatedBudget,
      paymentTerms,
      billingFrequency,
      projectManager,
      teamMembers,
      phases,
      toolsAndTechnologies,
      requiredResources,
    };

    // Here you can perform any logic with formData, like sending it to a server
    console.log("Form data:", formData);

    // Example of using axios to send data to a server
    // axios.post(`${server}/projects`, formData)
    //   .then(response => {
    //     // Handle successful response
    //   })
    //   .catch(error => {
    //     // Handle error
    //   });
  };

  return (
    <div className="max-w-[80%] mx-auto p-2">
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
                Add a description project objective
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
                Add a description project scope
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
              <label className="block    font-semibold ">
                Add deliverables list of items
              </label>
              <textarea
                value={deliverables.join("\n")}
                onChange={handleArrayInput(setDeliverables)}
                rows={deliverables.length + 1}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
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

            <div className="mt-4">
              <label className="block font-semibold ">Add payment terms</label>
              <input
                type="text"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Add billing timing</label>
              <input
                type="text"
                value={billingFrequency}
                onChange={(e) => setBillingFrequency(e.target.value)}
                className="w-full px-3  py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
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
            </div>

            <div className="mt-4">
              <label className="block dark:text-white font-semibold ">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Project type</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              >
                <option value="">Select</option>
                <option value="Type1">Type 1</option>
                <option value="Type2">Type 2</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">Project Category:</label>
              <select
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              >
                <option value="">Select</option>
                <option value="Category1">Category 1</option>
                <option value="Category2">Category 2</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block  font-semibold ">Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block font-semibold ">End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block    font-semibold ">
                Project Manager:
              </label>
              <input
                type="text"
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>

            <div className="mt-4">
              <label className="block    font-semibold ">
                Team Members (comma-separated):
              </label>
              <input
                type="text"
                value={teamMembers.join(", ")}
                onChange={handleArrayInput(setTeamMembers)}
                className="w-full px-3   py-1.5 pl-2 border dark:border-[#30363D]  text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
