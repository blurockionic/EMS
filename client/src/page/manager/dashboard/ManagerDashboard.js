import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../../App';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../../component/admin/admin-card/Card';

const ManagerDashboard = () => {
    const [employeeData, setEmployeeData] = useState([]);
  const [allTask, setAllTask] = useState([]);

 


  

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
        const projectData = await axios.get(`${server}/task/all`, {
          withCredentials: true,
        });
        setAllTask(projectData.data.allTask);
        // console.log(projectData)
      } catch (error) {
        console.error("Error fetching project data:", error.message);
        alert(error.response.data.message)
      }
    };
  
    fetchData();
  }, []);

  
  


  

  // // filter out iscompleted or not
  const completedTask = allTask.filter(
    (task) => task.isTaskCompleted === true
  );
  const inCcompletedtask = allTask.filter(
    (task) => task.isTaskCompleted === false
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
          bgColor={`bg-red-200`}
        />
      </div>
      <div className="col-span-3">
        <Card
          title="task"
          imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
          number={allTask.length}
          bgColor={`bg-green-200`}
        />
      </div>
      <div className="col-span-3">
        <Card
          title="Completed"
          imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
          number={completedTask.length}
          bgColor={`bg-yellow-200`}
        />
      </div>
      <div className="col-span-3">
        <Card
          title="Incompleted "
          imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
          number={inCcompletedtask.length}
          bgColor={`bg-blue-200`}
        />
      </div>
    </div>
    {/* card end  */}

    {/* <div className="w-full mt-5">
       <div className="mb-5"><span className="ml-10 text-md  font-bold">Project Status</span></div>
        
     
    </div> */}
  </>
  )
}

export default ManagerDashboard