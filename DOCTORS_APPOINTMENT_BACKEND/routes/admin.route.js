const express = require("express")
const router = express.Router()
const adminModel = require("../model/admin.model")
const signInAdmin = require("../controllers/admin.controller")

router.post("/signin", signInAdmin)

module.exports = router