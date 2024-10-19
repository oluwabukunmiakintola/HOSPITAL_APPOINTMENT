const express = require("express")
const router = express.Router()
const userModel = require("../model/user.model")
const { logInUser, signUpUser, userDashboard } = require("../controllers/user.controller")

router.post("/signup", signUpUser)
router.post("/signup", logInUser)
// router.get("dashboard", userDashboard)

module.exports = router