const express = require("express")
const router = express.Router()
const adminModel = require("../model/admin.model")
const loginAdmin = require("../controllers/admin.controller")

router.post("/login", loginAdmin)

module.exports = router