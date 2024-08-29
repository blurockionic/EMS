import React, { useEffect } from "react"; // Import React and hooks
import { HiUserGroup } from "react-icons/hi"; // Import icon for users
import { AiOutlineFundProjectionScreen } from "react-icons/ai"; // Import icon for projects
import { GiRecycle } from "react-icons/gi"; // Import icon for ongoing projects
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5"; // Import icon for completed projects
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux
import { fetchProjects } from "../../Redux/slices/projectSlice"; // Action to fetch projects
import { fetchProfile } from "../../Redux/slices/profileSlice"; // Action to fetch profile
import { fetchUsers } from "../../Redux/slices/allUserSlice"; // Action to fetch users
import { fetchTasks } from "../../Redux/slices/taskSlice"; // Action to fetch tasks
import Loader from "./Loader"; // Import Loader component

const Card = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Selector to get users data from Redux store
  const { data: users } = useSelector((state) => state.user);

  // Selector to get tasks data from Redux store
  // const { tasks } = useSelector((state) => state.tasks);

  // Selector to get project data, status, and error from Redux store
  const { allProject, status: projectStatus} = useSelector((state) => state.project);

  // Selector to get profile data from Redux store
  const profile = useSelector((state) => state.profile.data);

  // Filter tasks based on completion status
  // const completedTask = tasks.filter((task) => task.isTaskCompleted);
  // const inCompletedTask = tasks.filter((task) => !task.isTaskCompleted);

  // Filter projects based on completion status
  const completedProjects = allProject.filter((project) => project.isCompleted);
  const inCompletedProjects = allProject.filter((project) => !project.isCompleted);

  // Fetch data when component mounts
  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users
    dispatch(fetchProjects()); // Fetch projects
    dispatch(fetchProfile()); // Fetch profile
    dispatch(fetchTasks()); // Fetch tasks
  }, [dispatch]); // Dependency array ensures this runs only when dispatch changes

  return (
    <>
      {/* Conditional rendering based on user's role */}
      {profile.role === 'manager' || profile.role === 'admin' ? (
        // Show loader if project status is loading
        projectStatus === "loading" ? (
          <Loader /> // fix the issue related to loader positioning
        ) : (
          // Display the card information when not loading
          <div>
            <div className="flex flex-wrap justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              {/* Card for number of employees */}
              <div className="flex-1 min-w-[200px] dark:bg-transparent bg-white border border-gray-200 rounded-lg shadow-md p-6 text-center">
                <HiUserGroup className="w-12 h-12 mx-auto mb-4 text-indigo-500" />
                <h2 className="font-semibold uppercase dark:text-white text-gray-800">Employee</h2>
                <p className="text-gray-600 dark:text-white font-bold text-2xl">{users?.length}</p>
              </div>
              {/* Card for number of projects */}
              <div className="flex-1 min-w-[200px] bg-white border dark:bg-transparent border-gray-200 rounded-lg shadow-md p-6 text-center">
                <AiOutlineFundProjectionScreen className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h2 className="text-lg font-semibold uppercase dark:text-white text-gray-800">Projects</h2>
                <p className="text-gray-600 font-bold text-2xl dark:text-white">{allProject.length}</p>
              </div>
              {/* Card for ongoing projects */}
              <div className="flex-1 min-w-[200px] bg-white dark:bg-transparent border border-gray-200 rounded-lg shadow-md p-6 text-center">
                <GiRecycle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <h2 className="text-lg font-semibold uppercase dark:text-white text-gray-800">Ongoing Projects</h2>
                <p className="text-gray-600 font-bold text-2xl dark:text-white">{inCompletedProjects?.length}</p>
              </div>
              {/* Card for completed projects */}
              <div className="flex-1 min-w-[200px] bg-white dark:bg-transparent border border-gray-200 rounded-lg shadow-md p-6 text-center">
                <IoCheckmarkDoneCircleOutline className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h2 className="text-lg font-semibold uppercase text-gray-800 dark:text-white">Completed Projects</h2>
                <p className="text-gray-600 font-bold text-2xl dark:text-white">{completedProjects?.length}</p>
              </div>
            </div>
          </div>
        )
      ) : null} {/* Render nothing if the user's role is not 'manager' or 'admin' */}
    </>
  );
};

export default Card;
