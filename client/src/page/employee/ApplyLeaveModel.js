import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../App";

const ApplyLeaveModel = ({ leaveViewModal, setLeaveViewModal }) => {
  const [userId, setUserId] = useState();
  const [allTeamInfoData, setAllTeamInFoData] = useState([]);
  const [allMembers, setAllMemebers] = useState([]);
  const [member, setMember] = useState();

  //get profile an employee that is using
  useEffect(() => {
    const myProfile = async () => {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });

      console.log("user id OR OTHER IDS ", response.data.user.employeeId);
      setUserId(response.data.user.employeeId);
    };

    myProfile();
  }, []);

  //   find the member in team data
  // get call for the specific emp team
  useEffect(() => {
    const teamData = async () => {
      try {
        const empTeamData = await axios.get(`${server}/team/allTeams`, {
          withCredentials: true,
        });

        console.log("all teams data is here", empTeamData.data.allTeamsData);
        setAllTeamInFoData(empTeamData.data.allTeamsData);
      } catch (error) {}
    };
    teamData();
  }, []);

  // Assuming allTeamInfoData is an array of team objects with "_id" property
  useEffect(() => {
    // Set allMembers with the _id property of each team
    setAllMemebers(allTeamInfoData.map((eachTeam) => eachTeam.selectedMembers));

    // Log the value of allMembers
    console.log("all each team id ", allMembers);
  }, [allTeamInfoData]); // Add dependency array to run the effect when allTeamInfoData changes

  useEffect(() => {
    // Flatten the selectedMembers arrays into a single array
    const flattenedMembers = allTeamInfoData.flatMap(
      (eachTeam) => eachTeam.selectedMembers
    );

    // Set allMembers with the flattened array
    setAllMemebers(flattenedMembers);

    // Log the value of allMembers
    console.log(
      "all id in single line ",
      typeof flattenedMembers,
      flattenedMembers
    );
    const user = flattenedMembers.filter((one) => one._id === userId);
    console.log("kuchha aa bhi raha kya ", user);  
  }, [allTeamInfoData]);

  const handleCloseModal = () => {
    setLeaveViewModal(false);
  };

  // handleling leave details values
  const [LeaveFormData, setLeaveFormData] = useState({
    ToDate: "",
    FromDate: "",
    LeaveType: "",
    Reason: "",
  });
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

  return (
    <div>
      {/* leave module  */}
      {leaveViewModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex justify-center ">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            <div className="relative bg-white rounded-lg p-6 mx-auto">
              <div className="flex justify-between">
                <div>
                  <h1 className=" font-bold text-xl"> Apply Leave</h1>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCloseModal}
                >
                  X
                </button>
              </div>
              {/* Your modal content goes here */}

              <div className="">
                <h2 className=" font-bold mt-4 text-lg  bg-slate-900 rounded-lg p-1 flex text-white justify-center">
                  <button onClick={() => setLeaveViewModal(true)}></button>
                  apply Leave
                </h2>
                <div className="items-center rounded-lg bg-slate-10 shadow-2xl shadow-slate-400">
                  <div className="flex flex-row justify-between">
                    <div></div>
                    <div className="flex-col px-8">
                      <div className="mt-5">
                        <span className="font-extrabold text-xl">
                          Leave Type
                        </span>
                        <select
                          name="LeaveType"
                          id=""
                          className="text-lg w-[12rem]  "
                          onChange={handleFormData}
                        >
                          <option disabled hidden>
                            Choose Here
                          </option>

                          <option value="Sick">Sick Leave</option>
                          <option value="Casual"> Casual Leave</option>
                          <option value="Paid">paid leave</option>
                        </select>
                      </div>

                      <div className="flex-col mr-10 ">
                        {/*starting leave date */}
                        <div className="font-bold w-[15rem] mt-4">
                          From Date
                        </div>
                        <input
                          type="date"
                          name="FromDate"
                          value={LeaveFormData.FromDate}
                          required
                          onChange={handleFormData}
                        />

                        {/*Ending leave date */}
                        <div className="font-bold  mt-4">To Date</div>
                        <input
                          type="date"
                          name="ToDate"
                          value={LeaveFormData.ToDate}
                          required
                          onChange={handleFormData}
                        />
                      </div>

                      <div className="font-bold   text-xl ">Reason</div>
                      <textarea
                        name="Reason"
                        id=""
                        required
                        className="w-[25rem] h-[8rem] flex mx-auto mt-2 border-2 border-black"
                        value={LeaveFormData.Reason}
                        type="text"
                        onChange={handleFormData}
                      />

                      <div className="flex flex-row justify-center  ">
                        <button
                          className=" bg-sky-700 p-2 text-white font-bold text-2xl mt-2 mb-2 rounded-lg"
                          onClick={handelchangeData}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyLeaveModel;
