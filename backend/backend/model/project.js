import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectStartDate: {
      type: String,
      required: true,
    },
    projectEndDate: {
      type: String,
    },
    priority:{
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
    },
    managerId: {
      type:mongoose.Schema.Types.ObjectId,
        ref:"employee_details",
        required:true
    },
    websiteUrl: {
      type: String,
    },
    isCompleted:{
      type:Boolean,
      default: false
    },
    isScrap:{
      type:Boolean,
      default: false 
    },
    completedPercent:{
      type:Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);


export const Project = mongoose.model("project", projectSchema)