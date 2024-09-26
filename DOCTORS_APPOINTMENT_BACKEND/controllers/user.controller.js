const userModel = require("../model/user.model")
const bcrypt = require("bcrypt")
const validator = require("email-validator")

const signUpUser = async (req ,res) => {
    const {email, password} = req.body

    // email validation 
    if(!validator.validate(email)){
        return res.status(400).json({message: "Invalid email"})
    }

    // to check if email already exist 
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "Email already exist"})
    }

    // password hash on by bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({email, password: hashedPassword})
    user.save()
    .then(() =>res.send({message: "SIgn Up successful"}))
    .catch((err)=> res.status(500).send({err, error:"Error creating User"}))
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

module.exports = {
    signUpUser, signInuser
}