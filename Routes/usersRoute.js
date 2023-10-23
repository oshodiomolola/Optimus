const express = require('express');
const controller = require('../controllers/userController')

const userRouter = express.Router();

userRouter.post("/signUp", controller.signUp)

module.exports = userRouter