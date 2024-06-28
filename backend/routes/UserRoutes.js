import express from "express"
import { allUsers, deleteUserProfile, getMyProfile, login, logout, registration, updateUserDetails,  } from "../controller/User.js"
import { isAuthenticated } from "../middleware/auth.js"
import {upload} from "../middleware/multer.middleware.js"

const router  =  express.Router()


//routes for registration
router.post("/signup",upload.single("profilePicture"), registration)

//routes for login
router.post("/login", login)

//routes for get profile
router.get("/me",isAuthenticated, getMyProfile)

// get all the user data and all profile data 
router.get("/alluser", allUsers)

// upddate user
router.put("/updateUserDetails/:id", updateUserDetails)

// deleting user 
router.delete('/deleteUser/:id', deleteUserProfile);

//route for logout
router.get("/logout", logout)

export default router

