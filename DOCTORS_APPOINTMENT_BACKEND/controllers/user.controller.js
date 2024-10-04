const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const validator = require("email-validator");
const generateTokenAndSetCookies = require("../utilities/generateTokenAndSetCookies");

const signUpUser = async (req ,res) => {
   const {email, password, firstName, lastName} = req.body;
   console.log(req.body);
   
   try{
    if(!email || !password || !firstName || !lastName){
        throw new Error("All fields are required")
    }

        const userAlreadyExists = await userModel.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({success:false, message:"user already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationToken = Math.floor(10000000 + Math.random()* 90000000).toString()


        const user = new userModel ({
            email,
            password:hashedPassword,
            firstName,
            lastName,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 10 * 60 *1000
        })

        await user.save()

        //jwt 
        generateTokenAndSetCookies(res, user._id)
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })

   }catch (err){
    console.log({err});
    return res.status(400).json({success:false, message:err.message})
   }
}

const signInuser =async (req, res)=>{
    const {email, password} = req.body

    // check for email
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({message: "Invalid email or password"})
    }

    // compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword){
        return res.status(400).json({message: "Invalid email or password"})
    }

    // if email & password is correct 
    res.send({message: "Signed in successfully"})
}

const userDashboard = async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    res.json({
        message: "Welcome to user dashboard",
        id:user._id,
        email:user.email,
    })
}

module.exports = {
    signUpUser, signInuser, userDashboard
}