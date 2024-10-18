const adminModel = require("../model/admin.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { log } = require("console")


//Load data from env
dotenv.config()


const loginAdmin =(req, res)=>{
    const {email, password} = req.body
    console.log("Email:",email);
    console.log("password:",password);
    
    
    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    //Check if the provided email and password are correct
    if(email=== process.env.ADMIN_USERMAIL && password=== process.env.ADMIN_PASSWORD){
        const token = jwt.sign({ email: email }, process.env.VERIFICATION_SECRET, { expiresIn:"1h"})

        return res.status(200).json({success:true, token})
    }
    else{
        // invalid detail if wrong 
        return res.status(401).json({message:"Invalid email or password"})
    }
}

module.exports = loginAdmin