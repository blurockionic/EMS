import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //   employeeId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"employee_details",
    //   },
    //   name: {
    //     type: String,
    //     trim: true,
    //     required: true,
    //   },
    //   email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //   },
    //   password: {
    //     type: String,
    //     required: true,
    //     select: false,
    //   },
    //   designation:{
    //       type:String,
    //       required:true
    //   },
    //   designationType:{
    //     type:String,
    //     required:true
    // }

    firstName:
     { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    position: { type: String },
    currentAddress: { type: String },
    permanentAddress: { type: String },
    bio: { type: String },
    nationality: { type: String },
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    employeeId: { type: String },
    onboardingDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("users", userSchema);
