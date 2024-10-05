import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
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
import toDoReducer from "./slices/toDoSlice";
import meetingReducer from "./slices/meetingSlice"
import notificationReducer from "./slices/notificationSlice"; // Import the notification slice
import actionItemReducer from "./slices/actionItemSlice"

import chatReducer from "./slices/chatSlice"; // Add the chat reducer
const store = configureStore({
  reducer: {
    actionItem: actionItemReducer,
    auth: authReducer,
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
    // socket: socketReducer,
    chat: chatReducer, // add and create chat
    toDo: toDoReducer,
    meetings: meetingReducer,

    notifications: notificationReducer, // Add notifications reducer
    // Other reducers can be added here

  },
});

export default store;
