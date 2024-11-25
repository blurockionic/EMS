import mongoose from "mongoose";

const loggingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    fileUpload: {
      type: String,
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee_details",
        required: true
    },

    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },

    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export const loggingModel = mongoose.model("loggingSchema", loggingSchema);
