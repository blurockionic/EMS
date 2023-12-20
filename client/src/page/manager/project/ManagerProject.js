import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import Titlebar from "../../../component/utilities-components/Titlebar";

const ManagerProject = () => {
  const [profile, setProfile] = useState({});

  const [allProject, setAllProject] = useState([]);
  const [allProjectForSearch, setAllProjectForSearch] = useState([]);

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
                        //   onClick={() => handleReportClick(task)}
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
    </>
  );
};

export default ManagerProject;
