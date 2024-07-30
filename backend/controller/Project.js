import { Project } from "../model/project.js";
import { Client } from "../model/clientSchema.js";

// create new project
export const newProject = async (req, res) => {
  try {
    const { client, ...projectData } = req.body; // fetch all the project data from the frontend request

    // Create new client record
    const clientRecord = new Client(client);
    await clientRecord.save();

    // Create new project with client ID
    const newProject = new Project({
      ...projectData, // spread all the properties
      client: clientRecord._id, // Reference the client ID
    });

    await newProject.save(); // save the new project

    // Send success response
    res.status(201).json({ 
      success: true,
      message: "Project created successfully",
      project: newProject,
    }); // send success response
  } catch (error) { // error
    // Handle errors
    res.status(500).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    }); // send the error resposen or catch block respose
  }
};
// get All Projects
export const allProject = async (req, res) => {
  try {
    // get all projects from the collection and populate the client field
    const allProject = await Project.find({}).populate("client");

    if (!allProject) {
      return res.status(400).json({
        success: false,
        message: "Project not created yet!",
      });
    }

    return res.status(200).json({
      success: true,
      allProject,
      message: "All project fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

//update project details
export const updateProject = async (req, res) => {
  //fetch id from parameter
  const { id } = req.params;

  // fetch data from req body
  const {
    projectName,
    projectStartDate,
    projectEndDate,
    managerId,
    priority,
    description,
    websiteUrl,
    isCompleted,
    isScrap,
  } = req.body;

  try {
    // check id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Project should not be null!",
      });
    }

    //check designation
    const { designationType } = req.user;
    if (designationType != "admin") {
      return res.status(400).json({
        success: false,
        message: "Only admin can update the details",
      });
    }

    // check project exist or not
    const isFoundProject = await Project.findById(id);

    if (!isFoundProject) {
      return res.status(500).json({
        success: false,
        message: "Project not found!",
      });
    }

    //assign the new value
    isFoundProject.projectName = projectName;
    isFoundProject.projectStartDate = projectStartDate;
    isFoundProject.projectEndDate = projectEndDate;
    isFoundProject.priority = priority;
    isFoundProject.description = description;
    isFoundProject.websiteUrl = websiteUrl;
    isFoundProject.managerId = managerId;
    isFoundProject.isCompleted = isCompleted;
    isFoundProject.isScrap = isScrap;

    // save the all changes
    const updateProjectDetails = await isFoundProject.save();

    return res.status(200).json({
      success: true,
      updateProjectDetails,
      message: "Project details update successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//delete the project
export const deleteProject = async (req, res) => {
  //fetch id from params
  const { id } = req.params;

  try {
    // check id
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please select the id!",
      });
    }

    // check designationType

    const { designationType } = req.user;

    if (designationType != "admin") {
      return res.status(400).json({
        success: false,
        message: "Only admin can delete the existing project!",
      });
    }

    // delete proejct
    const deletedProject = await Project.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deletedProject,
      message: "Project deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      return: "Please check the selected project",
    });
  }
};

//get all task of specific project // tested
export const specificProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the project by ID and populate the client field
    const specificProject = await Project.findById(id).populate("client");

    if (!specificProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found!",
      });
    }

    return res.status(200).json({
      success: true,
      specificProject,
      message: "Project fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};
