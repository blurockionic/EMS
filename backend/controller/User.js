import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utilities/features.js";

// register
export const registration = async (req, res) => {
  const generateEmployeeId = async () => {
    const lastUser = await User.findOne().sort({ createdAt: -1 });
    let newEmployeeId = "EMP001";

    if (lastUser && lastUser.employeeId) {
      const lastIdNumber = parseInt(lastUser.employeeId.replace("EMP", ""), 10);
      const newIdNumber = lastIdNumber + 1;
      newEmployeeId = `EMP${newIdNumber.toString().padStart(3, "0")}`;
    }

    return newEmployeeId;
  };

  const {
    firstName,
    lastName,
    gender,
    email,
    password,
    department,
    role,
    position,
    currentAddress,
    permanentAddress,
    bio,
    nationality,
    dateOfBirth,
    phoneNumber,
    onboardingDate,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(`User with email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employeeId = await generateEmployeeId();

    const user = new User({
      firstName,
      lastName,
      gender,
      email,
      password: hashedPassword,
      department,
      role,
      position,
      currentAddress,
      permanentAddress,
      bio,
      nationality,
      dateOfBirth,
      phoneNumber,
      employeeId,
      onboardingDate,
    });

    const savedUser = await user.save();
    sendCookie(user, res, `Account created successfully!`, 201);

    console.log(`User registered successfully: ${savedUser}`);
  } catch (err) {
    console.error(`Error registering user: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//login
export const login = async (req, res) => {
  // fetch all the data from request body
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist! Please Register!",
      });
    }

    // check email exist ot not

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email does not exist! Please Register!",
      });
    }

    // console.log(user)
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("working")

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Please enter correct password!",
      });
    }

    // Generate a JSON Web Token (JWT)
    sendCookie(
      user,
      res,
      `welcome back ${user.firstName} ${user.lastName} `,
      200
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//handle for get user details
export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "details is fetched",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//handle for logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "logout successfully!",
        user: null,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Function to get all user details
export const allUsers = async (req, res) => {
  try {
    // // Get all employee details
    // const data = await User.find({});

    // Get all users
    const data = await User.find(
      {},
      "firstName lastName email department role"
    );

    // Validation
    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No record found!",
      });
    }

    // Return the result
    return res.status(200).json({
      success: true,
      data,
      message: "All records fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//update details
export const updateUserDetails = async (req, res) => {
  //fetch id from params

  const { id } = req.params;

  //fetch all the details from
  const {
    firstName,
    lastName,
    password,
    department,
    role,
    position,
    currentAddress,
    permanentAddress,
    bio,
    phoneNumber,
  } = req.body;
  try {
    // update the employee details
    const foundEmployee = await User.findById(id);

    if (!foundEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee details not found. Please register!",
      });
    }

    foundEmployee.phoneNumber = phoneNumber;
    foundEmployee.currentAddress = currentAddress;
    foundEmployee.firstName = firstName;
    foundEmployee.lastName = lastName;
    foundEmployee.password = password;
    foundEmployee.role = role;
    foundEmployee.position = position;
    foundEmployee.permanentAddress = permanentAddress;
    foundEmployee.bio = bio;
    foundEmployee.department = department;

    //save updated data
    const updateEmployeDetails = User.save();

    // return the result
    return res.status(200).json({
      data: updateEmployeDetails,
      success: true,
      message: "Detail updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check your request!",
    });
  }
};

//delete employee
export const deleteUserProfile = async (req, res) => {
  const { id } = req.params;
  // console.log( "delete handeler id ", id);
  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee not found!",
      });
    }

    // Find the user by ID and delete
    const deletedEmployee = await User.findByIdAndDelete(id);

    // Check if user was found and deleted
    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      deletedEmployee,
      message: "Employee details deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
