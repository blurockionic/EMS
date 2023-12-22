import { Project } from "../model/project.js";
import { Employee } from "../model/employee.js";

// create new project
export const newProject = async (req, res) => {
  //fetch all the data from request body
  const {
    projectName,
    projectStartDate,
    projectEndDate,
    priority,
    description,
    managerId,
    websiteUrl,
    isCompleted,
    isScrap,
  } = req.body;
  try {
    // valdation
    if (
      !projectName ||
      !projectStartDate ||
      !priority ||
      !description ||
      !managerId
    ) {
      return res.status(400).jsom({
        success: false,
        message: "Al field are required!",
      });
    }

    // check manager id
    const foundMnager = await Employee.findById(managerId);

    if (!foundMnager) {
      return res.status(400).json({
        success: false,
        message: "Manager not found!",
      });
    }

    // check designation
    const { designationType } = req.user;
    if (designationType === "admin") {
      // create entry for project
      const project = await Project.create({
        projectName,
        projectStartDate,
        projectEndDate,
        priority,
        description,
        managerId: foundMnager._id,
        adminId: req.user._id,
        websiteUrl,
        isCompleted,
        isScrap,
      });

      // return result

      return res.status(200).json({
        success: true,
        project,
        message: "Project Created successfully!",
      });
      // return res.json({message: "working"})
    } else {
      return res.status(400).json({
        success: false,
        message: "Only admin can add the project!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the above details.",
    });
  }
};

// get all project
export const allProject = async (req, res) => {
  try {
   

      // get all project from the collection
      const allProject = await Project.find({})

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
    const {designationType} = req.user
    if(designationType != "admin"){
      return res.status(400).json({
        success: false,
        message: "Only admin can update the details"
      })
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

    const {designationType} = req.user

    if(designationType != "admin"){
      return res.status(400).json({
        success: false,
        message: "Only admin can delete the existing project!"
      })
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
    const specificProject = await Project.findById(id);

    if (!specificProject) {
      return res.status(400).json({
        success: false,
        message: "No task Available!",
      });
    }

    return res.status(200).json({
      success: true,
      specificProject,
      message: "All task fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
