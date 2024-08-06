import { todo } from "../model/toDoSchema.js";

export const createToDoList = async(req,res) =>{

    try {
        const {title, description} = req.body;
        console.log(req.body);

        if(!title || !description){
            return (
                res.status(400),
                json({
                success: false,
                message: "tag Name required",
            })
            );
        }

        console.log("checking what is inside todo req body");
        console.log(req.body);
        const toDoList = await todo.create({
            title,
            description
        })
        
        console.log(toDoList)
        res.status(201).json({
            message: "data has been saved in db",
            success: true,
            toDoList
        })

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "error"
        });
        
    }
}



export const fetchToDoList = async(req,res) =>{
    try {
        const allToDos = await todo.find({});
        
        if(allToDos){
        res.status(201).json({
            message:"data has been fetch",
            success: true,
            allToDos
        })
    }
    else{
        res.status(404).json({
            message:"data not found",
            success:false
        })
    }
    } catch (error) {
        res.status(501).json({
            success:false,
            message:"something went wrong"
        })
    }
}