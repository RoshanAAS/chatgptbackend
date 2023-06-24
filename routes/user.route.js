const express = require('express');
const { RegisterController, LoginController, LogoutController } = require('../controllers/user.controller');

const userRouter = express.Router()



userRouter.post("/register",RegisterController)

userRouter.post("/login",LoginController)

userRouter.post("/logout",LogoutController)



userRouter.get("/", async (req, res) => {
    const user = await userModel.find()
    res.status(201).send(user)
})


module.exports = userRouter