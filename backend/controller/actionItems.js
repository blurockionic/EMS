// backend\controller\actionItem.js
import { Project } from "../model/project.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.js";
import mongoose from "mongoose";
import { ActionItem } from "../model/actionItem.js"; // Adjust this line
const { ObjectId } = mongoose.Types;
import { Tags } from "../model/tagsSchema.js";
import { User } from "../model/user.js";

// Required Modules
import nodemailer from "nodemailer";
import { Notification } from "../model/NotificationSchema.js"; // importing Notification model

export const actionItem = async (req, res) => {
  // const generateActionItemId = async () => {
  //   const lastActionItem = await actionItem.findOne().sort({ createdAt: -1 });
  //   let newActionItemId = "001"; // Start with "001" if there's no previous user

  //   if (lastActionItem && lastActionItem.actionItemId) {
  //     // Extract the numeric part of the last employee ID
  //     const lastIdNumber = parseInt(lastActionItem.actionItemId, 10); // Directly parse the whole ID as a number
  //     const newIdNumber = lastIdNumber + 1; // Increment the number

  //     // Ensure the new ID is a three-digit number
  //     newActionItemId = `${newIdNumber.toString().padStart(3, "0")}`;
  //   }

  //   return newActionItemId;
  // };
  // const generateActionItemId = async () => {
  //   // Get the current date components
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear().toString().slice(2); // Get last 2 digits of the year
  //   const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Ensure month is 2 digits
  //   const day = currentDate.getDate().toString().padStart(2, "0"); // Ensure day is 2 digits
  
  //   // Get the last actionItem created and increment its actionItemId number
  //   const lastActionItem = await actionItem.findOne().sort({ createdAt: -1 });
  //   let newActionItemNumber = "001"; // Default to "001" if no previous actionItem exists
  
  //   if (lastActionItem && lastActionItem.actionItemId) {
  //     // Extract the last 3 digits (numeric part) of the actionItemId for comparison
  //     const lastActionItemDatePart = lastActionItem.actionItemId.split("-")[1];
  //     const lastActionItemNumber = lastActionItem.actionItemId.split("-")[2]; // Get the numeric part
  
  //     // Only increment the number if the date part matches today's date
  //     if (lastActionItemDatePart === `${year}${month}${day}`) {
  //       const newNumber = parseInt(lastActionItemNumber, 10) + 1; // Increment the last number
  //       newActionItemNumber = newNumber.toString().padStart(3, "0"); // Ensure it's 3 digits
  //     }
  //   }
  
  //   // Combine the parts into the desired format T-YYMMDD-XXX
  //   const newActionItemId = `T-${year}${month}${day}-${newActionItemNumber}`;
  
  //   return newActionItemId;
  // };

  const generateActionItemId = async () => {
    // Get the current date components
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().slice(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
  
    // Use the correct model reference here
    const lastActionItem = await ActionItem.findOne().sort({ createdAt: -1 });
    let newActionItemNumber = "001";
  
    if (lastActionItem && lastActionItem.actionItemId) {
      const lastActionItemDatePart = lastActionItem.actionItemId.split("-")[1];
      const lastActionItemNumber = lastActionItem.actionItemId.split("-")[2];
  
      if (lastActionItemDatePart === `${year}${month}${day}`) {
        const newNumber = parseInt(lastActionItemNumber, 10) + 1;
        newActionItemNumber = newNumber.toString().padStart(3, "0");
      }
    }
  
    const newActionItemId = `T-${year}${month}${day}-${newActionItemNumber}`;
    return newActionItemId;
  };
  
  
  try {
    // Destructure required fields from the request body
    const {
      title,
      description,
      actionItemhashId,
      selectedTags,
      status,
      assignBy,
      assignTo,
      project,
      assignDate,
      dueDate,
    } = req.body;

    // Parse stringified arrays from the request body
    const assignToArray = JSON.parse(assignTo);
    const selectedTagsArray = JSON.parse(selectedTags);

    // Validate that all assignTo values are valid ObjectIds
    if (!assignToArray.every((id) => ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid assignTo values. Each value must be a valid ObjectId.",
      });
    }

    // Validate that all selectedTags values are valid ObjectIds
    if (!selectedTagsArray.every((id) => ObjectId.isValid(id))) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid selectedTags values. Each value must be a valid ObjectId.",
      });
    }

    // Check if the project exists in the database
    const isProjectExist = await Project.findById(project);
    if (!isProjectExist) {
      return res.status(404).json({
        success: false,
        message: "Project not found! Please select another project",
      });
    }

    // Initialize the variable to hold the Cloudinary URL
    let cloudinaryUrl = "";

    // Check if a file was uploaded and process it
    if (req.file) {
      // Upload the file to Cloudinary
      const uploadResult = await uploadOnCloudinary(req.file.path);
      if (uploadResult) {
        cloudinaryUrl = uploadResult.url; // Store the uploaded file URL
      } else {
        console.log("File upload to Cloudinary failed");
      }
    } else {
      console.log("No file received");
    }

    const actionItemId = await generateActionItemId();

    // Create a new actionItem using the actionItem model
    const newActionItem = await ActionItem.create({
      title,
      description,
      actionItemhashId,
      tags: selectedTagsArray,
      status,
      assignBy,
      assignTo: assignToArray,
      project,
      assignDate,
      dueDate,
      actionItemId,
      fileUpload: cloudinaryUrl, // Store the file URL in the actionItem document
    });

    // Fetch the assigned users' details to display their names in the response
    const assignedUsers = await User.find({ _id: { $in: assignToArray } });
    const fullNames = assignedUsers
      .map((user) => `${user.firstName} ${user.lastName}`)
      .join(", ");

    // Send email to assigned users
    await sendEmailNotifications(assignedUsers, newActionItem);

    // Create in-site notifications for assigned users
    await createInSiteNotifications(assignedUsers, newActionItem);

    return res.status(201).json({
      success: true,
      actionItem: newActionItem,
      message: `actionItem has been assigned to ${fullNames}`,
    });
  } catch (error) {
    console.error("Error creating actionItem:", error); // Log any errors that occur

    // Send an internal server error response if something goes wrong
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const sendEmailNotifications = async (assignedUsers, actionItem) => {
  // Set up the transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email provider
    auth: {
      user: process.env.MAIL_USER, // Your email
      pass: process.env.MAIL_PASS, // Your email password or app-specific password
    },
  });

  // Loop through each user and send an email notification
  for (const user of assignedUsers) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: `New actionItem Assigned: ${actionItem.title}`,

      html: `
        <html>
          <body style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
            <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
              <!-- Image at the top of the email -->
              <div style="text-align: center; margin-bottom: 20px;">
                <img 
                  src="${process.env.LOGO_IMAGE}" 
                  loading="lazy" 
                  alt="Company Logo" 
                  style="max-width: 150px; height: auto; display: block; margin: 0 auto;"
                >
              </div>

              <h2 style="color: #4CAF50; text-align: center; margin-top: 20px;">New actionItem Assignment</h2>
              <p style="font-style: capitalize">Dear, ${user?.firstName} ${
        user?.lastName
      },
              </p>
              <p>We are pleased to inform you that you have been assigned a new actionItem titled <strong>"${
                actionItem.title
              }"</strong>.</p>
              <p><strong>Description:</strong> ${actionItem.description}</p>
              <p><strong>Due Date:</strong> ${new Date(
                actionItem.dueDate
              ).toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}</p>
              <p>Please log in to your EMS dashboard to view the actionItem details and manage your progress.</p>
              <p style="margin-top: 20px;">Best regards,<br>BluRock Ionic</p>
            </div>
          </body>
        </html>
      `,
    };

    // Send the email using the transporter
    await transporter.sendMail(mailOptions);
  }
};

// Helper function to create in-site notifications
const createInSiteNotifications = async (assignedUsers, actionItem) => {
  const notifications = assignedUsers.map((user) => ({
    user: user._id, // For each user, get their unique ID
    message: `You have been assigned a new actionItem: ${actionItem.title}`, // Create a message containing the actionItem title
    read: false, // Set the default state of the notification as unread
  }));

  await Notification.insertMany(notifications); // Insert the list of notifications into the database at once
};

export const allActionItem = async (req, res) => {
  try {
    //validation
    const allActionItem = await ActionItem.find({})
      .populate({
        path: "tags",
        select: "tagName",
        model: Tags,
      })
      .populate({
        path: "assignTo",
        select: "firstName lastName profilePicture",
        model: User,
      })
      .populate({
        path: "project", // Populate the project field with entire project data
        model: Project,
      })
      .sort({ createdAt: -1 }); // Sort meetings by creation date, newest first

    if (!allActionItem) {
      return res.status(500).json({
        success: false,
        message: "No record found",
      });
    }

    //get all actionItem
    return res.status(200).json({
      success: true,
      allActionItem,
      message: "All actionItem fetch successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//get employee actionItem // tested
export const actionItemOfEmployee = async (req, res) => {
  //fetch employee id from params
  const { id } = req.params;
  try {
    //   // check user
    //   const { designationType } = req.user;

    //   if (designationType != "Manager") {
    //     return res.status(400).json({
    //       success: false,
    //       message:
    //         "Only manager can check the actionItem! Please concern deparment to get access.",
    //     });
    //   }

    //validation
    const allActionItemOfEmployee = await ActionItem.find({ assignTo: id })
      .populate({
        path: "tags",
        select: "tagName",
        model: Tags,
      })
      .populate({
        path: "assignTo",
        select: "firstName lastName",
        model: User,
      });

    if (!allActionItemOfEmployee) {
      return res.status(500).json({
        success: false,
        message: "No record found",
      });
    }

    //get all actionItem
    return res.status(200).json({
      success: true,
      allActionItemOfEmployee,
      message: "All actionItem fetch successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//update actionItem //tested
export const updateActionItem = async (req, res) => {
  // fetch id from params
  const { id } = req.params;
  // fetch all data from req  body
  const { actionItemTitle, actionItemDescription, assignTo } = req.body;

  try {
    //VALIDATION
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is invalid or null",
      });
    }

    //find actionItem
    const foundActionItem = await ActionItem.findById(id);

    if (!foundActionItem) {
      return res.status(400).json({
        success: false,
        message: "actionItem is not found!",
      });
    }

    //update with new value
    foundActionItem.actionItemTitle = actionItemTitle;
    foundActionItem.actionItemDescription = actionItemDescription;
    foundActionItem.assignTo = assignTo;

    //    save the new value
    const updateActionItem = await foundActionItem.save();

    return res.status(200).json({
      success: true,
      updateActionItem,
      message: "actionItem updated successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//delete actionItem ////tested
export const deleteActionItem = async (req, res) => {
  // fetch id from req params
  const { id } = req.params;

  try {
    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "actionItem id is invalid or null!",
      });
    }

    // check user
    const { designationType } = req.user;
    if (designationType != "Manager") {
      return res.status(400).json({
        success: false,
        message: "Only manager can delete the actionItem!",
      });
    }

    //delete actionItem from db
    const deleteActionItem = await ActionItem.deleteOne({ _id: id });

    return res.status(200).json({
      success: true,
      deleteActionItem,
      message: "actionItem deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Please check the delete code above",
    });
  }
};

//get all actionItem of specific actionItem // tested
export const specificProjectActionItem = async (req, res) => {
  // Fetch project id from params
  const { id } = req.params;
  try {
    // Validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Invalid request: Project ID is required",
      });
    }

    // Fetch actionItems filtered by project ID

    const specificProjectActionItems = await ActionItem.find({ project: id }).populate({
      path: "tags",
      select: "tagName",
      model: Tags,
    });

    if (!specificProjectActionItems || specificProjectActionItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No actionItems available for this project",
      });
    }

    return res.status(200).json({
      success: true,
      actionItems: specificProjectActionItems,
      message: "actionItems fetched successfully!",
    });
  } catch (error) {
    console.error("Error fetching actionItems:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const closeActionItem = async (req, res) => {
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

    //find actionItem
    const foundActionItem = await ActionItem.findById(id);

    if (!foundActionItem) {
      return res.status(400).json({
        success: false,
        message: "actionItem is not found!",
      });
    }

    //udate with new value
    foundActionItem.status = "Close";

    //    save the new value
    const closeActionItem = await foundActionItem.save();

    return res.status(200).json({
      success: true,
      closeActionItem,
      message: "actionItem closed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};
export const reopenActionItem = async (req, res) => {
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

    //find actionItem
    const foundActionItem = await ActionItem.findById(id);

    if (!foundActionItem) {
      return res.status(400).json({
        success: false,
        message: "actionItem is not found!",
      });
    }

    //udate with new value
    foundActionItem.status = "Open";

    //    save the new value
    const closeActionItem = await foundActionItem.save();

    return res.status(200).json({
      success: true,
      closeActionItem,
      message: "actionItem closed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const putActionItemOnHold = async (req, res) => {
  try {
    const { actionItemId } = req.params;

    // Find the actionItem by ID and update its status to "on hold"
    const actionItem = await ActionItem.findByIdAndUpdate(
      actionItemId,
      { status: "On Hold" },
      { new: true }
    );

    if (!actionItem) {
      return res.status(404).json({ message: "actionItem not found" });
    }

    res.status(200).json({
      success: true,
      message: "actionItem status updated to On Hold",
      actionItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update actionItem status", error });
  }
};

// Controller to submit a actionItem for review
export const submitActionItemForReview = async (req, res) => {
  try {
    const { actionItemId } = req.params;

    // Find the actionItem by ID and update its status to "in review"
    const actionItem = await ActionItem.findByIdAndUpdate(
      actionItemId,
      { status: "In Review" },
      { new: true }
    );

    if (!actionItem) {
      return res.status(404).json({ message: "actionItem not found" });
    }

    res.status(200).json({
      success: true,
      message: "actionItem status updated to In Review",
      actionItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update actionItem status", error });
  }
};
