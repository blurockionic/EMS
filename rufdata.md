import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { server } from "../../App";
import { FaWindowClose } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { QRCode } from "react-qrcode";
import { FaUserLarge } from "react-icons/fa6";
import EmpLeaveHistory from "./EmpLeaveHistory";
import { ToastContainer, toast } from "react-toastify";
import ApplyLeaveModel from "./ApplyLeaveModel";

// import LeaveHistroy from "./LeaveHistroy";

const EmployeeDashboard = () => {
  const [leaveViewModal, setLeaveViewModal] = useState(false);
  const [showtrainmodel, setshowtrainmodel] = useState(false);
  const [trainingName, setTrainingName] = useState("");
  const [certificateID, setCertificateID] = useState("");
  const [trainStart, setTrainStart] = useState("");
  const [trainEnd, setTrainEnd] = useState("");
  const [allTrain, setAllTrain] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const myInformation = [];
  const [employee, setEmployee] = useState([]);
  const [profile, setProfile] = useState({});
  const [activeTab, setActiveTab] = useState("Task");

  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [Loading, setLoading] = useState(false);
  // / handleling leave details values
  const [LeaveFormData, setLeaveFormData] = useState({
    ToDate: "",
    FromDate: "",
    LeaveType: "",
    Reason: "",
  });

  // handle traing tab
  const trainingcard = () => {
    setshowtrainmodel((prev) => !prev);
  };
  // addig newtraning button
  const addbutton = async () => {
    if (!trainingName || !certificateID || !trainStart || !trainEnd) {
      toast.warning(" All field are mandatory");
      return;
    }
    try {
      const response = await axios.post(
        `${server}/training/newTraining`,
        {
          trainingName,
          certificateID,
          trainStart,
          trainEnd,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { message, success } = response.data;
      // console.log(message);
      // console.log(success);

      if (success === true) {
        toast.success("Training added successfully ");
        setshowtrainmodel(false);
        setTrainingName(" ");
        setCertificateID(" ");
        setTrainEnd(" ");
        setLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseModal = () => {
    setLeaveViewModal(false);
  };

  // handleformData
  const handleFormData = (e) => {
    setLeaveFormData({ ...LeaveFormData, [e.target.name]: e.target.value });
    console.log(LeaveFormData);
  };

  // leave post request and applinig for the new Leave
  const handelchangeData = async (e) => {
    e.preventDefault();
    console.log(LeaveFormData);
    const { ToDate, FromDate, Reason, LeaveType } = LeaveFormData;

    const start = new Date(FromDate);
    const end = new Date(ToDate);
    const timeDifference = end.getTime() - start.getTime();
    const totalDaysofLeave = Math.floor(timeDifference / (1000 * 3600 * 24));

    // console.log("total leave day",totalDaysofLeave)

    try {
      const response = await axios.post(
        `${server}/leave/newapply`,
        {
          ToDate,
          FromDate,
          Reason,
          LeaveType,
          totalDaysofLeave,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success, message } = response.data;

      if (success) {
        alert(message);
        // setLoading(true);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    reportTitle: "",
    gitLink: "",
    reportDescription: "",
    isTaskCompleted: false,
  });

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
    const { reportTitle, reportDescription, gitLink } = formData;

    // console.log(reportTitle, reportDescription, isTaskCompleted);

    try {
      const responce = await axios.post(
        `${server}/taskreport/${selectedTask._id}`,
        {
          reportTitle,
          reportDescription,
          isTaskCompleted: false,
          gitLink,
          isRequested: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

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

  // Response of LeaveApplication revert by the manager
  // fetching data leave status of from db

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

  //handle on feedback
  const handleOnFeedback = (taskId) => {
    localStorage.setItem("taskId", taskId);
    navigate("../taskreportfeedback");
  };
  // get req for getting all the training data
  useEffect(() => {
    const showTraining = async () => {
      try {
        const response = await axios.get(`${server}/training/showtraining`, {
          withCredentials: true,
        });

        const { showTrain, success } = response.data;
        if (success) {
          // alert(message);
          setAllTrain(showTrain);
        }
      } catch (e) {
        console.log(e);
      }
    };
    showTraining();
  }, [Loading]);

  return (
    <div className="w-full mx-auto mt-2 bg-white rounded shadow-md">
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
        <div
          className={`cursor-pointer uppercase  py-2 px-4  ${
            activeTab === "LeaveDetails"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("LeaveDetails")}
        >
          Leave Details
        </div>
        <div
          className={`cursor-pointer uppercase  py-2 px-4  ${
            activeTab === "Training"
              ? "border-b-4 border-blue-500 text-blue-500 font-bold"
              : "bg-white"
          }`}
          onClick={() => handleTabClick("Training")}
        >
          Training
        </div>
      </div>

      {/* Personal Information  */}
      {activeTab === "Personal Information" && (
        <div className=" mt-8 flex flex-row rounded w-full pb-6 justify-between px-12">
          {/* Left Section */}

          <div className="mt-10">
            <div className="w-[7rem] h-[7rem] flex justify-center flex-col items-center rounded-full ml-10 object-contain bg-slate-300 shadow-lg">
              <FaUserLarge className="w-[4rem] h-[4rem]  text-slate-400" />{" "}
            </div>

            <div className="mt-8">
              <div className="text-black text-sm uppercase text-center  flex flex-row justify-center">
                Location
              </div>
              <div className="text-slate-600 text-lg font-semibold text-justify capitalize">
                {myInfo.address}
              </div>
            </div>
          </div>
          {/* border line  */}
          <div>
            <div className="bg-slate-500 h-full w-[0.1rem] "></div>
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

      {/* task  */}
      {/* {activeTab === "Task" && (
        <div className="p-2">
          <h2 className="text-lg font-bold mb-2"> Task Details</h2>
          <div className="container mx-auto  ">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-slate-400">
                <tr>
                  <th className="py-2 px-4 border-b">S.No</th>
                  <th className="py-2 px-4 border-b">Task Name</th>
                  <th className="py-2 px-4 border-b">Manager Name</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Request for Completion</th>
                  <th className="py-2 px-4 border-b">Feedback</th>
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
                        {task.taskTitle}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {task.managerName}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        {task.isTaskCompleted ? "Completed" : "In Progress"}
                      </td>
                      <td className="py-2 px-4 border-b flex items-center">
                        {task.isTaskCompleted ? (
                          "completed"
                        ) : task.isRequested ? (
                          <button
                            disabled
                            className="mx-auto bg-red-300 cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleReportClick(task)}
                          >
                            Requested
                          </button>
                        ) : (
                          <button
                            className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleReportClick(task)}
                          >
                            Request
                          </button>
                        )}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleOnFeedback(task._id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}

      {/* Attendance  */}
      {activeTab === "Attendance" && (
        <div className="p-2">
          <h2 className="text-lg font-bold mb-2 text-center">
            This Feature Coming Soon
          </h2>
          <p className="text-center">Not Available</p>
        </div>
      )}

      {/* leave details  */}
      {activeTab === "LeaveDetails" && (
        <div className="p-2 flex flex-row justify-evenly ">
          <div className="mt-5">
            <div className="  flex flex-col items-center bg-violet-500  mt-4 rounded-lg w-[8rem] h-[4.5rem]  ">
              <h3 className="text-white font-mono ">Sick Leave</h3>
              <div className="text-white">
                <span className=" text-4xl text-white">15</span>
                /15
              </div>
            </div>

            <div className="  flex flex-col items-center bg-green-600  mt-4 rounded-lg w-[8rem] h-[4.5rem]  ">
              <h3 className="text-white font-mono "> Casual Leave</h3>
              <div className="text-white">
                <span className=" text-4xl text-white">15</span>
                /15
              </div>
            </div>

            <div className="  flex flex-col items-center bg-sky-500  mt-4 rounded-lg w-[8rem] h-[4.5rem]  ">
              <h3 className="text-white font-mono ">Paid Leave</h3>
              <div className="text-white">
                <span className=" text-4xl text-white">15</span>
                /15
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg  text-white">
              <div className="p-4 mt-2 font-sans flex justify-center ">
                <button onClick={() => setLeaveViewModal(true)}>
                  Apply Leave
                </button>
              </div>
            </div>
          </div>

          <EmpLeaveHistory />
        </div>
      )}

      {/* training tab  */}
      {activeTab === "Training" && (
        <>
          
            <div className="p-2">
              <h2 className="text-lg font-bold mb-2 px-1"> Training Details</h2>
              <div className="container mx-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-slate-300 ">
                    <tr>
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Training Name</th>
                      <th className="py-2 px-4 border-b">Certificate ID</th>
                      <th className="py-2 px-4 border-b">Training Start</th>
                      <th className="py-2 px-4 border-b">Training End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTrain.map((Training, index) => (
                      <tr key={Training._id}>
                        <td className="py-2 px-4 border-b text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {Training.trainingName}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {Training.certificateID}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {Training.createdAt}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {Training.updatedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <button
                  id="trainbtn"
                  className="w-[5.5rem] h-[2.5rem] rounded-lg bg-[#6c7ebd] hover:bg-[#4A63BC] hover:scale-110 transform transition duration-500 z-1"
                  onClick={trainingcard}
                >
                  + ADD
                </button>
              </div>
              <ToastContainer />
            </div>
          
        </>
      )}

      {/* Report  Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <div className="flex justify-between">
              <h2 className="text-lg font-bold mb-4">Request</h2>
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
              {/* report title  */}
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

              {/* git link  */}
              <div className="mb-4">
                <label
                  htmlFor="reportTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Git Link
                </label>
                <input
                  type="text"
                  id="gitLink"
                  name="gitLink"
                  value={formData.gitLink}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* report description  */}
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

              {/* <div className="mb-4">
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
              </div> */}

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

{leaveViewModal && <ApplyLeaveModel leaveViewModal={leaveViewModal} setLeaveViewModal={setLeaveViewModal}/>}
      {/* training model */}
      {showtrainmodel && (
        <div className="fixed inset-0 z-10 mt-36 overflow-y-auto">
          <div className="flex justify-center">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={trainingcard}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div className="relative bg-white rounded-lg p-6 mx-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className=" font-bold text-xl"> Add Training </h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={trainingcard}
                >
                  X
                </button>
              </div>
              <div className="h-[0.1rem] w-full bg-slate-600 mt-2 "></div>

              <div className="mt-2">
                <div className="font-serif p-1">Training Name:</div>

                <input
                  required
                  type="text"
                  className="bg-indigo-50 w-full h-8 mt-1 rounded-lg px-3 py-2 border border-indigo-300 focus:outline-none focus:border-indigo-500"
                  onChange={(e) => setTrainingName(e.target.value)}
                  value={trainingName}
                  placeholder="Enter Training Name"
                />
              </div>

              <div>
                <div className="font-serif mt-2">Certificate ID:</div>
                <input
                  required
                  type="text"
                  className="bg-indigo-50 w-full h-8 mt-1 rounded-lg px-3 py-2 border border-indigo-300 focus:outline-none focus:border-indigo-500"
                  onChange={(e) => setCertificateID(e.target.value)}
                  value={certificateID}
                  placeholder="Enter Certificate ID"
                />
              </div>

              <div className="flex flex-row justify-between gap-32 mt-4">
                <div>
                  <div className="font-serif">Training Started:</div>

                  <input
                    required
                    type="date"
                    className="text-gray-400"
                    onChange={(e) => setTrainStart(e.target.value)}
                    value={trainStart}
                  />
                </div>

                <div>
                  <div className="font-serif">Training Ended:</div>

                  <input
                    required
                    type="date"
                    className="text-gray-400"
                    onChange={(e) => setTrainEnd(e.target.value)}
                    value={trainEnd}
                  />
                </div>
              </div>

              <div className=" flex justify-center mt-4">
                <button
                  className=" bg-indigo-200 hover:bg-indigo-300 hover:scale-110 transform transition duration-500 z-1 px-[1rem] py-2 rounded-lg"
                  onClick={addbutton}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;





















  // console.log(req.body)
  // fetch all data from request body
  // const { name, email, password, designation, designationType } = req.body;

  // try {
  //   // validation
  //   if (!name || !email || !password || !designation || !designationType) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Please fill all the details",
  //     });
  //   }

  //   // check if email is exist
  //   const isEmailExist = await User.findOne({ email });

  //   if (isEmailExist) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Email already exist",
  //     });
  //   }

  //   //encrypt password
  //   const hashPassword = await bcrypt.hash(password, 10);

  //   //designation type convert it into lowercase()
  //   const lowercaseDesignationType = designationType.toLowerCase();

  //   // create entry on db
  //   const user = await User.create({
  //     name,
  //     email,
  //     password: hashPassword,
  //     designation,
  //     designationType: lowercaseDesignationType
  //   });

  //   //return the result
  //   sendCookie(user, res, `Account created successfully!`, 201);

  // } catch (error) {
  //   return res.status(500).json({
  //       success:false,
  //       message: error
  //   })
  // }



  ------------- taks old schema ----------------------------
   // taskTitle: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // taskDescription: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // employeeName:{
    //   type:String,
    // },
    // projectName:{
    //   type:String
    // },
    // managerName:{
    //   type:String,
    // },
    // assignTo: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "employee_details",
    //   required: true,
    // },
    // taskOf: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "project",
    //   required: true,
    // },
    // managerId:{
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref: "employee_details",
    //   required: true,
    // },
    // isTaskCompleted: {
    //   type: Boolean,
    //   default: false,
    // },
    // isRequested:{
    //   type: Boolean,
    //   default: false
    // },
    // gitLink:{
    //   type: String
    // },
    // taskAssignDate:{
    //   type:String,
    //   required: true
    // },
    // taskEndDate:{
    //   type: String,
    //   required: true
    // }



    -----------------------  task create data ---------------------------------------------
// // create new task //tested
// export const task = async (req, res) => {
//   //fetch all the data from req body
//   const {
//     taskTitle,
//     taskDescription,
//     assignTo,
//     taskOf,
//     taskAssignDate,
//     taskEndDate,
//     isTaskCompleted,
//   } = req.body;
  
  
  
//   try {
//     //validation
//     if (
//       !taskTitle ||
//       !taskDescription ||
//       !assignTo ||
//       !taskOf ||
//       !taskAssignDate ||
//       !taskEndDate
//       ) {
//         return res.status(400).json({
//           success: false,
//           message: "All field are required",
//         });
//       }
      
      
      
//       // //check designation
//       // const { designationType } = req.user;
//       // if (designationType != "Manager") {
//         //   return res.status(400).json({
//           //     success: false,
//           //     message: "Only manager can assign the task!",
//           //   });
//           // }
          
          
//           // check user
//           const isEmployeeExist = await Employee.find({employeeName: assignTo});
//           if (!isEmployeeExist) {
//             return res.status(500).json({
//               success: false,
//               message: "Employee not found! Please select another employee",
//             });
//           }
          
          
//           //check project 
//           const isProjectExist = await Project.find({projectName: taskOf});
//           if (!isEmployeeExist) {
//             return res.status(400).json({
//               success: false,
//               message: "Project not found! Please select another Project",
//             });
//           }
          
//           // console.log(req.user)
//           // console.log(...isProjectExist)
//           const [project] = isProjectExist; // Assuming isProjectExist is an array
//           // const { id } = project || {}; // Destructure id from the first element or provide a default empty object
          
//           console.log(project._id);
          
//           const [employee] = isEmployeeExist
          
          
          
//           //create entry on db
//           const task = await Task.create({
//             taskTitle,
//             taskDescription,
//             employeeName: employee.employeeName,
//             projectName: project.projectName,
//             managerName: req.user.name, 
//             assignTo: employee._id,
//             taskOf : project._id,
//             managerId: req.user._id,
//             isTaskCompleted,
//             taskAssignDate,
//             taskEndDate,
//           });
          
    
//     //return success
//     return res.status(200).json({
//       success: true,
//       task,
//       message: `Task assign successsfully to ${employee.employeeName}`,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

//get all task manager //tested





    setEmployeeData: (state, action) => {
      state.data = action.payload;
      state.dataForSearch = action.payload;
    },
    filterEmployeeData: (state, action) => {
      const searchTerm = action.payload.trim().toLowerCase();
      state.data = state.dataForSearch.filter((item) =>
        item.employeeName.trim().toLowerCase().includes(searchTerm)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.dataForSearch = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });