import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";

const EmployeeDashboard = () => {
  const [allTask, setAllTask] = useState([]);
  const myInformation = [];
  const [employee, setEmployee] = useState([]);
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState("Personal Information");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  //all employee
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        setEmployee(allEmployee.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };
  
    fetchData();
  }, []);

  
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
  
  //all task
  useEffect(() => {
    const getMyTask = async () => {
      try {
        const response = await axios.get(`${server}/task/all`, {
          withCredentials: true,
        });
  
        // console.log(response);
        setAllTask(response.data.allTask);
      } catch (error) {
        console.error("Error fetching task:", error.message);
      }
    };
  
    getMyTask();
  }, []);
  
  

  console.log(allTask);

 

  for (let i = 0; i < employee.length; i++) {
    if (employee[i].employeeEmail === profile.email) {
      myInformation.push(employee[i]);
    }
  }

console.log(profile);
  const [myInfo] = myInformation;

  return (
    <div className="w-full mx-auto mt-2 p-4 bg-white rounded shadow-md">
      <div className="flex">
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTab === "Personal Information"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Personal Information")}
        >
          Personal Information
        </div>
        <div
          className={`cursor-pointer uppercase py-2 px-4 mr-4 ${
            activeTab === "Task"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Task")}
        >
          Task
        </div>

        <div
          className={`cursor-pointer uppercase  py-2 px-4  ${
            activeTab === "Attendance"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Attendance")}
        >
          Attendance
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "Personal Information" && (
          <div>
            {/* <div className="bg-gray-200 p-4 rounded shadow-md w-full mx-auto my-4">
              <div className="text-center mb-4">
                
                <h2 className="text-lg font-bold capitalize">
                  {myInfo.employeeName}
                </h2>
                <p className="text-gray-600 capitalize">{myInfo.designation}</p>
                <p className="text-gray-600 capitalize">
                  Date of Birth: {myInfo.dateOfBirth}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">
                  Contact Information
                </p>
                <ul className="list-disc list-inside">
                  <li>Email: {myInfo.employeeEmail}</li>
                  <li>Phone: {myInfo.employeePhoneNumber}</li>
                </ul>
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold mb-1">Address</p>
                <p className="text-gray-600">{myInfo.address}</p>
              </div>
            </div> */}
          </div>
        )}

        {activeTab === "Task" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Content for Tab 2</h2>
            <p>This is the content for Tab 2.</p>
          </div>
        )}

        {activeTab === "Attendance" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Content for Tab 2</h2>
            <p>This is the content for Tab 3.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
