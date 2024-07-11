import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";
import profileReducer from "./slices/profileSlice";
import themeReducer from "./slices/themeSlice";
import taskReducer from "./slices/taskSlice";
import projectReducer from "./slices/projectSlice";
import userReducer from "./slices/allUserSlice";
import commentReducer from "./slices/commentSlice"
import tagReducer from "./slices/tagSlice"
import specificProjectReducer from "./slices/specificProjectSlice"
import milestonesReducer from "./slices/milestones/milestoneSlice"
import fetchMilestonesReducer from "./slices/milestones/fetchMilestonesSlice"
import teamReducer from "./slices/teamSlice"
import eventReducer from "./slices/eventSlice"
import socketReducer from "./slices/socketSlice"
const store = configureStore({
  reducer: {
    employee: employeeReducer,
    profile: profileReducer,
    theme: themeReducer, // Add the theme reducer
    tasks: taskReducer, // all task reducer
    project: projectReducer, // all project reducer
    user: userReducer, //all users data
    comments: commentReducer, // add and create comments
    tags: tagReducer,
    specificProject: specificProjectReducer,
    milestones: milestonesReducer,
    fetchMilestones: fetchMilestonesReducer,
    team: teamReducer,
    events: eventReducer,

    socket: socketReducer,
  },
});

export default store;
