import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../../App";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { fetchTasks } from "../../../Redux/slices/taskSlice";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";

const NewTask = () => {
  const dispatch = useDispatch();

  // Fetching projects
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

  // Fetching profile
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);

  //  fetching all users

  const { data: users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // console.log(users);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    status: "Open",
    assignBy: "",
    assignTo: "",
    project: "",
    assignDate: "",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);

    try {
      const {
        title,
        description,
        tags,

        status,
        assignBy,
        assignTo,
        project,
        assignDate,
        dueDate,
      } = formData;

      const response = await axios.post(
        `${server}/task/new`,

        {
          title,
          description,
          tags,

          status,
          assignBy,
          assignTo,
          project,
          assignDate,
          dueDate,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("response ", response);
      // const { success, message } = response.data;
    } catch (error) {
      console.log("Unable to process:", error); // Logs any error that occurs during the request
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow-md"
    >
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Task Title:</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-input mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter task title"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Description:</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-input mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter task description"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Tags:</span>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="form-input mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter tags separated by commas"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Assign By:</span>
        <select
          name="assignBy"
          value={formData.assignBy}
          onChange={handleChange}
          className="form-select mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="" disabled>
            Select an assigner
          </option>

          <option key={profile._Id} value={`${profile._id}`}>
            {`${profile.firstName} ${profile.lastName}`}
          </option>
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Assign To:</span>
        <select
          name="assignTo"
          value={formData.assignTo}
          onChange={handleChange}
          className="form-select mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="" disabled>
            Assign to
          </option>
          {users
            ?.filter((employee) => employee?.role === "employee")
            .map((employee) => (
              <option key={employee._id} value={`${employee._id}`}>
                {`${employee.firstName} ${employee.lastName}`}
              </option>
            ))}
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Project:</span>
        <select
          name="project"
          value={formData.project}
          onChange={handleChange}
          className="form-select mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
        >
          <option value="" disabled>
            Select a project
          </option>
          {allProject.map((project) => (
            <option key={project._id} value={project._id}>
              {project.projectName}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">Assign Date:</span>
        <input
          type="date"
          name="assignDate"
          value={formData.assignDate}
          onChange={handleChange}
          className="form-input mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
        />
      </label>
      <label className="block mb-4">
        <span className="text-gray-700 dark:text-gray-300">
          Submission Date:
        </span>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-input mt-1 block w-full border dark:bg-gray-700 dark:text-gray-300"
        />
      </label>
      <div className="flex items-center justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewTask;
