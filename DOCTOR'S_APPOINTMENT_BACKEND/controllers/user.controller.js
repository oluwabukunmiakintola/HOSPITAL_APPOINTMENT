const userModel = require("../model/user.model")

const signUpUser = (req ,res) => {
    const {email , password} = req.body
    const user = new userModel({email , password})
    user.save()

}