const express = require("express")
const router = express.Router()
const userModel = require("../model/user.model")

router.post("/signup", signUpUser)