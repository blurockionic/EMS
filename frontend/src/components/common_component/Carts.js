<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useEffect } from "react";
import { MdOutlineDashboard } from "react-icons/md";
>>>>>>> 6f4f080f29800f5424f3156c3c15d71392fc7b4e
import { IoPeopleSharp } from "react-icons/io5";
import { GoProjectRoadmap } from "react-icons/go";
import { SlNote } from "react-icons/sl";
import { TbFileReport } from "react-icons/tb";
import axios from "axios";

const Carts = () => {
<<<<<<< HEAD
  const [employeeData, setEmployeeData] =  useState([])
   const [project, setProject] = useState([])
   const ongoingProject = []
   const comProject = []

   useEffect(()=>{
    
      const empData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/v1/employee/all", { withCredentials: true });


          const projectResponse = await axios.get("http://localhost:4000/api/v1/project/all", { withCredentials: true })
          // Handle the data or update state here
          setEmployeeData(response.data.data)

          //set project details
          setProject(projectResponse.data.allProject)
          // console.log(projectResponse.data.allProject)
         
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle errors here
        }
      };

      

      //invoke empdata fuctions
      empData();

  }, [])

  // console.log(project[0].isCompleted)

  // traverse project 
  for(let i = 0; i < project.length; i++){
      // console.log(project[i])

      //isCompleted : false 
    if(project[i].isCompleted === false){
      ongoingProject.push(project[i])
    }else{
      comProject.push(project[i])
    }
  }

  

  
=======
 
>>>>>>> 6f4f080f29800f5424f3156c3c15d71392fc7b4e
  return (
    <div>
      <div className="flex flex-row justify-evenly">
        {/* Single div for a cart 1st   */}
        <div className="flex flex-col mt-4 ml- bg-slate-700  h-36 w-52 rounded">
          {/* {Menus.map((menu, index) => ( ))} */}
          <div className="flex justify-center text-lg mt-4"> Emplooyees</div>

          <div className="flex justify-center text-3xl mt-3">
            <IoPeopleSharp />
          </div>
          <div className="flex justify-center text-lg mt-2">{employeeData.length}</div>
        </div>
        {/* 2nd cart  */}
        <div className="flex flex-col mt-4 ml-4 bg-[#9f1239] h-36 w-52">
          {/* {Menus.map((menu, index) => ( ))} */}
          <div className="flex justify-center text-lg mt-4"> Projects</div>

          <div className="flex justify-center text-3xl mt-3">
            <GoProjectRoadmap />
          </div>
          <div className="flex justify-center text-lg mt-2">{project.length }</div>
        </div>
        {/* 3rd card div */}
        <div className="flex flex-col mt-4 ml-4 bg-[#0ea5e9]  h-36 w-52">
          {/* {Menus.map((menu, index) => ( ))} */}
          <div className="flex justify-center text-lg mt-4">
            Ongoing Projects
          </div>

          <div className="flex justify-center text-3xl mt-3">
            <SlNote />
          </div>
          <div className="flex justify-center text-lg mt-2">{ongoingProject.length}</div>
        </div>
        {/* 4th card div  */}
        <div className="flex flex-col mt-4 ml-4 bg-[#e11d48]  h-36 w-52">
          <div className="flex justify-center text-lg mt-4">
            Compeleted Project
          </div>

          <div className="flex justify-center text-3xl mt-3">
            <TbFileReport />
          </div>
          <div className="flex justify-center text-lg mt-2">{comProject.length}</div>
        </div>
      </div>
    </div>
  );
};

export default Carts;
