// backend\controller\Task.js
import { Project } from "../model/project.js";
import { Task } from "../model/task.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { Tags } from "../model/tagsSchema.js";
import { User } from "../model/user.js";

// Required Modules
import nodemailer from "nodemailer";
import { Notification } from "../model/NotificationSchema.js"; // importing Notification model

export const task = async (req, res) => {
  // const generateTaskId = async () => {
  //   const lastTask = await Task.findOne().sort({ createdAt: -1 });
  //   let newTaskId = "001"; // Start with "001" if there's no previous user

  //   if (lastTask && lastTask.taskId) {
  //     // Extract the numeric part of the last employee ID
  //     const lastIdNumber = parseInt(lastTask.taskId, 10); // Directly parse the whole ID as a number
  //     const newIdNumber = lastIdNumber + 1; // Increment the number

  //     // Ensure the new ID is a three-digit number
  //     newTaskId = `${newIdNumber.toString().padStart(3, "0")}`;
  //   }

  //   return newTaskId;
  // };
  const generateTaskId = async () => {
    // Get the current date components
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2); // Get last 2 digits of the year
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is 2 digits
    const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure day is 2 digits
  
    // Get the last task created and increment its taskId number
    const lastTask = await Task.findOne().sort({ createdAt: -1 });
    let newTaskNumber = "001"; // Default to "001" if no previous task exists
  
    if (lastTask && lastTask.taskId) {
      // Extract the last 3 digits (numeric part) of the taskId for comparison
      const lastTaskDatePart = lastTask.taskId.split("-")[1];
      const lastTaskNumber = lastTask.taskId.split("-")[2]; // Get the numeric part
  
      // Only increment the number if the date part matches today's date
      if (lastTaskDatePart === `${year}${month}${day}`) {
        const newNumber = parseInt(lastTaskNumber, 10) + 1; // Increment the last number
        newTaskNumber = newNumber.toString().padStart(3, "0"); // Ensure it's 3 digits
      }
    }
  
    // Combine the parts into the desired format T-YYMMDD-XXX
    const newTaskId = `T-${year}${month}${day}-${newTaskNumber}`;
  
    return newTaskId;
  };
  
  try {
    // Destructure required fields from the request body
    const {
      title,
      description,
      taskhashId,
      selectedTags,
      status,
      assignBy,
      assignTo,
      project,
      assignDate,
      dueDate,
    } = req.body;

    // Parse stringified arrays from the request body
    const assignToArray = JSON.parse(assignTo);
    const selectedTagsArray = JSON.parse(selectedTags);

    // Validate that all assignTo values are valid ObjectIds
    if (!assignToArray.every((id) => ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid assignTo values. Each value must be a valid ObjectId.",
      });
    }

    // Validate that all selectedTags values are valid ObjectIds
    if (!selectedTagsArray.every((id) => ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid selectedTags values. Each value must be a valid ObjectId.",
      });
    }

    // Check if the project exists in the database
    const isProjectExist = await Project.findById(project);
    if (!isProjectExist) {
      return res.status(404).json({
        success: false,
        message: "Project not found! Please select another project",
      });
    }

    // Initialize the variable to hold the Cloudinary URL
    let cloudinaryUrl = "";

    // Check if a file was uploaded and process it
    if (req.file) {
      // Upload the file to Cloudinary
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        cloudinaryUrl = uploadResult.url; // Store the uploaded file URL
      } else {
        console.log("File upload to Cloudinary failed");
      }
    } else {
      console.log("No file received");
    }

    const taskId = await generateTaskId();

    // Create a new task using the Task model
    const newTask = await Task.create({
      title,
      description,
      taskhashId,
      tags: selectedTagsArray,
      status,
      assignBy,
      assignTo: assignToArray,
      project,
      assignDate,
      dueDate,
      taskId,
      fileUpload: cloudinaryUrl, // Store the file URL in the task document
    });

    // Fetch the assigned users' details to display their names in the response
    const assignedUsers = await User.find({ _id: { $in: assignToArray } });
    const fullNames = assignedUsers
      .map((user) => `${user.firstName} ${user.lastName}`)
      .join(", ");

    // Send email to assigned users
    await sendEmailNotifications(assignedUsers, newTask);

    // Create in-site notifications for assigned users
    await createInSiteNotifications(assignedUsers, newTask);

    return res.status(201).json({
      success: true,
      task: newTask,
      message: `Task has been assigned to ${fullNames}`,
    });
  } catch (error) {
    console.error("Error creating task:", error); // Log any errors that occur

    // Send an internal server error response if something goes wrong
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const sendEmailNotifications = async (assignedUsers, task) => {
  // Set up the transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: process.env.MAIL_USER, // Your email
      pass: process.env.MAIL_PASS, // Your email password or app-specific password
    },
  });

  // Loop through each user and send an email notification
  for (const user of assignedUsers) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: `New Task Assigned: ${task.title}`,

      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
              <!-- Image at the top of the email -->
              <div style="text-align: center; margin-bottom: 20px;">
                <img 
                  src="${process.env.LOGO_IMAGE}" 
                  loading="lazy" 
                  alt="Company Logo" 
                  style="max-width: 150px; height: auto; display: block; margin: 0 auto;"
                >
              </div>

              <h2 style="color: #4CAF50; text-align: center; margin-top: 20px;">New Task Assignment</h2>
              <p style="font-style: capitalize">Dear, ${user?.firstName} ${
        user?.lastName
      },
              </p>
              <p>We are pleased to inform you that you have been assigned a new task titled <strong>"${
                task.title
              }"</strong>.</p>
              <p><strong>Description:</strong> ${task.description}</p>
              <p><strong>Due Date:</strong> ${new Date(
                task.dueDate
              ).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}</p>
              <p>Please log in to your EMS dashboard to view the task details and manage your progress.</p>
              <p style="margin-top: 20px;">Best regards,<br>BluRock Ionic</p>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
  }
};

// Helper function to create in-site notifications
const createInSiteNotifications = async (assignedUsers, task) => {
  const notifications = assignedUsers.map((user) => ({
    user: user._id, // For each user, get their unique ID
    message: `You have been assigned a new task: ${task.title}`, // Create a message containing the task title
    read: false, // Set the default state of the notification as unread
  }));

  await Notification.insertMany(notifications); // Insert the list of notifications into the database at once
};

export const allTask = async (req, res) => {
  try {
    //validation
    const allTask = await Task.find({})
      .populate({
        path: "tags",
        select: "tagName",
        model: Tags,
      })
      .populate({
        path: "assignTo",
        select: "firstName lastName profilePicture",
        model: User,
      })
      .populate({
        path: "project", // Populate the project field with entire project data
        model: Project,
      })
      .sort({ createdAt: -1 }); // Sort meetings by creation date, newest first

    if (!allTask) {
      return res.status(500).json({
        success: false,
        message: "No record found",
      });
    }

    //get all task
    return res.status(200).json({
      success: true,
      allTask,
      message: "All task fetch successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get employee task // tested
export const taskOfEmployee = async (req, res) => {
  //fetch employee id from params
  const { id } = req.params;
  try {
    //   // check user
    //   const { designationType } = req.user;

    //   if (designationType != "Manager") {
    //     return res.status(400).json({
    //       success: false,
    //       message:
    //         "Only manager can check the task! Please concern deparment to get access.",
    //     });
    //   }

    //validation
    const allTaskOfEmployee = await Task.find({ assignTo: id })
      .populate({
        path: "tags",
        select: "tagName",
        model: Tags,
      })
      .populate({
        path: "assignTo",
        select: "firstName lastName",
        model: User,
      });

    if (!allTaskOfEmployee) {
      return res.status(500).json({
        success: false,
        message: "No record found",
      });
    }

    //get all task
    return res.status(200).json({
      success: true,
      allTaskOfEmployee,
      message: "All task fetch successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//update task //tested
export const updateTask = async (req, res) => {
  // fetch id from params
  const { id } = req.params;
  // fetch all data from req  body
  const { taskTitle, taskDescription, assignTo } = req.body;

  try {
    //VALIDATION
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is invalid or null",
      });
    }

    //find task
    const foundTask = await Task.findById(id);

    if (!foundTask) {
      return res.status(400).json({
        success: false,
        message: "Task is not found!",
      });
    }

    //udate with new value
    foundTask.taskTitle = taskTitle;
    foundTask.taskDescription = taskDescription;
    foundTask.assignTo = assignTo;

    //    save the new value
    const updateTask = await foundTask.save();

    return res.status(200).json({
      success: true,
      updateTask,
      message: "task updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//delete task ////tested
export const deleteTask = async (req, res) => {
  // fetch id from req params
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "task id is invalid or null!",
      });
    }

    // check user
    const { designationType } = req.user;
    if (designationType != "Manager") {
      return res.status(400).json({
        success: false,
        message: "Only manager can delete the task!",
      });
    }

    //delete task from db
    const deleteTask = await Task.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deleteTask,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the delete code above",
    });
  }
};

//get all task of specific task // tested
export const specificProjectTask = async (req, res) => {
  // Fetch project id from params
  const { id } = req.params;
  try {
    // Validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: Project ID is required",
      });
    }

    // Fetch tasks filtered by project ID

    const specificProjectTasks = await Task.find({ project: id }).populate({
      path: "tags",
      select: "tagName",
      model: Tags,
    });

    if (!specificProjectTasks || specificProjectTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks available for this project",
      });
    }

    return res.status(200).json({
      success: true,
      tasks: specificProjectTasks,
      message: "Tasks fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const closeTask = async (req, res) => {
  // fetch id from params
  const { id } = req.params;
  // fetch all data from req  body
  try {
    //VALIDATION
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is invalid or null",
      });
    }

    //find task
    const foundTask = await Task.findById(id);

    if (!foundTask) {
      return res.status(400).json({
        success: false,
        message: "Task is not found!",
      });
    }

    //udate with new value
    foundTask.status = "Close";

    //    save the new value
    const closeTask = await foundTask.save();

    return res.status(200).json({
      success: true,
      closeTask,
      message: "task closed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export const reopenTask = async (req, res) => {
  // fetch id from params
  const { id } = req.params;
  // fetch all data from req  body
  try {
    //VALIDATION
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is invalid or null",
      });
    }

    //find task
    const foundTask = await Task.findById(id);

    if (!foundTask) {
      return res.status(400).json({
        success: false,
        message: "Task is not found!",
      });
    }

    //udate with new value
    foundTask.status = "Open";

    //    save the new value
    const closeTask = await foundTask.save();

    return res.status(200).json({
      success: true,
      closeTask,
      message: "task closed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const putTaskOnHold = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID and update its status to "on hold"
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: "On Hold" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated to On Hold",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task status", error });
  }
};

// Controller to submit a task for review
export const submitTaskForReview = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID and update its status to "in review"
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: "In Review" },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated to In Review",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task status", error });
  }
};
