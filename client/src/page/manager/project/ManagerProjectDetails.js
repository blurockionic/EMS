import React, { useEffect, useState } from "react";
import ProjectDetails from "../../../component/project/ProjectDetails";
import axios from "axios";
import { server } from "../../../App";

const ManagerProjectDetails = () => {

  //recieve projectId from localStorage
  const projectId = localStorage.getItem("projectId");

  

  return (
    <div>
      <ProjectDetails projectId={projectId} />
    </div>
  );
};

export default ManagerProjectDetails;
