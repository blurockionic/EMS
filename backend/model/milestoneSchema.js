import mongoose from "mongoose";

const milestoneSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

export const Milestone = mongoose.model("milestone", milestoneSchema);
