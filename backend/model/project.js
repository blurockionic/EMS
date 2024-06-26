import mongoose from "mongoose";
import nodemailer from "nodemailer";

const projectSchema = new mongoose.Schema(
  // {
  //   projectName: {
  //     type: String,
  //     required: true,
  //     trim: true,
  //   },
  //   projectStartDate: {
  //     type: String,
  //     required: true,
  //   },
  //   projectEndDate: {
  //     type: String,
  //   },
  //   priority:{
  //     type: String,
  //     required: true
  //   },
  //   description: {
  //     type: String,
  //     required: true,
  //   },
  //   managerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref:"employee_details",
  //     required:true
  //   },
  //   adminId:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref:"users",
  //     required: true
  //   },
  //   teamId: {
  //     type:mongoose.Schema.Types.ObjectId,
  //       ref:"Teams_Detail",
  //       required:true
  //   },
  //   websiteUrl: {
  //     type: String,
  //   },
  //   isCompleted:{
  //     type:Boolean,
  //     default: false
  //   },
  //   isScrap:{
  //     type:Boolean,
  //     default: false
  //   },
  //   completedPercent:{
  //     type:Number,
  //     default: 0
  //   },
  //   emails: {
  //     type: [{
  //       type: String,
  //       trim: true,
  //       lowercase: true,
  //       validate: {
  //         validator: function (v) {
  //           // Use a regular expression for basic email validation
  //           return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  //         },
  //         message: props => `${props.value} is not a valid email address!`,
  //       },
  //     }],
  //   },
  // },

  {
    projectName: { type: String, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    projectDescription: { type: String },
    projectObjectives: { type: String },
    projectScope: { type: String },
    deliverables: { type: [String] },
    projectType: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    estimatedBudget: { type: Number },
    projectManager: { type: mongoose.Schema.Types.ObjectId, ref: "Teams" },
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teams" }],
    stakeholders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teams" }],
    toolsAndTechnologies: [String],
    requiredResources: [String],
    resourceAllocation: { type: String },
    communicationPlan: { type: String },
    meetingSchedule: { type: String },

    documentation: {
      projectPlan: { type: String },
      requirements: { type: String },
      design: { type: String },
      technicalSpecifications: { type: String },
      userManuals: { type: String },
      testPlans: { type: String },
    },
    progressTracking: { type: String },
    KPIs: [String],
    statusReports: { type: String },
    timeTracking: { type: String },
    budgetTracking: { type: String },
    qualityStandards: { type: String },

     // phases: [String],
    // projectCategory: { type: String },
    // actualBudget: { type: Number },
    // paymentTerms: { type: String },
    // billingFrequency: { type: String },
    // testCases: { type: String },
    // bugTracking: { type: String },
    // userAcceptanceTesting: { type: String },
    // contractsAndAgreements: { type: String },
    // complianceRequirements: { type: String },
    // IPManagement: { type: String },
    // projectClosureChecklist: { type: String },
    // finalDeliverables: { type: String },
    // clientApproval: { type: String },
    // postProjectReview: { type: String },
    // lessonsLearned: { type: String },
    // archivingDocumentation: { type: String },
  },

  {
    timestamps: true,
  }
);

// code  for send mail to  the team members and manager
// projectSchema.post("save", async function(doc) {
//   try {
//     console.log("DOC", doc)
//     // transporter
//     let transporter = nodemailer.createTransport({
//       host:process.env.MAIL_HOST,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass:process.env.MAIL_PASS
//       },
//     })

//     // Send mail
//     let info = await transporter.sendMail( {
//       from :"Blurock Innovation | EMS",
//       // to: doc.email
//       // hare we give the emails of all the members of team and all the mananger hare is code
//       // to:["arunupadhayay2000@gmail.com", "biruly2000@gmail.com"],
//       to: doc.emails,

//       // to: allEmails.join(', '), // Combine emails into a comma-separated string
//       subject: "New project is created",
//       html: `<h2>New Project ${doc.projectName}</h2>`

//     })

//   }catch(error){
//     console.error("error to send mail ")
//   }
// })

export const Project = mongoose.model("project", projectSchema);
