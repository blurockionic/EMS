import { LeaveDetailSchema } from "../model/leaveDetails.js";

// /employess apply for leave first time
export const applyLeave = async (req, res) => {
  try {
    const { LeaveType, ToDate, FromDate, Reason } = req.body.LeaveFormData;
    console.log(req.body.LeaveFormData);
    // data validation
    if (!LeaveType || !ToDate || !FromDate || !Reason) {
      return res.status(404).json({
        success: false,
        message: "All field are requried ",
      });
    }

    const { name, employeeId } = req.user;

    if (!name || !employeeId) {
      return res.status(402).json({
        success: false,
        message: "user not found",
      });
    }

    console.log(name, employeeId)

    // use fonded , create entry on DB for leave
    const leaveApply = await LeaveDetailSchema.create({
      leaveType:LeaveType,
      toDate :ToDate,
      fromDate :FromDate,
      reason : Reason,
      name,
      employeeId,
      isAccepted : false,
    });
    return res.status(200).json({
      success: true,
      leaveApply,
      message: "Leave application send successfuly to manager",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

// sending req to the manager 
export const leaveApplicstionRequest = async (req, res) => {
    try{
            

    }catch(error){
        return res.status(404).json({
            success:false,
            message:"data not comming from DB"
        })

    }
}