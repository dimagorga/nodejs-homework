const express = require("express");
const register = require("../../controllers/auth/register");
const logout = require("../../controllers/auth/logout");
const login = require("../../controllers/auth/login");

const { UserValidation } = require("../../middlewares/validation/user");
const { authValidation } = require("../../middlewares/auth/authValidation");
const router = express.Router();

router.post("/users/register", UserValidation, register);

router.post("/users/login", UserValidation, login);

router.get("/users/logout", authValidation, logout);

module.exports = router;
