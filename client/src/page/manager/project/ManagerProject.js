import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import Titlebar from "../../../component/utilities-components/Titlebar";
import { useNavigate } from "react-router-dom";

const ManagerProject = () => {
  const navigate = useNavigate()
  const initialFormData = {
    reportTitle: "",
    reportDescription: "",
    isProjectCompleted: false,
    projectId: "",
    managerId: "",
    adminId: "",
  }
  const [formData, setFormData] = useState(initialFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({});

  const [allProject, setAllProject] = useState([]);
  const [allProjectForSearch, setAllProjectForSearch] = useState([]);

  const [selectedProject, setSelectedProject] = useState({});

  //fetch all the details of employee
  useEffect(() => {
    const data = async () => {
      try {
        const data = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setAllProject(data.data.allProject);

        setAllProjectForSearch(data.data.allProject);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);

  // handle search
  const handleSearch = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the trimmed lowercase search term

    if (searchTerm === " ") {
      setAllProject(allProject); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = allProjectForSearch?.filter((item) =>
        item.projectName?.trim().toLowerCase().includes(searchTerm)
      );
      setAllProject(tempVar); // Update the array state with the filtered results
    }
  };

  //all profile
  useEffect(() => {
    const myProfile = async () => {
      try {
        const response = await axios.get(`${server}/users/me`, {
          withCredentials: true,
        });

        setProfile(response.data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    myProfile();
  }, []);

  // handle for report button
  const handleReportClick = (project) => {
    setIsModalOpen(true);
  
    // set values in a single call
    setFormData({
      ...formData,
      managerId: project.managerId,
      adminId: project.adminId,
      projectId: project._id,
      reportTitle: project.projectName,
    });
  
    // set project
    setSelectedProject(project);
  };
  

  // control for show the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // handle for the change in value
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle for submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add logic to handle form submission, e.g., send data to server
    // console.log("Form submitted with data:", formData);
    // You can add additional logic here, such as API calls to submit the data.
    const {
      reportTitle,
      reportDescription,
      isProjectCompleted,
      projectId,
      managerId,
      adminId,
    } = formData;

    try {
      const response = await axios.post(
        `${server}/reportProject/new`,
        {
          reportTitle,
          reportDescription,
          isProjectCompleted,
          projectId,
          managerId,
          adminId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // console.log(response.data.reportProject.managerId)
      //when success 
      const {success, message} = response.data
      // console.log(message)
      localStorage.setItem("id", response.data.reportProject.managerId)
      setIsModalOpen(false)
      if(success){
        setFormData(initialFormData)
        alert(message)
        navigate("../managerreport")
      }


    } catch (error) {
      console.log(error)
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <Titlebar title={"Project Details"} />
        </div>
        <div>
          {/* handle search  */}
          <div className="w-96 flex items-center border border-green-300 rounded-md p-1 mx-1">
            <span className="text-xl mx-1">&#128269;</span>
            <input
              type="text"
              onChange={(e) => handleSearch(e)}
              placeholder="Search employee name..."
              className="w-96 p-2 rounded-lg outline-none"
            />
          </div>
          {/* end handle search  */}
        </div>
      </div>
      {allProject.length > 0 ? (
        <div className="overflow-x-auto mt-5">
          <table className="min-w-full table-auto">
            <thead className="bg-slate-400">
              <tr>
                <th className="border px-4 py-2">S.No</th>
                <th className="border px-4 py-2">Project Name</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">Submission Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Details</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              {allProject
                .filter(
                  (assignProject) =>
                    assignProject.managerId === profile.employeeId
                )
                .map((project, index) => (
                  <tr key={project._id} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{project.projectName}</td>
                    <td className="border px-4 py-2">{project.description}</td>
                    <td className="border px-4 py-2">
                      {project.projectStartDate}
                    </td>
                    <td className="border px-4 py-2">
                      {project.projectEndDate}
                    </td>
                    <td className="border px-4 py-2">
                      {project.isCompleted ? (
                        <span className="text-green-800">Completed</span>
                      ) : (
                        <span className="text-red-800">Not Completed</span>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleReportClick(project)}
                      >
                        Report
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        //   onClick={() => handleReportClick(task)}
                      >
                        View
                      </button>
                    </td>

                    {/* Add more cells as needed */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-5 p-4 bg-slate-200">
          <h1 className="uppercase font-bold">Sorry! Data not available!</h1>
        </div>
      )}

      {/* show modal  */}

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-6 w-[500px] mx-auto">
              {/* Your modal content goes here */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reportTitle"
                  >
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    name="reportTitle"
                    value={formData.reportTitle}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter report title"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="reportDescription"
                  >
                    Report Description
                  </label>
                  <textarea
                    id="reportDescription"
                    name="reportDescription"
                    value={formData.reportDescription}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter report description"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="isProjectCompleted"
                  >
                    Is Project Completed
                  </label>
                  <input
                    type="checkbox"
                    id="isProjectCompleted"
                    name="isProjectCompleted"
                    checked={formData.isProjectCompleted}
                    onChange={handleChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Check if project is completed</span>
                </div>

                {/* <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="projectId"
                  >
                    Project ID
                  </label>
                  <input
                    type="text"
                    id="projectId"
                    name="projectId"
                    disabled
                    value={formData.projectId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter project ID"
                  />
                </div> */}

                {/* <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="managerId"
                  >
                    Manager ID
                  </label>
                  <input
                    type="text"
                    id="managerId"
                    name="managerId"
                    disabled
                    value={formData.managerId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter manager ID"
                  />
                </div> */}

                {/* <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="adminId"
                  >
                    Admin ID
                  </label>
                  <input
                    type="text"
                    id="adminId"
                    name="adminId"
                    disabled
                    value={formData.adminId}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter admin ID"
                  />
                </div> */}

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerProject;
