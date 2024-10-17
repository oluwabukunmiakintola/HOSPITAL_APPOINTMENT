const adminModel = require("../model/admin.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")


//Load data from env
dotenv.config()

const generateVerificationToken = (adminId) =>{
    if (!process.env.VERIFICATION_SECRET){
        throw new Error("Verification secret is not set")
    }
    return jwt.sign({adminId}, process.env.VERIFICATION_SECRET)
}

const signUpAdmin = async ()=>{
    //Extract admin data from request body
    const {email, password}  = req.body 
    console.log(req.body);

    try{
        if (!email || !paasword){
            throw new Error("All fields required")
        }
        const adminALreadyExist = await adminModel.findOne({email})
        if (adminALreadyExist){
            return res.status(400).json({success:false, message:"user already Exit"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const admin = new adminModel({
            email, 
            password:hashedPassword,
            verificationToken: generateVerificationToken(userModel._id),
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000,
        })
    }
    
    catch{

    }
}
