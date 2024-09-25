const {default:mongoose, Types} = require("mongoose")

const userSchema  = mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    dateAdded:{type:String, default: Date.now()}
})

const userModel = mongoose.model("user_collection", userSchema)
module.exports = userModel