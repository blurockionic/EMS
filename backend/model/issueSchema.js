import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  title: {
    type: String,

  },
  issueId:{
    type: String,
    required:true
  },
  description: {
    type:String,

  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
  status: {
    type: String,
    enum: ["Open", "In Review", "Close"],
    default: "Open",
  },
  assignBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to a User schema
  assignTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to a User schema
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // Reference to a Project schema
  createdAt: { type: Date, default: Date.now },
  dueDateTime: {type: String}
},
{
  timestamps: true, // Automatically add createdAt and updatedAt fields
},

);

 export const Issue = mongoose.model("Issue", issueSchema)
