import mongoose from "mongoose";

const toDoSchemma = new mongoose.Schema({
    title :{
        type : String,
        require : true
    },

    description: {
        type : String,
        require : true
    },
},
    {
        timestamps: true,
    }
);

export const todo = mongoose.model("todo", toDoSchemma);

