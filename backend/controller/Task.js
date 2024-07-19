import { Employee } from "../model/employee.js";
import { Project } from "../model/project.js";
import { Task } from "../model/task.js";
import { Tags } from "../model/tagsSchema.js";
import { User } from "../model/user.js"; // Example User schema import

export const task = async (req, res) => {
  try {
    const allTask = await Task.find({});
    // Function to generate new task ID
    // function generateNewTaskId() {

    //   let maxTaskId = allTask.reduce(
    //     (max, task) => Math.max(max, task.task_id),
    //     0
    //   );

    //   // Increment the maximum taskId by 1 to generate the new taskId
    //   let newTaskId = maxTaskId + 1;

    //   return newTaskId;
    // }

    // // Example usage:
    // let newTaskId = generateNewTaskId();
    // console.log("New Task ID:", newTaskId);

    const {
      title,
      description,
      taskhashId,
      tags,
      status,
      assignBy,
      assignTo,
      project,
      assignDate,
      dueDate,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !tags ||
      !status ||
      !assignBy ||
      !assignTo ||
      !project ||
      !assignDate ||
      !dueDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the employee (assignTo) exists
    const isEmployeeExist = await User.findById(assignTo);
    if (!isEmployeeExist) {
      return res.status(404).json({
        success: false,
        message: "Employee not found! Please select another employee",
      });
    }

    // Check if the project exists
    const isProjectExist = await Project.findById(project);
    if (!isProjectExist) {
      return res.status(404).json({
        success: false,
        message: "Project not found! Please select another project",
      });
    }

    // Create entry in the database
    const newTask = await Task.create({
      title,
      description,
      taskhashId,
      tags,
      status,
      assignBy,
      assignTo,
      project,
      assignDate,
      dueDate,
    });
    const assignId = assignTo;
    const idName = await User.findById(assignId);
    console.log(idName);

    const fullName = idName.firstName + " " + idName.lastName;
    // Return success response
    console.log(fullName);
    return res.status(201).json({
      success: true,
      task: newTask,
      message: `Task has been assign to ${fullName}`,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error in backend",
    });
  }
};

export const allTask = async (req, res) => {
  try {
    //validation
    const allTask = await Task.find({}).populate({
      path: "tags",
      select: "tagName",
      model: Tags,
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
  // fetch project id from params
  const { id } = req.params;
  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    //check user

    //all task filtered by id
    const specificProjectTask = await Task.find({ taskOf: id });

    if (!specificProjectTask) {
      return res.status(400).json({
        success: false,
        message: "No task Available!",
      });
    }

    return res.status(200).json({
      success: true,
      specificProjectTask,
      message: "All task fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
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
