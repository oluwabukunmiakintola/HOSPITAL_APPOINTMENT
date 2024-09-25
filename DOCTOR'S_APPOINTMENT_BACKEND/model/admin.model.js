const {default: mongoose} = require("mongoose")

const adminSchema = mongoose.Schema({
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true},
    dateAddded:{type: Date, default: Date.now},
})

const adminModel = mongoose.model("admin_collection", adminSchema)
module.exports = adminModel