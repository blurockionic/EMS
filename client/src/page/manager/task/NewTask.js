import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../../Redux/slices/projectSlice";
import { fetchProfile } from "../../../Redux/slices/profileSlice";
import { fetchUsers } from "../../../Redux/slices/allUserSlice";
import { fetchTags } from "../../../Redux/slices/tagSlice";
import { submitNewTask } from "../../../Redux/slices/taskSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const projectState = useSelector((state) => state.project);

  const { allProject, status: projectStatus, error: projectError } = projectState;
  const { data: users, status } = useSelector((state) => state.user);
  const { tags } = useSelector((state) => state.tags);
  const profile = useSelector((state) => state.profile.data);
  const profileStatus = useSelector((state) => state.profile.status);


  useEffect(() => {
    if (projectStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectStatus, dispatch]);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile());
    }
  }, [profileStatus, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const initialFormData = {
    title: "",
    description: "",
    tags: [],
    status: "Open",
    assignBy: "",
    assignTo: "",
    project: "",
    assignDate: "",
    dueDate: "",
    fileUploader: null, // Added to handle file upload
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      fileUploader,
    } = formData;

    console.log("let see formData", formData);
    if (fileUploader) {
      console.log("File Path:", fileUploader);
    }
    // Creating FormData to handle file uploads
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('tags', tags);
    data.append('status', status);
    data.append('assignBy', assignBy);
    data.append('assignTo', assignTo);
    data.append('project', project);
    data.append('assignDate', assignDate);
    data.append('dueDate', dueDate);
    if (fileUploader) {
      data.append('fileUploader', fileUploader); // Appending file if present
      
    }

    try {
      const response = await axios.post(
        `${server}/task/new`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log("checking response", response);

      const { success, message } = response.data;
      if (success) {
        alert(message);
        setFormData(initialFormData);
      }

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-[100%] dark:bg-gray-800 rounded shadow-md flex items-center justify-center "
    >
      <div className="mainContainer border-2 flex flex-col md:flex-row rounded shadow-md w-4/5 mx-auto">
        <div className="left md:w-2/3 flex flex-col m-2 p-2 border border-gray-300 rounded shadow-md">
          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Task Title:
              </span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
                placeholder="Enter task title"
              />
            </label>
          </div>

          <div className="w-full rounded-lg flex-grow">
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Description:
              </span>
              <textarea
                name="description"
                rows="17"
                value={formData.description}
                onChange={handleChange}
                className="form-input mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
                placeholder="Enter task description"
              />
            </label>
          </div>
        </div>

       
        <div className="right  md:w-1/3 h-full flex flex-col gap-4  m-2 p-2 border border-gray-300 rounded shadow-md">
          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Tags:
              </span>
              <select
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="form-select mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
                placeholder="Enter tags separated by commas"
              >
                <option value="" disabled hidden>
                  {tags.length === 0 ? "No tags found." : "Select a tag"}
                </option>
                {tags.map((tag, index) => (
                  <option key={index} value={tag._id}>
                    {tag.tagName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Assign By:
              </span>
              <select
                name="assignBy"
                value={formData.assignBy}
                onChange={handleChange}
                className="form-select mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
              >
                <option value="" disabled>
                  Select an assigner
                </option>
                <option key={profile._id} value={profile._id}>
                  {`${profile.firstName} ${profile.lastName}`}
                </option>
              </select>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Assign To:
              </span>
              <select
                name="assignTo"
                value={formData.assignTo}
                onChange={handleChange}
                className="form-select mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
              >
                <option value="" disabled>
                  Assign to
                </option>
                {users
                  ?.filter((employee) => employee?.role === "employee")
                  .map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {`${employee.firstName} ${employee.lastName}`}
                    </option>
                  ))}
              </select>
            </label>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Project:
              </span>
              <select
                name="project"
                value={formData.project}
                onChange={handleChange}
                className="form-select mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
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
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Assign Date:
              </span>
              <input
                type="date"
                name="assignDate"
                value={formData.assignDate}
                onChange={handleChange}
                className="form-input mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
              />
            </label>
          </div>

          <div>
            <label className="block mb-2">
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                Submission Date:
              </span>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-input mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
              />
            </label>
          </div>


            <div>
              <label className="block mb-2">
                <span className="text-gray-700 dark:text-gray-300 font-semibold">Submission Date:</span>
                <input
                  type="file"
                  name="fileUploader"
                  
                  onChange={handleChange}
                  className="form-input mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded"
                />
              </label>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>

          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    </form>
  );
};

export default NewTask;
