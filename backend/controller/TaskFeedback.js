import { ReportTaskFeedback } from "../model/reportTaskFeedback.js";
import { Task } from "../model/task.js";

export const taskReportFeedback = async (req, res) => {
  //  extract data from req body /
  try {
    const {
      isTaskCompleted,
      feedback,
      employeeId,
      taskId,
      taskReportId,
      employeeName,
      taskTitle,
      taskReportDesc,
      reportTitle,
    } = req.body.data;

    const foundTask = await Task.findById(taskId);

    // console.log(foundTask)
    if (isTaskCompleted) {
      foundTask.isTaskCompleted = isTaskCompleted;
      const updateTaskReport = await foundTask.save();
      console.log(updateTaskReport);
    }

    // create entry on db
    const taskReportFeedback = await ReportTaskFeedback.create({
      feedback,
      isTaskCompleted,
      employeeId,
      taskId,
      taskReportId,
      employeeName,
      taskTitle,
      taskReportDesc,
      reportTitle,
      managerName: req.user.name,
      managerId: req.user.employeeId,
    });

    return res.status(200).json({
      success: true,
      taskReportFeedback,
      message: "feedback added successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
