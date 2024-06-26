import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
      },
      dueDate: {
        type: Date,
        required: true,
      },
    }, 
    { timestamps: true });

export const Milestone = mongoose.model("Milestone", milestoneSchema);
