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

