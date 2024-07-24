import { Employee } from "../model/employee.js";
import { Project } from "../model/project.js";
import { Task } from "../model/task.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import { Tags } from "../model/tagsSchema.js";
import { User } from "../model/user.js";

export const task = async (req, res) => {
  console.log("Inside the /newTask route");
  console.log(req.file);
  console.log(req.body);

  try {
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

    const assignToArray = JSON.parse(assignTo);
    const selectedTagsArray = JSON.parse(selectedTags);

    // Validate ObjectIds
    if (!assignToArray.every((id) => ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid assignTo values. Each value must be a valid ObjectId.",
      });
    }

    if (!selectedTagsArray.every((id) => ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid selectedTags values. Each value must be a valid ObjectId.",
      });
    }

    const isProjectExist = await Project.findById(project);
    if (!isProjectExist) {
      return res.status(404).json({
        success: false,
        message: "Project not found! Please select another project",
      });
    }

    let cloudinaryUrl = null;
    if (req.file) {
      const result = await uploadOnCloudinary(req.file.path);
      if (result) {
        cloudinaryUrl = result.secure_url;
        console.log("Cloudinary URL:", cloudinaryUrl);
      }
    }

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
      fileUpload: cloudinaryUrl,
    });

    const assignedUsers = await User.find({ _id: { $in: assignToArray } });
    const fullNames = assignedUsers
      .map((user) => `${user.firstName} ${user.lastName}`)
      .join(", ");

    return res.status(201).json({
      success: true,
      task: newTask,
      message: `Task has been assigned to ${fullNames}`,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
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
        select: "firstName lastName",
        model: User,
      });

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
    const allTaskOfEmployee = await Task.find({ assignTo: id });

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
    console.log("working");
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
