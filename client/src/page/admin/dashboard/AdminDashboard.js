import React, { useEffect, useState } from "react";

import axios from "axios";
import { server } from "../../../App";
import MyEvents from "../../../component/utilities-components/MyEvents";

import { HiUserGroup } from "react-icons/hi";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiRecycle } from "react-icons/gi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";

const AdminDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);

   //fetch all the details of project
   const dispatch = useDispatch();

   const projectState = useSelector((state) => state.project);
   const {
     allProject,
     status: projectStatus,
     error: projectError,
   } = projectState;
 
   useEffect(() => {
     if (projectStatus === "idle") {
       dispatch(fetchProjects());
     }
   }, [projectStatus, dispatch]);
 
  //  console.log("all project data me h kuchh ", allProject);
 
   const profile = useSelector((state) => state.profile.data);
 
   useEffect(() => {
     dispatch(fetchProfile());
   }, [dispatch]);
 




  // filter out isCompleted or not
  const completedProjects = allProject.filter(
    (project) => project.isCompleted === true
  );
  const inCompletedProjects = allProject.filter(
    (project) => project.isCompleted === false
  );

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4 p-4">
        <div className="mt-4">
          <div className="flex flex-wrap justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 min-w-[200px] dark:bg-transparent bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center">
              <HiUserGroup className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
              <h2 className=" font-semibold uppercase dark:text-white text-gray-800">
                Employee
              </h2>
              <p className="text-gray-600 dark:text-white font-bold text-2xl">
                {employeeData?.length}
              </p>
            </div>
            <div className="flex-1 min-w-[200px] bg-white border dark:bg-transparent border-gray-200 rounded-lg shadow-md p-6 text-center">
              <AiOutlineFundProjectionScreen className="w-12 h-12 mx-auto mb-4 text-red-500" />
              <h2 className="text-lg font-semibold uppercase dark:text-white text-gray-800">
                Projects
              </h2>
              <p className="text-gray-600 font-bold text-2xl dark:text-white">
                {allProject.length}
              </p>
            </div>
            <div className="flex-1 min-w-[200px] bg-white dark:bg-transparent border border-gray-200 rounded-lg shadow-md p-6 text-center">
              <GiRecycle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
              <h2
                className="text-lg font-semibold uppercase dark:text-white text-gray-800"
              >
                Ongoing Projects
              </h2>
              <p className="text-gray-600 font-bold text-2xl dark:text-white">
                {inCompletedProjects?.length}
              </p>
            </div>
            <div className="flex-1 min-w-[200px] bg-white dark:bg-transparent border border-gray-200 rounded-lg shadow-md p-6 text-center">
              <IoCheckmarkDoneCircleOutline className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h2 className="text-lg font-semibold uppercase text-gray-800 dark:text-white">
                Completed Projects
              </h2>
              <p className="text-gray-600 font-bold text-2xl dark:text-white">
                {completedProjects?.length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-start mt-4 lg:mt-0">
          <MyEvents />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
