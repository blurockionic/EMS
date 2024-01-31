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


// update the all team in Db 
export const updateTeam = async (req,res) => {
  const {id} = req.params
  const {teamName, teamDescription, selectedManager, selectedProject, selectedMembers} =  req.body

  try {
    if(!id ) {
      return res.status(404).json({
        success:false,
        message:"Invalid Team id "
      })
    }

    const updateTeam  = await Teams.findById(id) 
    if (!updateTeam){
      return res.status(404).json({success:false,message:"team not exist in DataBase"})
    }
    updateTeam.teamName = teamName
    updateTeam.teamDescription = teamDescription
    updateTeam.selectedManager = selectedManager
    updateTeam.selectedMembers = selectedMembers
    updateTeam.selectedProject = selectedProject
    await updateTeam.save()   


return res.status(200).json({
  success:true,
  message:"Team details updated Successfully "
})
  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error! Updation of team not possible",
    });

  }
}

// delete Team the all team in Db 
export const deleteTeam = async (req,res) => {
  
   const {id} = req.params
  try {
    // const id = req.body;
     

     const deleteTeamData = await Teams.deleteOne({_id :id })
      return res.status(200).json({
        success:true,
        message:"Team delete successful",
        deleteTeamData
      })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: "Internal server error! Updation of team not possible",
    });

  }
}