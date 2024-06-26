import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../../Redux/slices/specificProjectSlice";
import { fetchProjects } from "../../Redux/slices/projectSlice";
import { createMilestone } from "../../Redux/slices/milestones/milestoneSlice";

const CreateMilestone = () => {
  let { projectId } = useParams();

  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.project);
  const { specificProject, status, error } = useSelector(
    (state) => state.specificProject
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

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

  const [selectedProject, setSelectedProject] = useState(
    specificProject ? specificProject._id : ""
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId);
  };


  const handleCreateMilestone = async () => {
    const milestoneData = { title, description, projectId, dueDate };
    try {
      const response = await dispatch(createMilestone(milestoneData)).unwrap();
      console.log('Milestone created successfully:', response);

      setTitle('');
      setDescription('');
      setDueDate('');
      setSelectedProject('');
      

    } catch (rejectedValueOrSerializedError) {
      console.log('Failed to create milestone:', rejectedValueOrSerializedError);
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-4">
      <div className="border-b dark:border-[#30363D] pb-2">
        <h2 className="font-semibold text-3xl">New Milestone</h2>
        <div>
          <p className="text-gray-800 dark:text-gray-300">
            Create a new milestone for your project to help organize and track
            its progress.
          </p>
        </div>
      </div>

      {/* Left Section */}
      <div className="w-full flex flex-row space-x-12 border-b pb-6 dark:border-[#30363D] ">
        <div className="w-[70%] mt-4">
          {/* Title Input */}
          <div className="mt-4">
            <h2 className="font-semibold">Title</h2>
            <input
              type="text"
              className="w-full px-3 py-1.5 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400 focus:border-blue-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description Input */}
          <div className="mt-4">
            <h2 className="font-semibold">Description</h2>
            <textarea
              className="w-full px-3 py-1 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400 focus:border-blue-600"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[30%] mt-4">
          <div className="mt-4">
            <h2 className="font-semibold">Project</h2>
            <select
              className="w-full px-3 py-1 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400 focus:border-blue-600"
              value={selectedProject}
              onChange={(e) => handleProjectChange(e.target.value)}
            >
              {specificProject ? (
                <option value={specificProject._id}>
                  {specificProject.projectName}
                </option>
              ) : (
                <>
                  <option value="">Select a project</option>
                  {allProject?.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* Due Date Input */}
          <div className="mt-4">
            <h2 className="font-semibold">Due Date</h2>
            <input
              type="date"
              className="w-full px-3 py-1 pl-2 border dark:border-[#30363D] text-lg font-normal rounded dark:bg-[#161B22] dark:text-slate-400 focus:border-blue-600"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="flex justify-end mt-12">
        <button
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-4 rounded"
          onClick={handleCreateMilestone}
        >
          Create milestone
        </button>
   
      </div>
    </div>
  );
};

export default CreateMilestone;
