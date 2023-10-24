const express = require('express');
const controller = require('../controllers/userController');

const userRouter = express.Router();

userRouter.delete('/delete_account', controller.deleteAccount);
userRouter.patch('/Update_profile', controller.updateProfile);
userRouter.post("/signUp", controller.signUp);
userRouter.post('/login', controller.Login);

userRouter.post('/logout', controller.logout);

module.exports = userRouter