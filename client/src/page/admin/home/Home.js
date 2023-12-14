import React, { useEffect, useState } from "react";
import Card from "../../../component/admin/admin-card/Card";
import axios from "axios";
import { server } from "../../../App";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Home = () => {
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
    const data = async () => {
      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {
          withCredentials: true,
        });
        // Handle the data from the API response
        setEmployeeData(allEmployee.data.data);

        const allProject = await axios.get(`${server}/project/all`, {
          withCredentials: true,
        });

        //set all project into array
        setAllProject(allProject.data.allProject);
        console.log(allProject.data.allProject)
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    };

    //invocke
    data();
  }, []);

  // filter out iscompleted or not
  const completedProjects = allProject.filter(
    (project) => project.isCompleted === true
  );
  const inCcompletedProjects = allProject.filter(
    (project) => project.isCompleted === false
  );
  // console.log(completedProjects.length)

  return (
    <>
      {/* card  */}
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Card
            title="Employee"
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={employeeData.length}
            bgColor={`bg-red-300`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Project"
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={allProject.length}
            bgColor={`bg-green-300`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Ongoing "
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={inCcompletedProjects.length}
            bgColor={`bg-yellow-300`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Completed "
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={completedProjects.length}
            bgColor={`bg-blue-300`}
          />
        </div>
      </div>
      {/* card end  */}

      <div className="w-full mt-5">
         <div className="mb-5"><span className="ml-10 text-md  font-bold">Project Status</span></div>
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
       
      </div>
    </>
  );
};

export default Home;
