const { default: mongoose, Types } = require("mongoose")

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateAdded: { type: String, default: Date.now() },
    lastLogin: { type: Date, default: Date.now() },
    isverified: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true })

const userModel = mongoose.model("user_collection", userSchema)
module.exports = userModel