import mongoose from "mongoose";


const tagsSchema = new mongoose.Schema({
    tagName: { type: String, required: true },
    color: { type: String,  },
})

export const Tags = mongoose.model("Tags", tagsSchema)

