import { app } from "./app.js";
import { connectDB } from "./configuration/database.js"


const PORT = process.env.PORT || 5000
//connet db
connectDB()

app.listen(PORT, ()=>{
    console.log(`server is wprking on port ${PORT}`);  
})
