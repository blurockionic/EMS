import { Teams } from "../model/team_model.js";



// controller for creating New Team 
export const teamDetail = async (req, res) => {
  try {
    const { teamName, teamDescription,selectedMembers, adminProfile, selectedManager, selectedProject } = req.body;

    // console.log("Data aa raha h ",req.body);
    // console.log("admin ki id ", adminProfile);
   
    if (!teamName ) {
      return res.status(404).json({
        success: false,
        message: "Team Name is  mandatory for Creating team ",
      });
    }
    const out = await Teams.create({
      teamName,
      teamDescription,
      adminProfile,
      selectedMembers,
      selectedManager,
      selectedProject
    });

    return res.status(200).json({
      success: true,
      out,
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
      const allTeamsData  = await Teams.find().populate('selectedManager  selectedProject selectedMembers').exec();
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

