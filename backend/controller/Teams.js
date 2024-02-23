import { Project } from "../model/project.js";
import { Teams } from "../model/team_model.js";

// controller for creating New Team
export const teamDetail = async (req, res) => {
  try {
    const {
      teamName,
      teamDescription,
      selectedMembers,
      adminProfile,
      selectedManager,
      selectedProject,
    } = req.body;

    if (!teamName) {
      return res.status(404).json({
        success: false,
        message: "Team Name is  mandatory for Creating team ",
      });
    }

    const createdTeam = await Teams.create({
      teamName,
      teamDescription,
      adminProfile,
      selectedMembers,
      selectedManager: selectedManager === "" ? null : selectedManager,
      selectedProject: selectedProject === "" ? null : selectedProject,
    });

    return res.status(200).json({
      success: true,
      createdTeam,
      message: "team created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error , Enter into catch block",
    });
  }
};

// get all Teams
export const allTeams = async (req, res) => {
  try {
    // get all team from the collection
    const allTeamsData = await Teams.find()
      .populate("selectedManager  selectedProject selectedMembers")
      .exec();
    // console.log("data form DB all teams ",allTeamsData);

    if (!allTeamsData) {
      return res.status(400).json({
        success: false,
        message: "Team not created yet!",
      });
    }

    return res.status(200).json({
      success: true,
      allTeamsData,
      message: "All Team fetched successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

// update the all team in Db
export const updateTeam = async (req, res) => {
  const { id } = req.params;

  const {
    updateTeamName,
    updateTeamDescription,
    updateTeamManagerName,
    updateProjectName,
    selectedMembers,
    selectedManager,
    selectedProject,
  } = req.body;

  // console.log(selectedManager._id, selectedProject._id);
  // console.log("hello", updateProjectName, updateTeamManagerName);

  // Use the nullish coalescing operator (??) to provide a default value when the left operand is null or undefined
  let projectId = selectedProject?._id ?? updateProjectName?._id;
  let managerId = selectedManager?._id ?? updateTeamManagerName?._id;

  try {
    // validation id
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Invalid Team id",
      });
    }

    // validate team name
    if (!updateTeamName) {
      return res.status(400).json({
        success: false,
        message: "Please enter team name",
      });
    }

    // check team exist or not
    const updateTeam = await Teams.findById(id);

    // validate team
    if (!updateTeam) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found in the database" });
    }

    // update the updated filed of team
    updateTeam.teamName = updateTeamName;
    updateTeam.teamDescription = updateTeamDescription;
    updateTeam.selectedManager = managerId;
    updateTeam.selectedMembers = selectedMembers;
    updateTeam.selectedProject = projectId;
    //save the updated filled
    await updateTeam.save();

    // check the project is found or not 
    const foundProject = await Project.findOne({ teamId: id });

    if (!foundProject) {
      return res.status(400).json({
        success: false,
        message: "project not found",
      });
    }

    console.log("working")

    if (managerId) {
      foundProject.managerId = managerId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid ManagerId",
      });
    }

    try {
      await foundProject.save();
    } catch (error) {
      console.error("Error saving project:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error! Failed to update project",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Team details updated successfully",
    });
  } catch (error) {
    console.error("Error updating team:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error! Updation of team failed",
    });
  }
};

// delete Team the all team in Db
export const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    // const id = req.body;

    const deleteTeamData = await Teams.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Team delete successful",
      deleteTeamData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error! Updation of team not possible",
    });
  }
};
