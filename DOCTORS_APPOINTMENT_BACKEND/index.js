// Imports
const express = require("express")
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const cors = require("cors")
const userRouter = require("./routes/user.route.js")

// middleware
app.listen(PORT,(err)=>{
    if(err){
        console.log("Node is not working");
    }else{
        console.log(`Server is running on port ${PORT}`);
    }
})
app.use(express.urlencoded({extended: true}))
app.use("/user",userRouter)
app.use(express.json())
require("dotenv").config()
const URI = process.env.MONGO_DB_URI
console.log(URI);
app.use(cors())
mongoose.connect(URI)
.then(()=> {
    console.log("connected to momgo DB");
})
.catch((err)=> {
    console.log(err);
})

