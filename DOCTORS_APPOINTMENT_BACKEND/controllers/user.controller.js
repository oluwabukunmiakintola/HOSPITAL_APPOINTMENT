//Imported modules 
const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const validator = require("email-validator");
const generateTokenAndSetCookies = require("../utilities/generateTokenAndSetCookies");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")

//Load data from env
dotenv.config()

//Function to generate a verification token
const generateVerificationToken = (userId) => {
    //Check If Verification_secret variable is correct 
    if (!process.env.VERIFICATION_SECRET) {
        throw new Error("VERIFICATION_SECRET environment variable is not set")
    }
    //Generate a verification token with user 
    return jwt.sign({ userId }, process.env.VERIFICATION_SECRET)
}

// Function for sending a verification email to  the user
const sendVerificationEmail = async (user) => {
    const mailOptions = {
        from: "oluwabukunmiakintola@gmail.com",//From email address
        to: userModel.email,//To email address of the user
        subject: "Verify your email",//email Subject
        text: `Please verify your email address by clicking this link: ${process.env.BASE_URL}/verify-email?token=${user.verificationToken}&userId=${user._id}`,
    }

}

//Sign up for user
const signUpUser = async (req, res) => {
    //Extract user data from request body
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);

    try {
        //Check if all fields are present 
        if (!email || !password || !firstName || !lastName) {
            throw new Error("All fields are required")
        }

        //Check If user already exists
        const userAlreadyExists = await userModel.findOne({ email })
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: "user already exists" })
        }

        //hash user password
        const hashedPassword = await bcrypt.hash(password, 10)
        //generate a verification token
        const verificationToken = Math.floor(10000000 + Math.random() * 90000000).toString()


        const user = new userModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            verificationToken,
            verificationToken: generateVerificationToken(userModel._id),
            verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000,
            isEmailVerified: false,
        })

        await user.save()

        await sendVerificationEmail(user)

        //jwt 
        generateTokenAndSetCookies(res, user._id)
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...userModel._doc,
                password: undefined
            }
        })

    } catch (err) {
        console.log({ err });
        return res.status(400).json({ success: false, message: err.message })
    }
}

const verifiyEmail = async (req, res) => {
    const { token, userId } = req.query

    try {
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "User not Found" })
        }

        const isValidToken = jwt.verify(token, process.env.VERIFICATION_SECRET)
        if (!isValidToken) {
            return res.status(400).json({ message: "Invalid Token" })
        }
        user.isEmailVerified = true
        await user.save()

        res.json({ message: "Email verified successfully" })
    }
    catch (err) {
        console.log({ err });
        return res.status(400).json({ message: err.message })
    }
}

const logInUser = async (req, res) => {
    const { email, password } = req.body


    try {
        // check for email
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not Registered " })
        }

        // compare passwords
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" })
        }
        // if email & password is correct 
        res.send({ message: "Signed in successfully" })
    }
    catch (err) {
        console.log("Error Signing in user:", err);
    }
}

const userDashboard = async (req, res) => {
    const user = await userModel.findById(req.user._id)
    if (!user) {
        return res.status(400).json({ message: "User not found" })
    }
    res.json({
        message: "Welcome to user dashboard",
        id: user._id,
        email: user.email,
    })
}

module.exports = {
    signUpUser, logInUser, userDashboard
}