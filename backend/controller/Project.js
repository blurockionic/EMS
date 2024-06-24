import { Project } from "../model/project.js";
import { Employee } from "../model/employee.js";
import { Teams } from "../model/team_model.js";
import { User } from "../model/user.js";
import { Client } from "../model/clientSchema.js";

// create new project
export const newProject = async (req, res) => {
  //fetch all the data from request body
  // console.log(req.body)
  // const {
  //   projectName,
  //   projectStartDate,
  //   projectEndDate,
  //   priority,
  //   description,
  //   teamId,
  //   websiteUrl,
  //   isCompleted,
  //   isScrap,
  // } = req.body;
  // try {
  //   // valdation
  //   if (
  //     !projectName ||
  //     !projectStartDate ||
  //     !priority ||
  //     !description ||
  //     !teamId
  //     ) {
  //       return res.status(400).jsom({
  //         success: false,
  //         message: "All field are required!",
  //       });
  //     }

  //     // check team id
  //     const foundTeam = await Teams.findById(teamId);

  //     if (!foundTeam) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Team not found!",
  //       });
  //     }

  //     // console.log("team data aa raha",foundTeam);
  //     if (foundTeam.selectedProject) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "multiple proeject cannot be assign to a single team",
  //       });
  //     };
  //     // find all the team emails
  //     let email = [];

  //     for (const employeeId of foundTeam.selectedMembers) {
  //       const foundUserDeatails = await Employee.findById(employeeId);
  //       email.push(foundUserDeatails.employeeEmail);
  //     }

  //     console.log(req.user);

  //     const managerId = foundTeam.selectedManager;

  //     // find the manager email from db
  //     const foundManagerDetails = await User.find({ employeeId: managerId });
  //     let managerEmail = "";

  //     for (const detail of foundManagerDetails) {
  //       managerEmail = detail.email;
  //     }

  //     //again push the email of manager
  //     email.push(managerEmail);

  //     console.log(email);

  //     if (foundTeam.selectedProject) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "multiple proeject cannot be assign to a single team",
  //       });
  //     }

  //     // check designation
  //     const { designationType } = req.user;
  //     if (designationType === "admin") {
  //       // create entry for project
  //       const project = await Project.create({
  //         projectName,
  //         projectStartDate,
  //         projectEndDate,
  //         priority,
  //         description,
  //         managerId,
  //         teamId,
  //         adminId: req.user._id,
  //         websiteUrl,
  //         isCompleted,
  //         isScrap,
  //         emails: email,
  //       });

  //     console.log("create project", project);

  //       // console.log("id",project._id);
  //       foundTeam.selectedProject = project._id;
  //       await foundTeam.save();

  //       // return result

  //       return res.status(200).json({
  //         success: true,
  //         project,
  //         message: "Project Created successfully!",
  //       });
  //       // return res.json({message: "working"})
  //     } else {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Only admin can add the project!",
  //       });
  //     }
  //   }catch (error) {
  //   return res.status(500).json({
  //     success: false,
  //     message: "Please check the above details.",
  //   });
  // }

  try {
    // const {
    //   projectName,
    //   client,
    //   projectDescription,
    //   projectObjectives,
    //   projectScope,
    //   deliverables,
    //   projectType,
    //   projectCategory,
    //   startDate,
    //   endDate,
    //   estimatedBudget,
    //   actualBudget,
    //   paymentTerms,
    //   billingFrequency,
    //   projectManager,
    //   teamMembers,
    //   stakeholders,

    //   phases,
    //   milestones,
    //   toolsAndTechnologies,
    //   requiredResources,
    //   resourceAllocation,
    //   communicationPlan,
    //   meetingSchedule,
    //   documentation,
    //   progressTracking,
    //   KPIs,
    //   statusReports,
    //   timeTracking,
    //   budgetTracking,
    //   qualityStandards,
    //   testCases,
    //   bugTracking,
    //   userAcceptanceTesting,
    //   contractsAndAgreements,
    //   complianceRequirements,
    //   IPManagement,
    //   projectClosureChecklist,
    //   finalDeliverables,
    //   clientApproval,
    //   postProjectReview,
    //   lessonsLearned,
    //   archivingDocumentation,
    //   customFields
    // } = req.body;

    const { client, ...projectData } = req.body;
    // console.log("client data and formdata", client, ...projectData);
    // Check if the client already exists
    let clientRecord = await Client.findOne({
      "contactInformation.email": client.contactInformation.email,
    });

    // If client does not exist, create a new one
    if (!clientRecord) {
      clientRecord = new Client(client);
      await clientRecord.save();
    }

    // Create new project with client ID
    const newProject = new Project({
      ...projectData,
      client: clientRecord._id,
    });

    await newProject.save();

    // Create a new project
    // const newProject = new Project({
    //   projectName,
    //   client,
    //   projectDescription,
    //   projectObjectives,
    //   projectScope,
    //   deliverables,
    //   projectType,
    //   projectCategory,
    //   startDate,
    //   endDate,
    //   estimatedBudget,
    //   actualBudget,
    //   paymentTerms,
    //   billingFrequency,
    //   projectManager,
    //   teamMembers,
    //   stakeholders,

    //   phases,
    //   milestones,
    //   toolsAndTechnologies,
    //   requiredResources,
    //   resourceAllocation,
    //   communicationPlan,
    //   meetingSchedule,
    //   documentation,
    //   progressTracking,
    //   KPIs,
    //   statusReports,
    //   timeTracking,
    //   budgetTracking,
    //   qualityStandards,
    //   testCases,
    //   bugTracking,
    //   userAcceptanceTesting,
    //   contractsAndAgreements,
    //   complianceRequirements,
    //   IPManagement,
    //   projectClosureChecklist,
    //   finalDeliverables,
    //   clientApproval,
    //   postProjectReview,
    //   lessonsLearned,
    //   archivingDocumentation,
    //   customFields
    // });

    // await newProject.save();

    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

// get all project
export const allProject = async (req, res) => {
  try {
    // get all project from the collection
    const allProject = await Project.find({});

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
