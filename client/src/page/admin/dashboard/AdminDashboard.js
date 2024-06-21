

import React, { useEffect, useState } from "react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiRecycle } from "react-icons/gi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import axios from "axios";
import { server } from "../../../App";

const AdminDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [allProject, setAllProject] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        setEmployeeData(allEmployee.data.data);
      } catch (error) {
        console.error("Error fetching employee data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        setAllProject(projectData.data.allProject);
      } catch (error) {
        console.error("Error fetching project data:", error.message);
        alert("idhar h kya issue",error.message);
      }
    };

    fetchData();
  }, []);

  // filter out isCompleted or not
  const completedProjects = allProject.filter(
    (project) => project.isCompleted === true
  );
  const inCompletedProjects = allProject.filter(
    (project) => project.isCompleted === false
  );

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <div className="flex items-center justify-center mt-5">
            <div className="rounded-lg shadow-md p-6 text-center w-52 bg-indigo-200">
              <h2 className="text-md font-semibold uppercase">Employee</h2>
              <HiMiniUserGroup className="rounded-full w-16 h-16 mx-auto mb-4 text-gray-900" />
              <p className="text-gray-700 font-bold text-3xl">
                {employeeData.length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center justify-center mt-5">
            <div className="rounded-lg shadow-md p-6 text-center w-52 bg-red-50">
              <h2 className="text-md font-semibold uppercase text-indigo-900">
                Project
              </h2>
              <AiOutlineFundProjectionScreen className="rounded-full w-16 h-16 mx-auto mb-4 text-red-900" />
              <p className="text-red-900 font-bold text-3xl">
                {allProject.length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center justify-center mt-5">
            <div className="rounded-lg shadow-md p-6 text-center w-52 bg-yellow-200">
              <h2 className="text-md font-semibold uppercase">
                Ongoing Project
              </h2>
              <GiRecycle className="rounded-full w-16 h-16 mx-auto mb-4 text-yellow-900" />
              <p className="text-yellow-900 font-bold text-3xl">
                {inCompletedProjects.length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center justify-center mt-5">
            <div className="rounded-lg shadow-md p-6 text-center w-52 bg-green-200">
              <h2 className="text-md font-semibold uppercase">
                Completed Project
              </h2>
              <IoCheckmarkDoneCircleOutline className="rounded-full w-16 h-16 mx-auto mb-4 text-green-700" />
              <p className="text-green-700 font-bold text-3xl">
                {completedProjects.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
