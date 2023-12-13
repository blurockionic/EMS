import React, { useEffect, useState } from "react";
import Card from "../../../component/admin/admin-card/Card";
import axios from "axios";
import { server } from "../../../App";

const Home = () => {
   const [employeeData, setEmployeeData] = useState([])
   const [allProject, setAllProject] = useState([])
   const totalOngoing =[]
   const totalCompleted = []

  useEffect(() => {
    const data = async()=>{

      try {
        const allEmployee = await axios.get(`${server}/employee/all`, {withCredentials: true}); 
        // Handle the data from the API response
        setEmployeeData(allEmployee.data.data)

        const allProject = await axios.get(`${server}/project/all`, {withCredentials:true})

        //set all project into array
        setAllProject(allProject.data.allProject)
      } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error
      }
    }

    //invocke
    data()
  }, []);

  // filter out iscompleted or not 
  const completedProjects = allProject.filter(project => project.isCompleted === true);
  const inCcompletedProjects = allProject.filter(project => project.isCompleted === false);
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
            title="Project"
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={allProject.length}
            bgColor={`bg-green-200`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Ongoing "
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={inCcompletedProjects.length}
            bgColor={`bg-yellow-200`}
          />
        </div>
        <div className="col-span-3">
          <Card
            title="Completed "
            imageUrl="https://placekitten.com/100/100" // Replace with your actual image URL
            number={completedProjects.length}
            bgColor={`bg-blue-200`}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
