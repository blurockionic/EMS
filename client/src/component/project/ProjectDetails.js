import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '../../App';

const ProjectDetails = ({projectId}) => {

    const [project, setProject]= useState({})


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(
              `${server}/project/specific/${projectId}`,
              { withCredentials: true }
            );
      
            setProject(response.data.specificProject);
            const { success} = response.data;
      
            if (success) {
            //   alert(message);
            }
          } catch (error) {
            // Handle errors, e.g., alert(error.response.data.message);
          }
        };
      
        // Invoke the fetchData function immediately
        fetchData();
      }, [projectId]); // Add projectId as a dependency
      
    
    console.log(project)
  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4">{project.projectName}</h2>

    <div className="mb-4">
      <p className="text-gray-600">Description: {project.description}</p>
    </div>

    <div className="mb-4">
      <p className="text-gray-600">Priority: {project.priority}</p>
    </div>

    <div className="mb-4">
      <p className="text-gray-600">Start Date: {project.projectStartDate}</p>
      <p className="text-gray-600">End Date: {project.projectEndDate}</p>
    </div>

    <div className="mb-4">
      <p className="text-gray-600">Completed Percent: {project.completedPercent}%</p>
    </div>

    <div className="mb-4">
      <p className="text-gray-600">Status: {project.isCompleted ? 'Completed' : 'In Progress'}</p>
    </div>
  </div>
  )
}

export default ProjectDetails