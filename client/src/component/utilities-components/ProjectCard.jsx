import React from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineCalendar } from "react-icons/hi2";
import { GoGoal } from "react-icons/go";

import { LuMilestone } from "react-icons/lu";

import { MdOutlineTaskAlt } from "react-icons/md";

import { SlLocationPin } from "react-icons/sl";

import { GoPerson } from "react-icons/go";

import { GoLinkExternal } from "react-icons/go";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    localStorage.setItem("projectId", project._id);
    navigate(`../projectdetails`);
  };

  const address = project?.client?.contactInformation?.address ?? "N/A";
  const cityCountry = address.split(",").slice(1).join(",");
  return (
    <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-[#161B22] dark:border-[#30363D] dark:text-slate-400 mb-4">
      <div className=" items-center mb-2">
        {/* image of project */}

        <div className="flex flex-row  justify-between">
          <h3 className="flex-wrap text-xl font-bold  mb-1  ">
            {project?.projectName}
          </h3>

          <span className=" " onClick={handleCardClick}>
            <GoLinkExternal className="text-xl font-extrabold " />
          </span>
        </div>
        <p className="text-sm text-gray-500">{project.projectCategory}</p>
      </div>

      <div className="flex flex-col  mb-2">
        <div className="flex flex-ro justify-between mx-2">
          <span className="text-sm text-gray-500">60% complete</span>
          <span className="text-sm text-gray-500 "> 2 days left </span>
        </div>

        <div className="mt-2">
          <div className="flex-1 ml-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <div className="flex flex-row justify-between mt-4 p-2 ">
          <div className="flex flex-row  ">
            {project.teamMembers.map((member, index) => (
              <img
                key={index}
                src="/path/to/avatar.png"
                alt="Team Member"
                className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-800"
              />
            ))}

            <span className="ml-2 text-sm text-gray-500">
              {project.teamMembers.length}
            </span>
          </div>

          <div className=" flex flex-row space-x-4">
            <div className="mb-1 ">
              <div className="font-semibold flex space-x-1">
                <span>
                  <HiOutlineCalendar className="text-xl font-bold " />
                </span>
                <span>Start:</span>
                <span>{new Date(project.startDate).toLocaleDateString()}</span>
              </div>{" "}
            </div>

            <div className="mb-1 ">
              <div className="font-semibold flex space-x-1">
                <span>
                  <GoGoal className="text-xl font-bold " />
                </span>
                <span>End:</span>
                <span> {new Date(project?.endDate).toLocaleDateString()}</span>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <div className="flex flex-row justify-between mt-4 p-2 ">
          <div className="flex flex-row space-x-1 dark:hover:bg-[#21262C] hover:bg-slate-200  p-1.5 rounded cursor-pointer ">
            <span>
              <MdOutlineTaskAlt className="text-xl font-bold " />{" "}
            </span>
            <span className="font-bold "> Task: </span>

            <span className="ml-2 text-sm text-gray-500 font-semibold">41</span>
          </div>

          <div className="flex flex-row space-x-1 dark:hover:bg-[#21262C] hover:bg-slate-200  p-1.5 rounded cursor-pointer ">

            <span>
              <LuMilestone className="text-xl font-bold " />{" "}
            </span>
            <span className="font-bold "> Milestones: </span>

            <span className="ml-2 text-sm text-gray-500 font-semibold">22</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <div className="flex flex-row justify-between mt-4 p-2 ">
          <div className="flex flex-row space-x-1  ">
            <span>
              <GoPerson className="text-xl font-bold " />{" "}
            </span>
            <span className="font-semibold">Client:</span>

            <span className="ml-2 text-sm text-gray-500 font-semibold">
              {project?.client?.name ?? "N/A "}
            </span>
          </div>

          <div className="flex flex-row space-x-1  ">
            <span>
              <SlLocationPin className="text-xl font-bold " />{" "}
            </span>
            <span className="font-semibold ">{cityCountry}</span>

            <span className="ml-2 text-sm text-gray-500 font-semibold"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
