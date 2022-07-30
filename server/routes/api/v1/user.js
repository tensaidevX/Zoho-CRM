const express = require("express");

const userRouter = express.Router();
const userController = require("../../../controllers/userController");
userRouter.post("/login", userController.createSession);
userRouter.post("/register", userController.userSignup);

module.exports = userRouter;
