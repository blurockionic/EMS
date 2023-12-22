import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { server } from "../../App";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { QRCode } from "react-qrcode";
import { FaUserLarge } from "react-icons/fa6";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportTitle: "",
    reportDescription: "",
    isTaskCompleted: false,
  });

  const [allTask, setAllTask] = useState([]);
  const myInformation = [];
  const [employee, setEmployee] = useState([]);
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState("Task");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

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

  const closeModal = () => {
    setShowModal(false);
  };

  // handle for tab
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
        console.error(
          "Error fetching employee data:",
          error.response.data.message
        );
      }
    };

    fetchData();
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
        console.error("Error fetching task:", error.responce.data.message);
      }
    };

    getMyTask();
  }, []);

  // const [profile, setProfile] =  useState({})

  for (let i = 0; i < employee.length; i++) {
    if (employee[i]._id === profile.employeeId) {
      myInformation.push(employee[i]);
    }
  }

  const [myInfo] = myInformation;

  // console.log(myInfo)
  // Set id in local storage
  localStorage.setItem("id", profile.employeeId);

  // handle for report button clicked
  const handleReportClick = (task) => {
    //  alert(id)
    setSelectedTask(task);
    setShowModal(true);

    // Assuming selectedTask and selectedTask.employeeId are defined
    if (selectedTask && selectedTask.assignTo) {
      // Set id in local storage
      localStorage.setItem("id", selectedTask.assignTo);
    } else {
      // Handle the case where selectedTask or selectedTask.employeeId is not defined
      console.error(
        "Unable to set id in local storage. Check selectedTask and selectedTask.employeeId."
      );
    }
  };

  // for update the form
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //submit the report for create the entry on db
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optionally, reset the form after submission
    const { reportTitle, reportDescription, isTaskCompleted } = formData;

    // console.log(reportTitle, reportDescription, isTaskCompleted);

    try {
      const responce = await axios.post(
        `${server}/taskreport/${selectedTask._id}`,
        {
          reportTitle,
          reportDescription,
          isTaskCompleted,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(responce);

      const { success, message } = responce.data;

      if (success) {
        alert(message);
      }

      //reset the form
      setFormData({
        reportTitle: "",
        reportDescription: "",
        isTaskCompleted: false,
      });

      setShowModal(false);
      navigate("../reporthistory");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  //download profile card
  const profileCardRef = useRef(null);

  const downloadProfileCard = () => {
    const profileCard = profileCardRef.current;

    if (profileCard) {
      const htmlContent = profileCard.innerHTML;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "profile_card.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

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
        {/* <div
          className={`cursor-pointer uppercase  py-2 px-4  ${
            activeTab === "Report History"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Report History")}
        >
          Report History
        </div> */}
      </div>

      <div className="mt-4">
        {activeTab === "Personal Information" && (
          <div className="mt-4">
            {activeTab === "Personal Information" && (
              <div className="bg-slate-50 flex flex-row rounded shadow-md w-full pb-6 justify-between px-12">
                {/* Left Section */}
                <div className="mt-10">
                  <div className="w-[7rem] h-[7rem] flex items-center justify-center ml-24 rounded-full bg-slate-300 shadow-lg">
                    <FaUserLarge className="text-7xl text-slate-400" />
                  </div>

                  <div className="mt-8">
                    <div className="text-black text-sm uppercase text-center">
                      Location
                    </div>
                    <div className="text-slate-600 text-lg font-semibold text-justify capitalize">
                      {myInfo.address}
                    </div>
                  </div>
                </div>

                {/* Center Section */}
                <div className="flex flex-col">
                  <div className="mt-4">
                    <h2 className="text-black text-sm ">Name</h2>
                    <div className="text-xl text-slate-800  ">
                      {myInfo.employeeName}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-black text-sm  "> Gender</h3>
                    <div className="text-xl text-slate-800 capitalize">
                      {myInfo.gender}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-black text-sm  ">Date of Birth</h3>
                    <div className="text-xl text-slate-800 ">
                      {myInfo.dateOfBirth}
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col">
                  <div className="mt-4">
                    <p className="text-black text-sm uppercase ">Email </p>
                    <div className="text-xl text-slate-800 ">
                      {myInfo.employeeEmail}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-black text-sm uppercase">Phone</p>
                    <div className="text-xl text-slate-800 ">
                      {myInfo.employeePhoneNumber}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-black text-sm uppercase ">Address</p>
                    <p className="text-xl text-slate-800 ">{myInfo.address}</p>
                  </div>
                </div>

                {/* QR Code and Button */}
                <div className="flex flex-col">
                  <div className="mt-4">
                    <h3 className="text-black text-sm uppercase text-center">
                      {" "}
                      Designation
                    </h3>
                    <div className="font-bold capitalize text-center">
                      {myInfo.designation}
                    </div>
                  </div>

                  <div className="w-40 mx-auto mt-4">
                    <QRCode value={myInfo._id} />
                  </div>

                  <button
                    disabled
                    onClick={downloadProfileCard}
                    className=" text-white px-4 py-2 mt-4 rounded-md focus:outline-none"
                  >
                    Download Profile Card
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Task" && (
              <div>
                <h2 className="text-lg font-bold mb-2">Task Details</h2>
                <div className="container mx-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">S.No</th>
                        <th className="py-2 px-4 border-b">Task ID</th>
                        <th className="py-2 px-4 border-b">Task Name</th>
                        <th className="py-2 px-4 border-b">Employee Name</th>
                        {/* Add more columns as needed */}
                        <th className="py-2 px-4 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTask
                        .filter((task) => task.employeeName === profile.name)
                        .map((task, index) => (
                          <tr key={task._id}>
                            <td className="py-2 px-4 border-b text-center">
                              {index + 1}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task._id}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task.taskTitle}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                              {task.managerName}
                            </td>
                            {/* Add more cells based on your task object */}
                            <td className="py-2 px-4 border-b flex items-center">
                              {task.isTaskCompleted ? (
                                "Completed"
                              ) : (
                                <button
                                  className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleReportClick(task)}
                                >
                                  Report
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Attendance" && (
              <div>
                <h2 className="text-lg font-bold mb-2 text-center">
                  This Feature Coming Soon
                </h2>
                <p className="text-center">Not Available</p>
              </div>
            )}

            {/* {activeTab === "Report History" && (
            <div>
              <h2 className="text-lg font-bold mb-2">Content for Tab 2</h2>
              <p>This is the content for Tab 4.</p>
            </div>
          )} */}
          </div>
        )}

        {activeTab === "Task" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Task Details</h2>
            <div className="container mx-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">S.No</th>
                    <th className="py-2 px-4 border-b">Task ID</th>
                    <th className="py-2 px-4 border-b">Task Name</th>
                    <th className="py-2 px-4 border-b">Employee Name</th>
                    {/* Add more columns as needed */}
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allTask
                    .filter((task) => task.employeeName === profile.name)
                    .map((task, index) => (
                      <tr key={task._id}>
                        <td className="py-2 px-4 border-b text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {task._id}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {task.taskTitle}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {task.managerName}
                        </td>
                        {/* Add more cells based on your task object */}
                        <td className="py-2 px-4 border-b flex items-center">
                          {task.isTaskCompleted ? (
                            "Completed"
                          ) : (
                            <button
                              className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleReportClick(task)}
                            >
                              Report
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Attendance" && (
          <div>
            <h2 className="text-lg font-bold mb-2 text-center">
              This Feature Coming Soon
            </h2>
            <p className="text-center">Not Available</p>
          </div>
        )}

        {/* {activeTab === "Report History" && (
          <div>
            <h2 className="text-lg font-bold mb-2">Content for Tab 2</h2>
            <p>This is the content for Tab 4.</p>
          </div>
        )} */}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold mb-4">Report Task</h2>
              {/* Add more content for your report modal */}
              <button
                className="   font-bold text-red-600 text-2xl rounded-xl"
                onClick={closeModal}
              >
                <FaWindowClose />
              </button>
            </div>

            <p>{`Reporting task: ${selectedTask.taskTitle}`}</p>

            {/* // form  */}
            <form
              onSubmit={handleSubmit}
              className="w-96 mx-auto bg-white p-8 rounded shadow-md mt-4"
            >
              <div className="mb-4">
                <label
                  htmlFor="reportTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Report Title
                </label>
                <input
                  type="text"
                  id="reportTitle"
                  name="reportTitle"
                  value={formData.reportTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="reportDescription"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Report Description
                </label>
                <textarea
                  id="reportDescription"
                  name="reportDescription"
                  value={formData.reportDescription}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label htmlFor="isTaskCompleted" className="flex items-center">
                  <input
                    type="checkbox"
                    id="isTaskCompleted"
                    name="isTaskCompleted"
                    checked={formData.isTaskCompleted}
                    onChange={handleChange}
                    className="mr-2 leading-tight"
                  />
                  <span className="text-sm">Is Task Completed?</span>
                </label>
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
