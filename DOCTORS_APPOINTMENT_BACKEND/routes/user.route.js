const express = require("express")
const router = express.Router()
const userModel = require("../model/user.model")
const { signInuser, signUpUser, userDashboard } = require("../controllers/user.controller")

router.post("/signup", signUpUser)
router.post("/signin", signInuser)
// router.get("dashboard", userDashboard)

module.exports = router