import React, { useEffect, useState } from "react";
// import Titlebar from "../../../component/utilities-components/Titlebar";
import Select from "react-select";
import axios from "axios";
import { server } from "../../../App";
import { useNavigate } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate()
  const [employeeData, setEmployeeData] = useState([]);
  const [managerId, setManagerId] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    projectStartDate: "",
    projectEndDate: "",
    priority: "",
    description: "",
    websiteUrl: "",
    isCompleted: false,
    isScrap: false,
  });

  const options = [];

  //fetch all the details of employee
  useEffect(() => {
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setEmployeeData(allEmployee.data.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);

  //load
  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i].designationType === "manager") {
      const value = employeeData[i]._id;
      const label = employeeData[i].employeeName;
      options.push({ value, label });
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    const {
      projectName,
      projectStartDate,
      projectEndDate,
      priority,
      description,
      websiteUrl,
    } = formData;

    //request to the server
    const response = await axios.post(
      `${server}/project/new`,
      {
        projectName,
        projectStartDate,
        projectEndDate,
        priority,
        description,
        managerId,
        websiteUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );

      console.log(response)
      const {success, message} = response.data 
      if(success){
        alert(message)
        navigate("../allProject")
      }
  };

  //set item name handle
  const handleSelectChange = (selectedOption) => {
    // console.log("selected Option", selectedOption);
    // console.log(selectedOption.value);
    setManagerId(selectedOption.value);
  };
  return (
    <>
      {/* form for new project  */}
      <div className="container  max-w-xl mx-auto flex flex-col ">
        <form
          onSubmit={handleSubmit}
          className=" mx-auto bg-white p-8 rounded shadow-md"
        >
          <h2 className="text-2xl flex justify-center font-bold mb-6">Project Information</h2>

          {/* Add more input fields as needed */}

          {/* project information */}
          <div className="mb-4 w-[32rem]">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectName"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="border border-black rounded-lg  p-2 w-full"
              required
            />
          </div>

            {/* stating and submition date */}
          <div className=" flex flex-row flex-wrap gap-5 justify-between">
          <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Start Date
            </label>
            <input
              type="date"
              id="projectStartDate"
              name="projectStartDate"
              value={formData.projectStartDate}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="  text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Submission Date
            </label>
            <input
              type="date"
              id="projectEndDate"
              name="projectEndDate"
              value={formData.projectEndDate}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>


          </div>

          {/* priority and manager name  */}
          <div className=" flex flex-row flex-wrap gap-5 justify-between">

            <div className="mb-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border border-black rounded-lg p-2 w-full"
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Mnagaer Name
            </label>
            <Select
              onChange={handleSelectChange}
              options={options}
              className=" border border-black rounded-lg w-64 py-1 px-2"
            />
            </div>

          </div>
        
          {/* Description */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              required
            />
          </div>

          {/* website Urls */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectStartDate"
            >
              Website URL(Optional)
            </label>
            <input
              type="text"
              id="websiteUrl"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleChange}
              className="border border-black rounded-lg p-2 w-full"
              // required
            />
          </div>

          {/* Add more input fields for other project information */}

          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isCompleted"
            >
              Is Completed
            </label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              checked={formData.isCompleted}
              onChange={handleChange}
              className="mr-2"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isScrap"
            >
              Is Scrap
            </label>
            <input
              type="checkbox"
              id="isScrap"
              name="isScrap"
              checked={formData.isScrap}
              onChange={handleChange}
              className="mr-2"
            />
          </div> */}

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProject;
