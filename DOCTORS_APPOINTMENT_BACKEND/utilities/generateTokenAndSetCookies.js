const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateTokenAndSetCookies = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    })

    res.cookie("token", token,{
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        maxAge: 1*60*60, // 1 hour in milliseconds
        sameSite:"strict"
    })
    return token
}
module.exports = generateTokenAndSetCookies