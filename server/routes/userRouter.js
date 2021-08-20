const userRouter = require('express').Router();
const Controller = require('../controller/userController');

userRouter.post('/register', Controller.register);
userRouter.post('/login', Controller.login);

module.exports = userRouter