// Imports
const express = require("express")
const app = express()
const PORT = 5000
const mongoose = require('mongoose')
const cors = require("cors")
const userRouter = require("./routes/user.route.js")

// middleware
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/user",userRouter)
const URI = process.env.MONGO_DB_URI
mongoose.connect(URI)
.then(()=> {
    console.log("connected to mongo DB");
})
.catch((err)=> {
    console.log(err);
})

app.listen(PORT,(err)=>{
    if(err){
        console.log("Node is not working");
    }else{
        console.log(`Server is running on port ${PORT}`);
    }
})
