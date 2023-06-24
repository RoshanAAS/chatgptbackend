const mongoose = require('mongoose');
const userObj = {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}
const userSchema = mongoose.Schema(userObj)

const userModel = mongoose.model("user", userSchema)

module.exports = { userModel }