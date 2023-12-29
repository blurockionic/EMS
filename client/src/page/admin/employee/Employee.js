import React, { useEffect, useState } from "react";
import Titlebar from "../../../component/utilities-components/Titlebar";
// import SearchBar from "../../../component/utilities-components/SearchBar";
import axios from "axios";
import { server } from "../../../App";
import EmployeeTable from "../../../component/utilities-components/EmployeeTable";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDataForSearch, setEmployeeDataForSearch] = useState([]);

  //fetch all the details of employee
  useEffect(() => {
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setEmployeeData(allEmployee.data.data);

        setEmployeeDataForSearch(allEmployee.data.data);
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
      setEmployeeData(employeeData); // If the search term is empty, show the entire original array
    } else {
      // Filter the array based on the search term
      const tempVar = employeeDataForSearch?.filter((item) =>
        item.employeeName?.trim().toLowerCase().includes(searchTerm)
      );
      setEmployeeData(tempVar); // Update the array state with the filtered results
    }
  };
  return (
    <>
      {/* title bar  */}
      <div className="flex justify-between">
        <div>
          <Titlebar title={"Employee Details"} />
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

      {/* employee table  */}
      <div className="mt-5">
        <EmployeeTable employeeData={employeeData} />
      </div>
    </>
  );
};

export default Employee;
