const {
  getAll,
  create,
  getOne,
  remove,
  update,
  verifyEmailUser,
  login,
  resetPassword,
  updatePasswordUser,
  getMe,
} = require("../controllers/user.controllers");
const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const userRouter = express.Router();

userRouter.route("/users").get(getAll).post(create);

userRouter.route("/users/login").post(login);

userRouter.route("/users/me").get(verifyJWT, getMe);

userRouter.route("/users/reset_password").post(resetPassword);

userRouter.route("/users/:id").get(getOne).delete(remove).put(update);

userRouter.route("/users/reset_password/:code").post(updatePasswordUser);

userRouter.route("/users/verify/:code").get(verifyEmailUser);

module.exports = userRouter;
