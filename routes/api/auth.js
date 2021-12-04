const express = require("express");
const register = require("../../controllers/auth/register");
const logout = require("../../controllers/auth/logout");
const login = require("../../controllers/auth/login");
const updateAvatar = require("../../controllers/auth/updateAvatar");
const verifyController = require("../../controllers/auth/verifyController");
const verifyResending = require("../../controllers/auth/verifyResending");

const { UserValidation } = require("../../middlewares/validation/user");
const { authValidation } = require("../../middlewares/auth/authValidation");
const { upload } = require("../../middlewares/upload");
const { addVerifyValidation } = require("../../middlewares/validation/verify");

const router = express.Router();

router.post("/users/register", UserValidation, register);

router.post("/users/login", UserValidation, login);

router.post("/users/verify", addVerifyValidation, verifyResending);

router.get("/users/logout", authValidation, logout);

router.patch(
  "/users/avatars",
  upload.single("avatarURL"),
  authValidation,
  updateAvatar
);

router.get("/users/verify/:verificationToken", verifyController);

module.exports = router;
