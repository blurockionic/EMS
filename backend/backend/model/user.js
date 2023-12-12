import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    designation:{
        type:String,
        required:true
    },
    designationType:{
      type:String,
      required:true
  }
  },
  {
    timestamps: true,
  }
);



export const User = mongoose.model("users", userSchema)