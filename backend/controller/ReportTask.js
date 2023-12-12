import { ReportTask } from "../model/reportTask.js";
import { Task } from "../model/task.js";

//new report //tested
export const reportTask = async (req, res) => {
  //fetch task id from
  const { id } = req.params;

  //fetch from req body
  const { reportTitle, reportDescription, isTaskCompleted } = req.body;

  try {
    //validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is invalid or null",
      });
    }

    // validation
    if (!reportTitle || !reportDescription) {
      return res.status(400).json({
        success: false,
        message: "All field are required!",
      });
    }

    // check user designation
    // const { designationType } = req.user;
    // if (designationType != "Employee") {
    //   return res.status(200).json({
    //     success: false,
    //     message: "Only employee can report the task",
    //   });
    // }

    //   check task exist or not
    const isTaskExist = await Task.findById(id);

    if (!isTaskExist) {
      return res.status(400).json({
        success: false,
        message: "Task not found!",
      });
    }

    //create entry on db
    const reportTask = await ReportTask.create({
      reportTitle,
      reportDescription,
      isTaskCompleted,
      projectId: isTaskExist.taskOf,
      employeeId: isTaskExist.assignTo,
      managerId: isTaskExist.managerId,
      taskId: id,
    });

    //return
    return res.status(200).json({
      success: true,
      reportTask,
      message: "Report succeefully send to Manager!",
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

// get all prevois report   //tested  
export const allReport = async (req, res) => {
  // fetch employeeId
  const { id } = req.params;
  console.log(id)

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Id is invalid or null",
      });
    }

    const allReport = await ReportTask.find({ employeeId: id }).sort({createdAt: 1});
    if (!allReport) {
      return res.status(400).json({
        success: false,
        message: "No report found!",
      });
    }

    return res.status(200).json({
      success: true,
      allReport,
      message: "All report fetched successfully!",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

//update report details   //tested
export const updateReport = async (req, res) => {
  // fetch report id
  const { id } = req.params;

  //fetch details from req.body
  const { reportTitle, reportDescription } = req.body;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id invalid or null",
      });
    }

    // check report
    const isReportExist = await ReportTask.findById(id);
    if (!isReportExist) {
      return res.status(400).json({
        success: false,
        message: "Report not found",
      });
    }

    // save the new value
    isReportExist.reportTitle = reportTitle;
    isReportExist.reportDescription = reportDescription;

    const updateReport = await isReportExist.save();
    return res.status(200).json({
      success: false,
      updateReport,
      message: "Report updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};

//delete report details   //tested
export const deleteReport = async (req, res) => {
  // fetch report id
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "id invalid or null",
      });
    }

    const deleteReport = await ReportTask.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deleteReport,
      message: "Report deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the above code!",
    });
  }
};
