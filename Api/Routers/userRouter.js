
const express =require('express');
const userControler = require("../Controllers/authController");

 

const userRouter =express.Router();
 

userRouter.route("/").get(userControler.getAllUsers).post(userControler.createuser);


userRouter.route("/:id").patch(userControler.Updateuser).delete(userControler.deleteUser).get(userControler.getsingleUser);

module.exports = userRouter;