import React, { useEffect, useState } from "react";
import Header from "../../../component/utilities-components/Header";
import SideNavbar from "../../../component/admin/SideNavbar";
import { Outlet } from "react-router-dom";
import Card from "../../../component/admin/admin-card/Card";
import { HiMiniUserGroup } from "react-icons/hi2";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { GiRecycle } from "react-icons/gi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import { server } from "../../../App";

const AdminDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [allProject, setAllProject] = useState([]);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
  }, [setEmployeeData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });
        setAllProject(projectData.data.allProject);
        console.log(projectData);
      } catch (error) {
        console.error("Error fetching project data:", error.message);
        alert(error.message);
      }
    };

    fetchData();
  }, [setAllProject]);

  // filter out iscompleted or not
  const completedProjects = allProject.filter(
    (project) => project.isCompleted === true
  );
  const inCcompletedProjects = allProject.filter(
    (project) => project.isCompleted === false
  );
  return (
    <>
      {/* card  */}
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <div className={`flex items-center justify-center  mt-5 `}>
            <div
              className={` rounded-lg shadow-md p-6 text-center w-52 bg-indigo-200 `}
            >
              <h2 className="text-md font-semibold  uppercase">Employee</h2>
              <HiMiniUserGroup className="rounded-full w-16 h-16 mx-auto mb-4 text-gray-900 " />
              <p className="text-gray-700  font-bold text-3xl">
                {employeeData.length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center justify-center mt-5">
            <div
              className={`rounded-lg shadow-md p-6 text-center w-52 bg-red-50 `}
            >
              <h2 className="text-md font-semibold  uppercase text-indigo-900">Project</h2>
              <AiOutlineFundProjectionScreen className="rounded-full w-16 h-16 mx-auto mb-4 text-red-900 " />
              <p className="text-red-900  font-bold text-3xl">
                {allProject.length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="flex items-center justify-center mt-5">
            <div
              className={`rounded-lg shadow-md p-6 text-center w-52 bg-yellow-200 `}
            >
              <h2 className="text-md font-semibold  uppercase">Ongoing Project</h2>
              <GiRecycle className="rounded-full w-16 h-16 mx-auto mb-4 text-yellow-900 " />
              <p className="text-yellow-900  font-bold text-3xl">
                {inCcompletedProjects.length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-3">
            <div className="flex items-center justify-center mt-5">
            <div
              className={`rounded-lg shadow-md p-6 text-center w-52 bg-green-200 `}
            >
              <h2 className="text-md font-semibold  uppercase">Completed Project</h2>
              <IoCheckmarkDoneCircleOutline className="rounded-full w-16 h-16 mx-auto mb-4 text-green-700" />
              <p className="text-green-700  font-bold text-3xl">
                {completedProjects.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* card end  */}

      {/* <div className="w-full mt-5">
        <div className="mb-5">
          <span className="ml-10 text-md  font-bold">Project Status</span>
        </div>
        <LineChart
          width={1250}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </div> */}
    </>
  );
};

export default AdminDashboard;
